import {F1TelemetryClient, constants} from '..';
const {PACKETS} = constants;
const fsx = require('fs-extra');

const client = new F1TelemetryClient({port: 20777});

fsx.ensureDir('example-output', (error: String) => {
  console.log(error);
});

fsx.ensureFile('example-outputs/events.json', (error: string) => {
  console.log(error);
});

const eventArray: Array<{}> = [];
client.on(PACKETS.event, eventPackage => {
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

  fsx.writeJson('example-outputs/events.json', eventArray, (error: string) => {
    console.log(error);
  });
});

client.start();
