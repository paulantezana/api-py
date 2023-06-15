"""
model
"""
import math
from app.services.Database import get_connection
from app.core.BaseRecord import BaseRecord


class ScreenEntity(BaseRecord):
    """screen enity base record"""

    def __init__(self, connection):
        super().__init__(table='app.screen_entities', primary_key='id', connection=connection)

    def paginate_header(self, screen_id):
        """get paginate headers"""
        query = """select field_name, field_title, filterable, sortable, visible, col_index from dictionary.screen_entity_fields as dsef
                    inner join dictionary.screen_entities as se on dsef.screen_entity_id = se.id
                    where se.multiple = true and se.screen_id = %s"""

        with self.connection.cursor() as cursor:
            cursor.execute(query, (screen_id,))
            rows = self.dictfetchall(cursor)
        return rows
    
    def dynamic_insert(self, content):
        
    def dynamic_update(self, content):


    def paginate(self, page_request, screen_id):
        """get paginate headers"""
        # prefix = assembly_prefix(prefix)
        prefix = ""

        # whre_sql = build_where_sql(page_request.get('filter', []), page_request.get('aditionalFilter', ''), page_request.get('alias', ''))
        whre_sql = ""
        # sort_sql = build_sort_sql(page_request.get('sorter', []), page_request.get('alias', ''))
        sort_sql = ""

        offset = (page_request['page'] - 1) * page_request['limit']

        # Get entity
        with self.connection.cursor() as cursor:
            cursor.execute(
                'select schema_name, table_name, table_view from dictionary.screen_entities where multiple = true and screen_id = %s', (screen_id,))
            screen_entity = cursor.fetchone()

        # Get cuantity
        with self.connection.cursor() as cursor:
            cursor.execute(
                f"SELECT COUNT(*) FROM {screen_entity[0]}.{screen_entity[1]} {whre_sql}")
            total_rows = cursor.fetchone()[0]

        # Calculate total
        total_pages = math.ceil(total_rows / page_request['limit'])

        # Get Paginate
        with self.connection.cursor() as cursor:
            cursor.execute(
                f"SELECT * FROM {screen_entity[0]}.{screen_entity[1]} {whre_sql} {sort_sql} LIMIT {page_request['limit']} OFFSET {offset}")
            data = self.dictfetchall(cursor)

        self.connection.close()

        return {
            'current': page_request['page'],
            'pages': total_pages,
            'limit': page_request['limit'],
            'data': data,
            'total': total_rows,
        }