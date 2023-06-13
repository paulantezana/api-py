"""
database connection
"""

import psycopg2


def get_connection():
    """Get database conextion postgres"""
    return psycopg2.connect(
        host='localhost',
        user='yoel',
        password='newdata',
        database='sncrud'
    )
