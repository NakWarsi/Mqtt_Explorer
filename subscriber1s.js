var mqtt = require('mqtt');
var auth = {
    'username': 'nak',
    'password': 'nakwarsi707',
}
var client = mqtt.connect('mqtt://192.168.77.51:1883',auth);
var users = ["SANYAM", "YASH"];
var a = 10;
client.on('connect', () => {
    console.log('mqtt broker connected');
    client.subscribe('atmData');
    client.subscribe('cpuData');
    a = a + 10;
    console.log("in the callback 1: " + a);
});
console.log("outside the callback 1: " + a);

client.on('close', () => {
    console.log('mqtt broker closed');
    console.log("in the callback 2: " + a);
});
console.log("outside the callback 2: " + a);
client.on('message', (topic, message) => {
    var recieved = JSON.parse(message);
    var id = "" + recieved.id;
    if (typeof id == "string") {
        if (topic == 'atmData') {
            if (users.includes(recieved.id.toUpperCase()))
                console.log('at ' + recieved.id + ', temperature is '
                    + recieved.data.temp + ' and humidity is ' + recieved.data.humid);
            else console.log('invalid user -> ' + recieved.id);
        } else
            console.log('topic is: ' + topic);
    } else console.log('id is undefined');
    console.log("in the callback 3: " + a);
});
console.log("outside the callback 3: " + a);



// var mqtt = require('mqtt');
// var client = mqtt.connect('mqtt://192.168.77.88:1883');
// var users = ["SANYAM", "YASH"];
// var connectCallback = function () {
//     console.log('mqtt broker connected');
//     client.subscribe('atmData');
//     client.subscribe('cpuData');
// }
// client.on('connect', connectCallback);

// var closeCallback = function () {
//     console.log('mqtt broker closed');
// }
// client.on('close', closeCallback);

// var messageFunction = function (topic, message) {
//     var recieved = JSON.parse(message);
//     var id = "" + recieved.id;
//     if (typeof id == "string") {
//         if (topic == 'atmData') {
//             if (users.includes(recieved.id.toUpperCase()))
//                 console.log('at ' + recieved.id + ', temperature is '
//                     + recieved.data.temp + ' and humidity is ' + recieved.data.humid);
//             else console.log('invalid user -> ' + recieved.id);

//         } else {
//             console.log('topic is: ' + topic);

//         }
//     } else console.log('id is undefined');

// };
// client.on('message', messageFunction);

