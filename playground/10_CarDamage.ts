import {F1TelemetryClient} from '../src';

const client = new F1TelemetryClient({port: 20777});

client.on('carDamage', x => {
  console.clear();
  console.log(x.m_carDamageData[x.m_header.m_playerCarIndex]);
});

client.start();
