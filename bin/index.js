#! /usr/bin/env node

function isValidIP(str) {
    let cong = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/
    return cong.test(str);
}
function isValidPort(str) {
    let cong = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    return cong.test(str);
}
function isValid_IP_and_Port(str) {
    let cong = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    return cong.test(str);
}
// extract port from string 192.168.1.88:20777
function extractPort(str) {
    let cong = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    let result = cong.exec(str);
    return result[ 5 ];
}
// extract ip from string string 192.168.1.88:20777
function extractIP(str) {
    let cong = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    let result = cong.exec(str);
    return result[ 1 ] + '.' + result[ 2 ] + '.' + result[ 3 ] + '.' + result[ 4 ];
}

let validArgs = [];
const dgram = require('dgram');
const parser = require('f1-2021-udp').F1TelemetryClient

const socket = dgram.createSocket('udp4');
const args = process.argv.slice(2);
const args2 = process.argv.slice(3);
const ValidLogArgs = []
// validate array of args to be values from 0 to 11
function validateLogArgs(args) {
    args2.map(x => {

        if (x >= 0 && x <= 11) {
            ValidLogArgs.push(x);
        }
    })
}

validateLogArgs(args2);
const setOfLogArgs = new Set(ValidLogArgs);
console.log('set of log args:', setOfLogArgs);

if (args.length == 0) {
    console.error(`
    forwarding flags: -f or --forward
    forwarding args: ip:port
    Example: npx f1-2021-udp -f 192.168.1.114:20777

    log flags: --log or -l
    log args: [package id]
    Example: npx f1-2021-udp --log 1 2 3 4 5 6 7 8 9 10 11
    0: motion
    1: session
    2: lap data
    3: event
    4: participants
    5: car setups
    6: car telemetry
    7: car status
    8: final classification
    9: lobby info
    10: car damage
    11: session history

    Please enter the IP address and port number or use the --log falg.
    Forward Usage: Example: npx f1-2021-udp [<IP>:<PORT>]
    Log Usage: Example: npx f1-2021-udp --log [<PACKAGE ID>]

    `)
    process.exit(1); //an error occurred

} // end of zero args

if (args[ 0 ] == '-f' || args[ 0 ] == '--forward') {
    if (args2.length == 0) {
        console.log(`
        Please enter the IP address and port number!

        Usage: Example: npx f1-2021-udp [<IP>:<PORT>]

        Example: npx f1-2021-udp -forward 192.168.1.114:20777
        `)
        process.exit(1); //an error occurred
    }
    args2.map(arg => {
        if (isValid_IP_and_Port(arg)) {

            const ip = extractIP(arg);
            const port = extractPort(arg);

            validArgs.push({ ip: ip, port: port });
            forward()

        } else {
            console.error(`
            "${arg}"'is not valid!
            
            Please enter the IP address and port number!

            Usage: Example: npx f1-2021-udp [<IP>:<PORT>]

            Example: npx f1-2021-udp -forward 192.168.1.114:20777
            `)
            process.exit(1); //an error occurred
        };
    });
} // end of forward flag 

if (args[ 0 ] == '--log' || args[ 0 ] == '-l') {
    if (setOfLogArgs.size == 0) {
        console.log(`
        log flags: --log or -l
        log args: [package id]
        Example: npx f1-2021-udp --log 1 2 3 4 5 6 7 8 9 10 11
        0: motion
        1: session
        2: lap data
        3: event
        4: participants
        5: car setups
        6: car telemetry
        7: car status
        8: final classification
        9: lobby info
        10: car damage
        11: session history
        `);
        process.exit(1)
    } else {
        log()
    }
} // end of log flag



// forward data to another client
function forward() {
    socket.bind(20777, "127.0.0.1");


    socket.on("listening", () => {
        console.log(`
    listening on:  ${socket.address().address}:${socket.address().port}
`);
        validArgs.map(valid => {
            console.log(`forwarding to ${valid.ip}:${valid.port}`);
        })
        // send to laptop
        validArgs.map(valid => {
            const s2 = dgram.createSocket('udp4');
            socket.on('message', m => {
                s2.send(m, 0, m.length, valid.port, valid.ip, (err, bytes) => {
                    if (err) {
                        console.log(err);
                        process.exit(1); //an error occurred
                    } else {
                        console.log(`forwarding to ${valid.ip}:${valid.port}`);
                    }
                });
            });
        })
    });
}
// log data to console
function log() {
    const client = new parser();

    // motion 0
    // set contains value
    // if (setOfLogArgs.has(0)) {
    //     client.on('motion', function (data) {
    //         console.log(data);
    //     })
    // }
    // // session 1
    // if (setOfLogArgs.has(1)) {
    //     client.on('session', function (data) {
    //         console.log(data);
    //     })
    // }
    // // lap data 2
    // if (setOfLogArgs.has(2)) {
    //     client.on('lapData', function (data) {
    //         console.log(data);
    //     })
    // }

    // event 3
    if (setOfLogArgs.has(3)) {
        client.on('event', function (data) {
            console.log(data);
        })
    }

    // // participants 4
    // if (setOfLogArgs.has(4)) {
    //     client.on('participants', function (data) {
    //         console.log(data);
    //     })
    // }

    // // car setup 5
    // if (setOfLogArgs.has(5)) {
    //     client.on('carSetups', function (data) {
    //         console.log(data);
    //     })
    // }

    // // car telemetry 6
    // if (setOfLogArgs.has(6)) {
    //     client.on('carTelemetry', function (data) {
    //         console.log(data);
    //     })
    // }

    // // car status 7
    // if (setOfLogArgs.has(7)) {
    //     client.on('carStatus', function (data) {
    //         console.log(data);
    //     })
    // }

    // // final classification 8
    // if (setOfLogArgs.has(8)) {
    //     client.on('finalClassification', function (data) {
    //         console.log(data);
    //     })
    // }

    // // lobby info 9
    // if (setOfLogArgs.has(9)) {
    //     client.on('lobbyInfo', function (data) {
    //         console.log(data);
    //     })
    // }

    // // car damage 10
    // if (setOfLogArgs.has(10)) {
    //     client.on('carDamage', function (data) {
    //         console.log(data);
    //     })
    // }

    // // session history 11
    // if (setOfLogArgs.has(11)) {
    //     client.on('sessionHistory', function (data) {
    //         console.log(data);
    //     })
    // }


    // to start listening:
    client.start();
}