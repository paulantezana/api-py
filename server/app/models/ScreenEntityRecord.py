"""
model
"""
import math
from app.core.BaseRecord import BaseRecord
from app.exceptions.ControlledException import ControlledException

class ScreenEntityRecord(BaseRecord):
    """screen enity base record"""

    def __init__(self, connection):
        super().__init__(table='app.screen_entities', primary_key='id', connection=connection)

    def paginate_header(self, screen_id):
        """get paginate headers"""
        query = """select field_name, field_title, filterable, sortable, visible, col_index from app.screen_entity_fields as dsef
                    inner join app.screen_entities as se on dsef.screen_entity_id = se.id
                    where se.multiple = true and se.screen_id = %s"""

        with self.connection.cursor() as cursor:
            cursor.execute(query, (screen_id,))
            rows = self.dictfetchall(cursor)
        return rows
    
    def dynamic_insert(self, entity_data, screen_id):
        """dynamic insert"""
        parent_entity = self.get_by('screen_id', screen_id)
        if parent_entity is None:
            raise ControlledException('No se encontro ninguna entidad')

        entity_data_up = {key: value for key, value in entity_data.items() if not isinstance(value, list)}
        entity_data_lists = {key: value for key, value in entity_data.items() if isinstance(value, list)}
        del entity_data_up['id']

        columns = entity_data_up.keys()
        values = list(entity_data_up.values())

        column_names = ', '.join(columns)
        column_placeholders = ', '.join('%s' for _ in columns)

        sql = f"INSERT INTO {parent_entity['schema_name']}.{parent_entity['table_name']} ({column_names}) VALUES ({column_placeholders}) RETURNING id"

        with self.connection.cursor() as cursor:
            cursor.execute(sql, values)
            self.connection.commit()
            row = cursor.fetchone()
            return {'id': row[0]}

    def dynamic_paginate(self, page_request, prefix=''):
        """get paginate headers"""
        current_entity = self.get_by('screen_id', page_request['screen_id'])
        if current_entity is None:
            raise ControlledException('No se encontro ninguna entidad')
        
        prefix = self.assembly_prefix(prefix)
        # whre_sql = self.build_where_sql(page_request.get('filter', []), page_request.get('aditionalFilter', ''), page_request.get('alias', ''))
        # sort_sql = self.build_sort_sql(page_request.get('sorter', []), page_request.get('alias', ''))
        whre_sql = ""
        sort_sql = ""

        offset = (page_request['page'] - 1) * page_request['limit']

        # Get cuantity
        with self.connection.cursor() as cursor:
            cursor.execute(
                f"SELECT COUNT(*) FROM {current_entity['schema_name']}.{current_entity['table_name']} {whre_sql}")
            total_rows = cursor.fetchone()[0]

        # Calculate total
        total_pages = math.ceil(total_rows / page_request['limit'])

        # Get Paginate
        with self.connection.cursor() as cursor:
            cursor.execute(
                f"SELECT * FROM {current_entity['schema_name']}.{current_entity['table_name']} {whre_sql} {sort_sql} LIMIT {page_request['limit']} OFFSET {offset}")
            data = self.dictfetchall(cursor)

        self.connection.close()

        return {
            'current': page_request['page'],
            'pages': total_pages,
            'limit': page_request['limit'],
            'data': data,
            'total': total_rows,
        }
