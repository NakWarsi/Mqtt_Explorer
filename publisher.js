var mqtt = require('mqtt')   //requiring mqtt package

//autherization and will which is given to the broker
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
var client = mqtt.connect('mqtt://192.168.77.51:1883',auth)   //connect the mqtt of given broker

var connectCallback = function () {
    console.log('mqtt broker connected')
    client.subscribe('#')
    client.publish("hello publish")           //publish the string
}

client.on('connect', connectCallback)                       // calling call back function on connection
 
var closeCallback = function () {     
    console.log('mqtt broker closed')
}
client.on('close', closeCallback)              // calling callback function closing


var messageFunction = function (topic, message) {
    console.log("Topic: " + topic)
    console.log("Message: " + message)
}
client.on('message', messageFunction)

// var array{
// id:'nak'

// };

/*
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})

*/