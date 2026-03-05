import os
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

load_dotenv()

def get_connection():
  return psycopg2.connect(os.getenv('DATABASE_URL'))

def execute_query(query, params=(), fetch=True):
  conn = get_connection()

  cur = conn.cursor(cursor_factory=RealDictCursor)
  try:
    cur.execute(query, params)
    conn.commit()
    return cur.fetchall() if fetch else None
  finally:
    cur.close()
    conn.close()