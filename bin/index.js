#! /usr/bin/env node

function isValidIP(str) {
    let cong = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/
    return cong.test(str);
}
function isValidPort(str) {
    let cong = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    return cong.test(str);
}
function isValidIPandPort(str) {
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

const socket = dgram.createSocket('udp4');
const args = process.argv.slice(2);

if (args.length == 0) {
    console.error(`
    Please enter the IP address and port number
    Usage: Example: npx f1-2021-udp-forwarder [<IP>:<PORT>]
    Example: npx f1-2021-udp-forwarder 192.168.1.114:20777`)
} else {
    args.map(arg => {
        if (isValidIPandPort(arg)) {
            const ip = extractIP(arg);
            const port = extractPort(arg);
            validArgs.push({ ip: ip, port: port });
        } else {
            console.error(`"${arg}"'is not valid!
            
            Please enter the IP address and port number
            Usage: Example: npx f1-2021-udp-forwarder [<IP>:<PORT>]
            Example: npx f1-2021-udp-forwarder 192.168.1.114:20777`)
            process.exit(1); //an error occurred
        };
    });


}
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