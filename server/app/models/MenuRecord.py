"""
menu
"""

from app.core.BaseRecord import BaseRecord

class MenuRecord(BaseRecord):
    """entity model"""

    def __init__(self, connection):
        super().__init__('app.menus', 'id', connection)
