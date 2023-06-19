"""Model"""

import math
import psycopg2

from datetime import datetime
from app.core.BaseModel import BaseModel
from app.exceptions.ControlledException import ControlledException


class BaseRecord(BaseModel):
    """Base recor object"""

    def __init__(self, table, primary_key, connection):
        self.table = table
        self.primary_key = primary_key
        self.connection = connection

    def dictfetchall(self, cursor):
        """Retorna todas las filas del cursor como un diccionario"""
        desc = cursor.description
        return [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]

    def get_all(self, prefix=''):
        """select get all data"""
        prefix = self.assembly_prefix(prefix)
        sql = f"SELECT * FROM {prefix}{self.table}"
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
            return self.dictfetchall(cursor)

    def paginate(self, page_request, prefix=''):
        """simple paginate"""
        prefix = self.assembly_prefix(prefix)

        where_sql = self.build_where_sql(page_request.get('filter', []), page_request.get(
            'additionalFilter', ''), page_request.get('alias', ''))
        sort_sql = self.build_sort_sql(page_request.get(
            'sorter', []), page_request.get('alias', ''))

        offset = (page_request['page'] - 1) * page_request['limit']
        total_rows = self.connection.cursor().execute(
            f"SELECT COUNT(*) FROM {prefix}{self.table} {where_sql}").fetchone()[0]
        total_pages = math.ceil(total_rows / page_request['limit'])

        sql = f"SELECT * FROM {prefix}{self.table} {where_sql} {sort_sql} LIMIT {offset}, {page_request['limit']}"
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
            data = self.dictfetchall(cursor)

        return {
            'current': page_request['page'],
            'pages': total_pages,
            'limit': page_request['limit'],
            'data': data,
            'total': total_rows,
        }

    def get_by_id(self, primary_key, prefix=''):
        """Get data bys id"""
        prefix = self.assembly_prefix(prefix)
        sql = f"SELECT * FROM {prefix}{self.table} WHERE {self.primary_key} = %s LIMIT 1"
        with self.connection.cursor() as cursor:
            cursor.execute(sql, (primary_key,))
            return cursor.fetchone()

    def get_by(self, column_name, value, prefix=''):
        """get data by columname and value"""
        prefix = self.assembly_prefix(prefix)
        sql = f"SELECT * FROM {prefix}{self.table} WHERE {column_name} = %s LIMIT 1"
        with self.connection.cursor() as cursor:
            cursor.execute(sql, (value,))
            row = cursor.fetchone()

        if row is not None:
            column_names = [desc[0] for desc in cursor.description]
            return dict(zip(column_names, row))

        return None

    def delete_by_id(self, primary_key):
        """delete data by id"""
        try:
            sql = f"DELETE FROM {self.table} WHERE {self.primary_key} = %s"
            with self.connection.cursor() as cursor:
                cursor.execute(sql, (primary_key,))
                return primary_key
        except psycopg2.Error as exp:
            if exp.pgcode == '23000':
                raise ControlledException(
                    f"Este registro no se puede eliminar, debido a que uno o más tablas dependen de este registro. ERROR: {exp.diag.message_detail}") from exp
            else:
                raise exp

    def delete_by(self, column_name, value):
        """delete by columname and value"""
        try:
            sql = f"DELETE FROM {self.table} WHERE {column_name} = %s"
            with self.connection.cursor() as cursor:
                cursor.execute(sql, (value,))
                return value
        except psycopg2.Error as exp:
            if exp.pgcode == '23000':
                raise ControlledException(
                    f"Este registro no se puede eliminar debido a que uno o más tablas dependen de este registro. ERROR: {exp.diag.message_detail}") from exp
            else:
                raise exp

    def update_by_id(self, primary_key, data, audit=True):
        """update by id"""
        # Audit
        data = self.set_audit(data, audit, True)

        # Update
        column_updates = []
        params = []
        for key, value in data.items():
            column_updates.append(f"{key} = %s")
            params.append(value)
        params.append(primary_key)

        sql = f"UPDATE {self.table} SET {', '.join(column_updates)} WHERE {self.primary_key} = %s"

        try:
            with self.connection.cursor() as cursor:
                cursor.execute(sql, params)
                return primary_key
        except psycopg2.Error as exp:
            if exp.pgcode == '23000':
                raise ControlledException(exp.diag.message_detail) from exp
            else:
                raise ControlledException(
                    "Error al actualizar datos: " + str(exp)) from exp

    def update_by(self, column_name, value, data, audit=True):
        """update by column name and value"""
        # Audit
        data = self.set_audit(data, audit, True)

        # Update
        column_updates = []
        params = []
        for key, row_value in data.items():
            column_updates.append(f"{key} = %s")
            params.append(row_value)
        params.append(value)

        sql = f"UPDATE {self.table} SET {', '.join(column_updates)} WHERE {column_name} = %s"

        try:
            with self.connection.cursor() as cursor:
                cursor.execute(sql, params)
                return True
        except psycopg2.Error as exp:
            if exp.pgcode == '23000':
                raise ControlledException(exp.diag.message_detail) from exp
            else:
                raise exp

    def insert(self, data, audit=True):
        """insert into data"""
        data = self.set_audit(data, audit, False)

        # Insert Params
        columns = data.keys()
        column_names = ', '.join(columns)
        column_placeholders = ', '.join(f"%({column})s" for column in columns)

        # SQL Statement
        sql = f"INSERT INTO {self.table} ({column_names}) VALUES ({column_placeholders}) RETURNING {self.primary_key}"

        try:
            with self.connection.cursor() as cursor:
                cursor.execute(sql, data)
                return cursor.fetchone()[0]
        except psycopg2.Error as exp:
            if exp.pgcode == '23000':
                raise ControlledException(exp.diag.message_detail) from exp
            else:
                raise exp

    def set_audit(self, data, audit, update=False):
        """set auditory data"""
        # Default values
        current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        if isinstance(audit, bool):
            if audit:
                if update:
                    audit_data = {
                        'updated_at': current_date,
                        # 'updated_user': session.get(SESS_USER, {}).get('user_name', ''),
                    }
                else:
                    audit_data = {
                        'created_at': current_date,
                        # 'created_user': session.get(SESS_USER, {}).get('user_name', ''),
                    }
                data.update(audit_data)
        elif isinstance(audit, dict):
            if update:
                audit_data = {
                    'updated_at': current_date,
                    'updated_user': audit.get('userName', ''),
                }
            else:
                audit_data = {
                    'created_at': current_date,
                    'created_user': audit.get('userName', ''),
                }
            data.update(audit_data)

        return data
