"""
menu
"""

from app.core.BaseRecord import BaseRecord

class UserRecord(BaseRecord):
    """entity model"""

    def __init__(self, connection):
        super().__init__('app.users', 'id', connection)

    def login (self, user_name, password):
        """Login with user and password"""
        sql = "SELECT id, user_name, full_name, last_name, gender, avatar, email, identity_document_number, phone, user_role_id FROM app.users WHERE user_name = %s AND password = %s LIMIT 1"
        with self.connection.cursor() as cursor:
            cursor.execute(sql, (user_name,password))
            row = cursor.fetchone()

        if row is not None:
            column_names = [desc[0] for desc in cursor.description]
            return dict(zip(column_names, row))

        return None
