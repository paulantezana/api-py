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
