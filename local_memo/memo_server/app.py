from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import ast


app = Flask(__name__)
CORS(app)

@app.route('/read')
def get():
    with open('memo.txt') as f:
        s = f.read()

    response = {
        'memo': s
    }

    response = make_response(jsonify(response))

    return response


@app.route('/write', methods=["POST", "OPTIONS"])
def post_echo():
    if request.method == "OPTIONS":
        print('OPTIONS')
        return ""

    print('posted')

    body = request.get_data().decode('utf-8')
    dict = ast.literal_eval(body)
    print('The message sent : {}'.format(dict['message']))

    with open('memo.txt', 'w') as f:
        f.write(dict['message'])



    response = {
        'memo' : dict['message']
    }

    response = make_response(jsonify(response))

    return response

if __name__ == '__main__':
    app.run()

