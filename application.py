from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

application = Flask(__name__)
socketio = SocketIO(application)

@application.route('/')
def index():
    return render_template('frontend.html')

@socketio.on('chat_send')
def chat_send(message):
    emit('chat_respond', message)

if __name__ == '__main__':
    socketio.run(application, host='0.0.0.0')
