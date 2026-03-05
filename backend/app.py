import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from routes.song_routes import song_bp

app = Flask(__name__)
CORS(app)

load_dotenv()

app.register_blueprint(song_bp, url_prefix='/api/songs')

SONG_DATABASE = {
  "is-this-love": ["C#", "F#", "G#", "A"],
  "blinding-lights": ["Fm", "Cm", "Bbm", "Ab"],
  "seven-nation-army": ["E", "E", "G", "E", "D", "C", "B"]
}

@app.route('/notes/<song_name>', methods=['GET'])
def get_notes(song_name):
  notes = SONG_DATABASE.get(song_name)
  if notes:
    return jsonify({
      "song": song_name,
      "notes": notes
    }), 200
  else:
    return jsonify({ "error": "Song not found" }), 404

if __name__ == '__main__':
  app.run(debug=True, port=os.getenv('PORT'))