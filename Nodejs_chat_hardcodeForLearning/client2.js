var mqtt = require('mqtt');
const readline = require('readline');
var client = mqtt.connect('mqtt://localhost:1883');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});



var messageFunction = function (topic, message) {
	console.log("client1: " + message);
};
client.on('message', messageFunction);


/*
rl.question('client2 ', (answer) => {
	client.publish('client2', `${answer}`);
});
*/


client.on('connect', function () {
	rl.question('client2 ', (answer) => {
		client.publish('client2', `${answer}`);
	});
	client.subscribe('client1');
});

var readfunction = function (message) {
	rl.question(message, (answer) => {
		client.publish('client2', `${answer}`);
		readfunction(message);
	});
}

readfunction('client2');


