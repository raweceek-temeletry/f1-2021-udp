import {F1TelemetryClient, constants} from '..';
import {PacketEventData} from '../parsers/packets/types';
const {PACKETS} = constants;
const fsx = require('fs-extra');

const client: F1TelemetryClient = new F1TelemetryClient({
  port: 20777,
  binaryButtonFlags: true,
});

fsx.ensureDir('example-output', (error: String): void => {
  console.log(error);
});

fsx.ensureFile('example-outputs/events.json', (error: string): void => {
  console.log(error);
});

const eventArray: Array<{}> = [];
client.on(PACKETS.event, (eventPackage: PacketEventData): void => {
  console.clear();

  const data = JSON.stringify(eventPackage, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    } else {
      return value;
    }
  });
  console.log(data);

  console.log('--------------');
  console.log(JSON.parse(data));
  eventArray.push(JSON.parse(data));

  fsx.writeJson(
    'example-outputs/events.json',
    eventArray,
    (error: string): void => {
      error ? console.log(error) : null;
    }
  );
});

client.start();
