from flask import Flask, render_template, jsonify, request

application = Flask(__name__)


@application.route('/')
def index():
    return render_template('frontend.html')


if __name__ == '__main__':
    application.run(port=5000, debug=True)
