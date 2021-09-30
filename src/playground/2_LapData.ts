import {F1TelemetryClient, constants} from '..';

const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20777});

client.on(PACKETS.lapData, lapDataPackage => {
  console.clear();

  const data: string = JSON.stringify(lapDataPackage, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    } else {
      return value;
    }
  });

  console.log('--------------');
  console.log(JSON.parse(data));
});

client.start();
