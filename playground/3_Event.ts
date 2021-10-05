import {F1TelemetryClient} from '../src';

const fsx = require('fs-extra');

const client: F1TelemetryClient = new F1TelemetryClient({
  port: 20777,
  binaryButtonFlags: true,
  address: '192.168.1.3',
  forwardAddresses: [{port: 20778, ip: '192.168.1.7'}],
});

fsx.ensureDir('example-output', (error: String): void => {
  console.log(error);
});

fsx.ensureFile('example-outputs/events.json', (error: string): void => {
  console.log(error);
});

const eventArray: Array<{}> = [];
client.on('event', (data): void => {
  data;
  const stringData = JSON.stringify(data, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    } else {
      return value;
    }
  });
  console.clear();

  console.log(`
-----------------------------------------------------
  "controller preset 1"  ${data?.Buttons?.Options_or_Menu ? 'pause' : '     '} 

${data?.Buttons?.L2_or_LT ? 'Brake' : '     '}      ${data?.Buttons?.R2_or_RT ? 'Accelerate' : '          '}

${data?.Buttons?.D_Pad_Left ? 'Left' : '    '}   ${data?.Buttons?.D_Pad_Right ? 'Right' : '     '}

-----------------------------------------------------
`);

  console.log(JSON.parse(stringData));
  eventArray.push(JSON.parse(stringData));

  fsx.writeJson('example-outputs/events.json', eventArray, (error: string): void => {
    error ? console.log(error) : null;
  });
});

client.start();
