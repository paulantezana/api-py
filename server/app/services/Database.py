"""
database connection
"""

import psycopg2


def get_connection():
    """Get database conextion postgres"""
    return psycopg2.connect(
        host='localhost',
        user='sn_crud_user',
        password='cascadesheet',
        database='sn_crud',
        # port='5433'
    )
