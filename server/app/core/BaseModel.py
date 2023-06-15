"""
Model base
"""


class BaseModel:
    """Model base to model"""

    def translate_sql_operator(self, operator, value1, value2):
        """translate sql operator"""
        operation_sql = ''
        operator = operator.upper()

        if operator == "CONTIENE":
            operation_sql = f"LIKE '%{value1}%'"
        elif operator == "EMPIEZA POR":
            operation_sql = f"LIKE '{value1}%'"
        elif operator == "ES" or operator == "=":
            operation_sql = f"= '{value1}'"
        elif operator == "<>" or operator == "NO ES":
            operation_sql = f"!= '{value1}'"
        elif operator == "NO CONTIENE":
            operation_sql = f"NOT LIKE '%{value1}%'"
        elif operator == "SE ENCUENTRA ENTRE (INCLUYE)":
            operation_sql = f"BETWEEN '{value1}' AND '{value2}'"
        elif operator == "<":
            operation_sql = f"< '{value1}'"
        elif operator == ">":
            operation_sql = f"> '{value1}'"
        elif operator == "ES MENOR QUE E INCLUYE" or operator == "<=":
            operation_sql = f"<= '{value1}'"
        elif operator == "ES MAYOR QUE E INCLUYE" or operator == ">=":
            operation_sql = f">= '{value1}'"

        return operation_sql

    def translate_filter_to_sql_condition(self, filters, alias=''):
        """translate filter to sql condition"""
        where_sql = ''
        if alias != '':
            alias = alias + '.'

        ki = 0

        for _, query_row in filters.items():
            if 'eval' not in query_row or len(query_row['eval']) == 0:
                continue

            if ki == 0:
                where_sql += '('
            else:
                where_sql += f" {query_row['logicalOperator']} ("

            for key, row in enumerate(query_row['eval']):
                if key > 0:
                    where_sql += f" {row['logicalOperator']} "

                if row['prefix'].upper() == 'DONDE NO':
                    where_sql += f" NOT ({alias}{row['field']} {self.translate_sql_operator(row['operator'], row.get('value1', ''), row.get('value2', ''))})"
                else:
                    where_sql += f"({alias}{row['field']} {self.translate_sql_operator(row['operator'], row.get('value1', ''), row.get('value2', ''))})"

            where_sql += ')'
            ki += 1

        return where_sql.strip()

    def build_where_sql(self, filters, additional_filter='', alias=''):
        """build where sql"""
        sql_condition = self.translate_filter_to_sql_condition(filters, alias)

        if len(additional_filter.strip()) > 0 and len(sql_condition.strip()) > 0:
            sql_condition = f"{additional_filter} AND {sql_condition}"
        else:
            sql_condition = f"{additional_filter} {sql_condition}"

        sql_condition = sql_condition.strip()
        if len(sql_condition) > 0:
            sql_condition = f"WHERE {sql_condition}"

        return sql_condition

    def build_sort_sql(self, sort, alias=''):
        """build sort sql"""
        sort_sql = ''
        if alias != '':
            alias = alias + '.'

        if len(sort) > 0:
            sort_sql = f"ORDER BY {alias}{sort['field']} {sort['order']}"

        return sort_sql

    def assembly_prefix(self, prefix):
        """assembly prefix """
        if len(prefix) > 0:
            return prefix + '_'
        else:
            return ''
