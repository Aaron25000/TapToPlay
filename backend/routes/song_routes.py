from flask import Blueprint, jsonify, request
from services import song_service

song_bp = Blueprint('songs', __name__)

@song_bp.route('/', methods=['GET'])
def list_songs():
  songs = song_service.get_all_songs()
  return jsonify(songs)

@song_bp.route('/<int:id>', methods=['GET'])
def song_details(id):
  song = song_service.get_song_notes(id)
  return jsonify(song)