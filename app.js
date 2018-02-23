const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);
const dgram = require('dgram');

const routes = require('./routes');

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

let obj = {};

io.on('connection', function (socket) {
  socket.on('connected', function() {
    console.log('heheh');
	});
});

const cosmosSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true });
cosmosSocket.on('listening', function() {
    const address = cosmosSocket.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

cosmosSocket.on('message', function(message) {
  obj = message.slice(3,message.length-1);
  let json_str = obj.toString('ascii');
  json_str = json_str.replace(/}{/g, ',')
  obj = JSON.parse(json_str);

   console.log(obj)
   console.log(obj.agent_utc)

  agent_utc = obj.agent_utc;

  if (message.type === 'utf8') {
    console.log('Received Message: ' + message.utf8Data);
  }
  else if (message.type === 'binary') {
    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
  }

  // Maintain the list of agents
  if (!(obj.agent_proc in agentListObj)) {
    agentListObj[obj.agent_proc] = [obj.agent_utc, ' '+obj.agent_node, ' '+obj.agent_addr, ' '+obj.agent_port, ' '+obj.agent_bsz];
  } else {
    // Update the time stamp
    agentListObj[obj.agent_proc][0] = obj.agent_utc;
  }

  // Collect the IMU Omega data from the ADCS agent
  if(obj.agent_proc === 'adcs') {
    imuOmega[imuIndex] = obj.device_imu_omega_000;
    imuIndex++;
  }

});

server.listen(3001, function() {
	console.log('Server listening on port:s 3001');
});

// var HOST = '192.168.152.255';
// var PORT = 10020;
//
// cosmosSocket.bind(PORT, HOST);
