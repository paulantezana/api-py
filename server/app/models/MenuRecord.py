"""
menu
"""

from app.core.BaseRecord import BaseRecord

class MenuRecord(BaseRecord):
    """entity model"""

    def __init__(self, connection):
        super().__init__('app.menus', 'id', connection)

    def get_all_and_screen(self, prefix=''):
        """select get all data"""
        prefix = self.assembly_prefix(prefix)
        sql = f"""select am.id, am.title, am.description, am.icon, am.parent_id, am.sort_order, sc.id as screen_id, sc."type" as screen_type FROM app.menus as am
                left join app.screens as sc on am.id = sc.menu_id and sc.state = true and sc.is_primary = true
                where am.state = true"""
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
            return self.dictfetchall(cursor)
