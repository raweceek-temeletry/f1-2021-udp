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
  const data = JSON.stringify(eventPackage, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    } else {
      return value;
    }
  });
  console.clear();
  console.log(data);

  console.log(`
-----------------------------------------------------
  "controller preset 1"  ${
    eventPackage?.Buttons?.Options_or_Menu ? 'pause' : '     '
  } 

${eventPackage?.Buttons?.L2_or_LT ? 'Brake' : '     '}      ${
    eventPackage?.Buttons?.R2_or_RT ? 'Accelerate' : '          '
  }

${eventPackage?.Buttons?.D_Pad_Left ? 'Left' : '    '}   ${
    eventPackage?.Buttons?.D_Pad_Right ? 'Right' : '     '
  }

-----------------------------------------------------
`);
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
