"""
Result object
"""


class Result:
    """Standart result response"""

    def __init__(self):
        self.success = False
        self.message = ''
        self.result = None
