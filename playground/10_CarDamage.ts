import {F1TelemetryClient, constants} from '../src';
const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20777});

client.on(PACKETS.carDamage, x => {
  console.clear();
  console.log(x.m_carDamageData[x.m_header.m_playerCarIndex]);
});

client.start();
