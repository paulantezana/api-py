"""
model
"""

from app.core.BaseRecord import BaseRecord

class ScreenActionRecord(BaseRecord):
    """screen enity base record"""

    def __init__(self, connection):
        super().__init__(table='app.screen_actions', primary_key='id', connection=connection)


