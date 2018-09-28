var mqtt = require('mqtt');
const readline = require('readline');
var client = mqtt.connect('mqtt://localhost:1883');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});


client.on('connect', function () {
	rl.question('client1 ', (answer) => {
				client.publish('client1', `${answer}`);
	});
	client.subscribe('client2');
});


var messageFunction = function (topic, message) {
	console.log("client2: " + message);
};

client.on('message', messageFunction);



var readfunction = function (message) {
	rl.question(message, (answer) => {
		client.publish('client1', `${answer}`);
		readfunction(message);
	});
}

readfunction('client 1');
