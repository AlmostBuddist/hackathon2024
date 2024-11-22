from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return f"Hello World"


@app.route("/<name>")
def hello_user(name: str):
    return f"Hello {name.capitalize()}"


@app.route('/login', methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        return 'Login Proccesing'
    else:
        return 'Ну типа, ты вошёл'
