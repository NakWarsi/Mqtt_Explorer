var mqtt = require('mqtt');
var auth = {
    'username': 'nak',
    'password': 'nakwarsi707',
}
var client = mqtt.connect('mqtt://192.168.77.88:1883',auth);


const fs = require('fs');
var file = fs.readFileSync('jsonTest.json');

var recieved=JSON.parse(file).topic

var connectCallback = function () {
    console.log('mqtt broker connected');
    client.subscribe('#');
    
}
    //client.publish('atmData',toSend);
    setInterval(() => {
        client.publish(recieved)
    client.publish('atmData', file);

    },1000*3);

client.on('connect', connectCallback);

var closeCallback = function () {
    console.log('mqtt broker closed');
}
client.on('close', closeCallback);





// client.on('connect', function () {
//     client.subscribe('presence')
//     client.publish('presence', 'Hello mqtt')
// })

// client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(message.toString())
//     client.end()
// })

