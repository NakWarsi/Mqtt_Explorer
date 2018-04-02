var mqtt = require('mqtt');
const fs = require('fs');

//settingup password
var auth = {
    'username': 'nak',
    'password': 'nakwarsi707',
    'will': {
        'topic': 'TOPNAK',
        'payload': 'payloadnak',
        'qos': 0,
        'retain': 0
    }
}

var client = mqtt.connect('mqtt://192.168.77.51:1883', auth);

client.on('connect', () => {
    console.log('mqtt broker connected');
    setInterval(() => {
        var file = fs.readFileSync('jsonTest.json');
        var topicName = JSON.parse(file).topic;
        client.publish(topicName, file);
    }, 1000 * 10);
});

client.on('close', () => {
    console.log('mqtt broker closed');
});
