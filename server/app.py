from flask import Flask, jsonify
from neurosdk.scanner import Scanner
from neurosdk.sensor import Sensor
from neurosdk.cmn_types import *
from time import sleep 
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)

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

@app.route('/search_devices')
def search_scaners():
    def sensor_found(scanner, sensors):
        print(sensors)
        for sensor in sensors:
            print('Sensor %s' % sensor)
    
    scanner = Scanner([SensorFamily.LEBrainBit])
    scanner.sensorsChanged = sensor_found
    scanner.start()
    print("Starting search for 5 sec...")
    sleep(5)
    scanner.stop()

    sensorsInfo = scanner.sensors()
    
    def toJson(sensor: SensorInfo):
        return {
            'name': sensor.Name,
            'address': sensor.Address,
            'serialNumber': sensor.SerialNumber,
        }
    
    return jsonify(list(map(toJson, sensorsInfo)))