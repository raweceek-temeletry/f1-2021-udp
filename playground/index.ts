import * as dgram from 'dgram';
import {F1TelemetryClient} from '../src';
import {ParsedMessage} from '../src/types';

const client = new F1TelemetryClient({
  port: 20777,
  forwardAddresses: [{port: 5550}],
  skipParsing: true,
});

const socket = dgram.createSocket('udp4');
socket.bind(5550);

socket.on('message', msg => {
  const parsedMsg: ParsedMessage | undefined = F1TelemetryClient.parseBufferMessage(msg);
  console.clear();
  console.log(parsedMsg?.packetData?.data);
});

client.start();

// stops the client
['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM'].forEach(eventType => {
  (process as NodeJS.EventEmitter).on(eventType, () => client.stop());
});
