var fs = require('fs');

var auth = {
    'username': 'nak',
    'password': 'nakwarsi707',
    'will': {
        'topic': 'TOPNAK',
        'payload': 'payloadnak',
        'qos': 0,
        'retain': true
    }
}


var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://192.168.77.51:1883',auth);
var users = ["SANYAM", "YASH"];
client.on('connect', () => {
    console.log('mqtt broker connected');
    client.subscribe('atmData');
    client.subscribe('cpuData');
});
client.on('close', () => {
    console.log('mqtt broker closed');
});

//send data

client.on('message', (topic, message) => {
    var recieved = JSON.parse(message).msg;
    var id = "" + recieved.id;
    var mytime = new Date().toLocaleString()

    var xwr = 'at ' + recieved.id + ', temperature is '
        + recieved.data.temp + ' and humidity is ' + recieved.data.humid+ "time =  "+mytime


//open a new file and send the data 

    fs.writeFile('mynewfile3.txt',xwr, function (err) {
        if (err) throw err;
        console.log('Saved!');

    });
    
    

    if (typeof id == "string") {
        if (topic == 'atmData') {
            console.log('Atmospheric data is recieved');

            if (users.includes(recieved.id.toUpperCase()))
                console.log('at ' + recieved.id + ', temperature is '
                    + recieved.data.temp + ' and humidity is ' + recieved.data.humid);

        } else if (topic == 'cpuData') {
            console.log('CPU data is recieved');
            console.log(recieved);

            // if (users.includes(recieved.id.toUpperCase()))
            //     console.log('at ' + recieved.id + ', temperature is '
            //         + recieved.data.temp + ' and humidity is ' + recieved.data.humid);
        } else
            console.log('topic is: ' + topic);
    } else console.log('id is undefined');
});
