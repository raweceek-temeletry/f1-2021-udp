export const PACKETS: PACKETS_TYPE = {
  motion: 'motion',
  session: 'session',
  lapData: 'lapData',
  event: 'event',
  participants: 'participants',
  carSetups: 'carSetups',
  carTelemetry: 'carTelemetry',
  carStatus: 'carStatus',
  finalClassification: 'finalClassification',
  lobbyInfo: 'lobbyInfo',
  carDamage: 'carDamage',
  sessionHistory: 'sessionHistory',
};

declare interface PACKETS_TYPE {
  motion: 'motion';
  session: 'session';
  lapData: 'lapData';
  event: 'event';
  participants: 'participants';
  carSetups: 'carSetups';
  carTelemetry: 'carTelemetry';
  carStatus: 'carStatus';
  finalClassification: 'finalClassification';
  lobbyInfo: 'lobbyInfo';
  carDamage: 'carDamage';
  sessionHistory: 'sessionHistory';
}
