import * as dgram from 'dgram';
import {constants, F1TelemetryClient} from '..';

const {PACKETS} = constants;

const client = new F1TelemetryClient({
  port: 20777,
  forwardAddresses: [{port: 5550}],
  skipParsing: true,
});

const socket = dgram.createSocket('udp4');
socket.bind(5550);

socket.on('message', (msg) => {
  const parsedmsg = F1TelemetryClient.parseBufferMessage(msg);

  if(parsedmsg?.packetData?.data===undefined){
  } else {
    console.clear();
  console.log(parsedmsg?.packetData?.data);
  }
});

client.start();

// stops the client
[`exit`,
 `SIGINT`,
 `SIGUSR1`,
 `SIGUSR2`,
 `uncaughtException`,
 `SIGTERM`,
].forEach((eventType) => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
