import {F1TelemetryClient, PacketLapData, PacketSessionData, PacketSessionHistoryData} from '../src';

const client:F1TelemetryClient = new F1TelemetryClient({port: 20777, address: '192.168.1.122'});

client.on('lapData', data => {
  let LapData:PacketLapData = data
  console.clear();

  const lapData: string = JSON.stringify(data, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    } else {
      return value;
    }
  });

  console.log('--------------');
  console.log(JSON.parse(lapData));
});

client.start();

