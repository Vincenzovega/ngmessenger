/**
 * Created by vincentleyne on 18/11/2015.
 */

var serialPort = require('serialport');

var arduino = function () {
    var Port;
    serialPort.list(function (err, ports) {
        ports.forEach(function (port) {
            console.dir(port.manufacturer);

            if (port.manufacturer == "Arduino (www.arduino.cc)") {
                console.log("Found arduino");
                Port = new serialPort.SerialPort(port.comName,
                    {
                        baudrate: 9600,
                        parser: serialPort.parsers.readline("\n")
                    }, false);

            }
        });
        if (typeof(Port) == undefined) {
            console.log("Couldn't find Arduino");
        } else {
            Port.open(function (error) {
                if (error) {
                    console.log("error opening port" + error);
                } else {
                    console.log("connect to Arduino OK");
                    this.Port = Port;

                }

                /*setInterval(function() {

                 go = !go;
                 if (go) arduinoPort.write("start\n");
                 if (!go) arduinoPort.write("stop\n");
                 },1000);*/

            });
        }


    });


};


module.exports = arduino;

