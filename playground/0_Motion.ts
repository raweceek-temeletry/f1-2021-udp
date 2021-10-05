import {F1TelemetryClient} from '../src';

const client = new F1TelemetryClient({port: 20777});

client.on('motion', x => {
  const data: string = JSON.stringify(x, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    } else {
      return value;
    }
  });

  console.log(data);

  console.log('--------------');
  console.log(JSON.parse(data));
});

client.start();
