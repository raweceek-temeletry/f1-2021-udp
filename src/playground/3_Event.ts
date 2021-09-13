import {F1TelemetryClient, constants} from '..';
const {PACKETS} = constants;
const fsx = require('fs-extra');
const fs = require('fs');

const client = new F1TelemetryClient({port: 20777});

fsx.ensureDir('example-output', (error: String) => {
  console.log(error);
});

fsx.ensureFile('example-outputs/events.txt', (error: string) => {
  console.log(error);
});

client.on(PACKETS.event, eventPackage => {
  let data = '';
  console.clear();
  console.log(eventPackage);

  data = data + '---------------frame start---------------' + '\n';

  if (eventPackage?.m_header?.m_sessionUID) {
    data =
      data +
      'sessionUID: ' +
      eventPackage?.m_header?.m_sessionUID.toString() +
      '\n';
  }

  if (eventPackage?.m_header.m_sessionTime) {
    data =
      data +
      'sessionTime: ' +
      eventPackage?.m_header.m_sessionTime.toString() +
      '\n';
  }

  if (eventPackage?.m_header.m_frameIdentifier) {
    data =
      data +
      'frameIdentifier: ' +
      eventPackage?.m_header.m_frameIdentifier.toString() +
      '\n';
  }

  if (eventPackage?.m_eventStringCode) {
    data =
      data +
      'eventStringCode: ' +
      eventPackage?.m_eventStringCode.toString() +
      '\n';
  }

  if (eventPackage?.FastestLap?.vehicleIdx) {
    data =
      data +
      'FastestLap vehicleIdx: ' +
      eventPackage?.FastestLap?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.FastestLap?.lapTime) {
    data =
      data +
      'FastestLap lapTime: ' +
      eventPackage?.FastestLap?.lapTime.toString() +
      '\n';
  }

  if (eventPackage?.Retirement?.vehicleIdx) {
    data =
      data +
      'Retirement vehicleIdx: ' +
      eventPackage?.Retirement?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.TeamMateInPits?.vehicleIdx) {
    data =
      data +
      'TeamMateInPits vehicleIdx: ' +
      eventPackage?.TeamMateInPits?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.RaceWinner?.vehicleIdx) {
    data =
      data +
      'RaceWinner vehicleIdx: ' +
      eventPackage?.RaceWinner?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.Penalty?.penaltyType) {
    data =
      data +
      'Penalty penaltyType: ' +
      eventPackage?.Penalty?.penaltyType.toString() +
      '\n';
  }

  if (eventPackage?.Penalty?.infringementType) {
    data =
      data +
      'Penalty infringementType: ' +
      eventPackage?.Penalty?.infringementType.toString() +
      '\n';
  }

  if (eventPackage?.Penalty?.vehicleIdx) {
    data =
      data +
      'Penalty vehicleIdx: ' +
      eventPackage?.Penalty?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.Penalty?.otherVehicleIdx) {
    data =
      data +
      'Penalty otherVehicleIdx: ' +
      eventPackage?.Penalty?.otherVehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.Penalty?.time) {
    data =
      data + 'Penalty time: ' + eventPackage?.Penalty?.time.toString() + '\n';
  }

  if (eventPackage?.Penalty?.lapNum) {
    data =
      data +
      'Penalty lapNum: ' +
      eventPackage?.Penalty?.lapNum.toString() +
      '\n';
  }

  if (eventPackage?.Penalty?.placesGained) {
    data =
      data +
      'Penalty placesGained: ' +
      eventPackage?.Penalty?.placesGained.toString() +
      '\n';
  }

  if (eventPackage?.SpeedTrap?.vehicleIdx) {
    data =
      data +
      'SpeedTrap vehicleIdx: ' +
      eventPackage?.SpeedTrap?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.SpeedTrap?.speed) {
    data =
      data +
      'SpeedTrap speed: ' +
      eventPackage?.SpeedTrap?.speed.toString() +
      '\n';
  }

  if (eventPackage?.SpeedTrap?.overallFastestInSession) {
    data =
      data +
      'SpeedTrap overallFastestInSession: ' +
      eventPackage?.SpeedTrap?.overallFastestInSession.toString() +
      '\n';
  }

  if (eventPackage?.SpeedTrap?.driverFastestInSession) {
    data =
      data +
      'SpeedTrap driverFastestInSession: ' +
      eventPackage?.SpeedTrap?.driverFastestInSession.toString() +
      '\n';
  }

  if (eventPackage?.StartLights?.numLights) {
    data =
      data +
      'StartLights numLights: ' +
      eventPackage?.StartLights?.numLights.toString() +
      '\n';
  }

  if (eventPackage?.StartLightsOut) {
    data =
      data +
      'StartLightsOut StartLightsOut: ' +
      eventPackage?.StartLightsOut.toString() +
      '\n';
  }

  if (eventPackage?.DriveThroughPenaltyServed) {
    data =
      data +
      'DriveThroughPenaltyServed vehicleIdx: ' +
      eventPackage?.DriveThroughPenaltyServed?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.StopGoPenaltyServed) {
    data =
      data +
      'StopGoPenaltyServed vehicleIdx: ' +
      eventPackage?.StopGoPenaltyServed?.vehicleIdx.toString() +
      '\n';
  }

  if (eventPackage?.Flashback?.flashbackFrameIdentifier) {
    data =
      data +
      'Flashback flashbackFrameIdentifier: ' +
      eventPackage?.Flashback?.flashbackFrameIdentifier.toString() +
      '\n';
  }

  if (eventPackage?.Flashback?.flashbackSessionTime) {
    data =
      data +
      'Flashback flashbackSessionTime: ' +
      eventPackage?.Flashback?.flashbackSessionTime.toString() +
      '\n';
  }

  if (eventPackage?.Buttons?.m_buttonStatus) {
    data =
      data +
      'buttonStatus: ' +
      eventPackage?.Buttons?.m_buttonStatus.toString() +
      '\n';
  }

  data = data + '---------------frame end---------------' + '\n';

  fs.appendFile('example-outputs/events.txt', data, (error: string) => {
    console.log(error);
  });
});

client.start();
