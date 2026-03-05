from db import execute_query

def get_all_songs():
  SQL = '''
    SELECT s.id, s.name, s.artist
    FROM songs s
  '''
  return execute_query(SQL)

def get_song_by_id(song_id):
  SQL = '''
    SELECT s.id, s.name, s.artist
    FROM songs s
    WHERE s.id = %s
  '''
  return execute_query(SQL, (song_id))

def get_song_notes(song_id):
  SQL = '''
    SELECT s.id, sn.note_content
    FROM songs s
    WHERE song_id = %s
  '''
  return execute_query(SQL, (song_id))
