"""
model
"""

from app.core.BaseRecord import BaseRecord

class ActionRecord(BaseRecord):
    """screen enity base record"""

    def __init__(self, connection):
        super().__init__(table='app.actions', primary_key='id', connection=connection)

    def get_all_by_screen_id_auth(self, screen_id):
        """get paginate headers"""
        query = """select a.* from app.screen_actions as psa 
                    inner join app.actions as a  on psa.action_id  = a.id 
                    where psa.screen_id = %s"""

        with self.connection.cursor() as cursor:
            cursor.execute(query, (screen_id,))
            rows = self.dictfetchall(cursor)
        return rows
        # return super().get_all(prefix)