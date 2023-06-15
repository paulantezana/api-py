"""Exeptions"""


class ControlledException(Exception):
    """Excepcion controlada"""
    def __init__(self, message):
        super().__init__(message)
