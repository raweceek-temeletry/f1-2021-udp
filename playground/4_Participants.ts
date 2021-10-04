import {F1TelemetryClient} from '../src';

const client = new F1TelemetryClient({port: 20777});

client.on('participants', x => {
  console.clear();
  console.log(x);
});

client.start();