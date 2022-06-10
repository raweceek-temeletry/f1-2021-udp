import * as dgram from 'dgram';
import {F1TelemetryClient} from '../src';
import {ParsedMessage} from '../src/types';

const socket = dgram.createSocket('udp4');
socket.bind(20777);
socket.on('listening', () => {
  socket.on('message', msg => {
    const parsedMsg: ParsedMessage | undefined = F1TelemetryClient.parseBufferMessage(msg);
    console.log({parsed: parsedMsg?.packetData?.data, raw: msg});
  });
});
