import {F1TelemetryClient, constants} from '../src';
const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20777});

client.on(PACKETS.session, x => {
  console.clear();
  console.log(x);
});

client.start();
