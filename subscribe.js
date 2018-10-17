var mqtt = require('mqtt');                //require mqtt
//authentication
var auth={'username': 'nak',
    'password': 'nakwarsi707',}
// making connection
var client = mqtt.connect('mqtt://192.168.77.51:1883',auth);

var users = []; // to increase the value 

var connectCallback = function () {
    console.log('mqtt broker connected');
    client.subscribe('#');
}
//on connection callback function
client.on('connect', connectCallback);


var closeCallback = function () {
    console.log('mqtt broker closed');
}

//on closing calling function
client.on('close', closeCallback);

//to print on subscribe side
var messageFunction = function (topic, message) {
    console.log("Topic: " + topic);          // print topic what publisher have published on
    console.log("Message: " + message);      // message typed on publisher side
    users.push(topic);                                                     //puch the topic to users variable                       
    console.log('\nThere are '+users.length+' users');                     //printing no of users
    console.log('and they are: '+users);                                     
};
client.on('message', messageFunction);                    //calling message function as calback