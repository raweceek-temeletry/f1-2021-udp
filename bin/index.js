#! /usr/bin/env node
// 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORWARD_ADDRESSES = exports.BIGINT_ENABLED = exports.DEFAULT_PORT = exports.constantsTypes = exports.constants = exports.F1TelemetryClient = void 0;
const dgram = require("dgram");
const events_1 = require("events");
const { validateLocaleAndSetLanguage } = require("typescript");
const constants = require("./constants");
exports.constants = constants;
const constantsTypes = require("./constants/types");
exports.constantsTypes = constantsTypes;
const { PACKETS } = constants;
const parsers_1 = require("./parsers");
const DEFAULT_PORT = 20777;
exports.DEFAULT_PORT = DEFAULT_PORT;
const FORWARD_ADDRESSES = undefined;
exports.FORWARD_ADDRESSES = FORWARD_ADDRESSES;
const BIGINT_ENABLED = true;
exports.BIGINT_ENABLED = BIGINT_ENABLED;
const ADDRESS = 'localhost';
const BINARY_BUTTONS = false;
class F1TelemetryClient extends events_1.EventEmitter {
    constructor(opts = {}) {
        super();
        const { port = DEFAULT_PORT, bigintEnabled = BIGINT_ENABLED, forwardAddresses = FORWARD_ADDRESSES, address = ADDRESS, binaryButtonFlags = BINARY_BUTTONS, } = opts;
        this.port = port;
        this.bigintEnabled = bigintEnabled;
        this.binaryButtonFlags = binaryButtonFlags;
        this.forwardAddresses = forwardAddresses;
        this.address = address;
        this.socket = dgram.createSocket('udp4');
    }
    /**
     *
     * @param {Buffer} message
     */
    static parseBufferMessage(message, bigintEnabled = false, binaryButtonFlags = false) {
        const header = F1TelemetryClient.parsePacketHeader(message, bigintEnabled);
        const { m_packetId } = header;
        const parser = F1TelemetryClient.getParserByPacketId(m_packetId);
        if (!parser) {
            return;
        }
        const packetData = new parser(message, bigintEnabled, binaryButtonFlags);
        const packetID = Object.keys(constants.PACKETS)[ m_packetId ];
        // emit parsed message
        return { packetData, packetID };
    }
    /**
     *
     * @param {Buffer} buffer
     * @param {Boolean} bigIntEnabled
     * @param {Boolean} binaryButtonFlags
     */
    static parsePacketHeader(buffer, bigintEnabled) {
        const packetHeaderParser = new parsers_1.PacketHeaderParser(bigintEnabled);
        return packetHeaderParser.fromBuffer(buffer);
    }
    /**
     *
     * @param {Number} packetFormat
     * @param {Number} packetId
     */
    static getPacketSize(packetFormat, packetId) {
        const { PACKET_SIZES } = constants;
        const packetValues = Object.values(PACKET_SIZES);
        return packetValues[ packetId ][ packetFormat ];
    }
    /**
     *
     * @param {Number} packetId
     */
    static getParserByPacketId(packetId) {
        const packetKeys = Object.keys(PACKETS);
        const packetType = packetKeys[ packetId ];
        switch (packetType) {
            case PACKETS.carDamage:
                return parsers_1.PacketCarDamageParser;
            case PACKETS.sessionHistory:
                return parsers_1.PacketSessionHistoryDataParser;
            case PACKETS.session:
                return parsers_1.PacketSessionDataParser;
            case PACKETS.motion:
                return parsers_1.PacketMotionDataParser;
            case PACKETS.lapData:
                return parsers_1.PacketLapDataParser;
            case PACKETS.event:
                return parsers_1.PacketEventDataParser;
            case PACKETS.participants:
                return parsers_1.PacketParticipantsDataParser;
            case PACKETS.carSetups:
                return parsers_1.PacketCarSetupDataParser;
            case PACKETS.carTelemetry:
                return parsers_1.PacketCarTelemetryDataParser;
            case PACKETS.carStatus:
                return parsers_1.PacketCarStatusDataParser;
            case PACKETS.finalClassification:
                return parsers_1.PacketFinalClassificationDataParser;
            case PACKETS.lobbyInfo:
                return parsers_1.PacketLobbyInfoDataParser;
            default:
                return null;
        }
    }
    /**
     *
     * @param {Buffer} message
     */
    handleMessage(message) {
        if (this.forwardAddresses) {
            // bridge message
            this.bridgeMessage(message);
        }
        const parsedMessage = F1TelemetryClient.parseBufferMessage(message, this.bigintEnabled, this.binaryButtonFlags);
        if (!parsedMessage || !parsedMessage.packetData) {
            return;
        }
        // emit parsed message
        this.emit(parsedMessage.packetID, parsedMessage.packetData.data);
    }
    /**
     *
     * @param {Buffer} message
     */
    bridgeMessage(message) {
        if (!this.socket) {
            throw new Error('Socket is not initialized');
        }
        if (!this.forwardAddresses) {
            throw new Error('No ports to bridge over');
        }
        for (const address of this.forwardAddresses) {
            this.socket.send(message, 0, message.length, address.port, address.ip || '0.0.0.0');
        }
    }
    /**
     * Method to start listening for packets
     */
    start() {
        if (!this.socket) {
            return;
        }
        this.socket.on('listening', () => {
            if (!this.socket) {
                return;
            }
            const address = this.socket.address();
            console.log(`UDP Client listening on ${address.address}:${address.port} 🏎`);
            this.socket.setBroadcast(true);
        });
        this.socket.on('message', (m) => this.handleMessage(m));
        this.socket.bind({
            port: this.port,
            address: this.address,
            exclusive: false,
        });
    }
    /**
     * Method to close the client
     */
    stop() {
        if (!this.socket) {
            return;
        }
        this.socket.close(() => {
            console.log('UDP Client closed 🏁');
            this.socket = undefined;
        });
    }
}
exports.F1TelemetryClient = F1TelemetryClient;
//# sourceMappingURL=index.js.map
// 

// const client = new F1TelemetryClient( {address:'192.168.88.114'});
// client.on('lapData', (data) => {
//     console.log(data);
// });

// client.start();

// // stops the client
// [ 'exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM' ].forEach(eventType => {
//     (process).on(eventType, () => client.stop());
// });
// const dgram = require('dgram');
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