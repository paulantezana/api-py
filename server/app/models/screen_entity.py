"""
model
"""
from app.services.Database import get_connection


class ScreenEntity:
    """screen enity model"""

    def get_all(self):
        """get all data"""
        conection = get_connection()
        query = "select * from dictionary.screen_entities"

        cursor = conection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        return rows
    def paginate_header(self):
        """get paginate headers"""
        connection = get_connection()
        query = """select field_name, field_title, filterable, sortable, visible, col_index from dictionary.screen_entity_fields as dsef
                    inner join dictionary.screen_entities as se on dsef.screen_entity_id = se.id
                    where se.multiple = true"""

        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

        return rows
