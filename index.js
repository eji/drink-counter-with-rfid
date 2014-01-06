/**
 * Before use this, you should execute a following command as root.
 *   # echo BB-UART4 > /sys/device/bone_capemgr.8/slots
 */
var Gpio = require('onoff').Gpio
  , serialport = require('serialport')
  , SerialPort = serialport.SerialPort
  // , enablePort = new Gpio(5, 'out')            // P9.5(GPIO)
  ;

// i don't know how to set low value...
// console.log('enable RFID reader');
// enablePort.writeSync(0);

console.log('open tty to read RFIDs');
var inputSerial = new SerialPort("/dev/ttyO4", {  // P9.22(Serial)
  baudrate: 2400,
  databits: 8,
  stopbits: 1,
  parity: 'none',
  parser: serialport.parsers.readline("\r"), 
});

inputSerial.on("open", function() {
  console.log("opened tty");
  inputSerial.on('data', function(data) {
    console.log("data: " + data.replace(/^\s*|\s*$/g, ""));
  });
});

var exit = function() {
  console.log('begin unexport');
  enablePort.unexport();
  console.log('end unexport');
  process.exit();
};
// process.on('SIGINT', exit);
