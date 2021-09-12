import {F1TelemetryClient, constants} from '..';
const {PACKETS} = constants;

const client = new F1TelemetryClient({port: 20777});

client.on(PACKETS.motion, x => {
  const myCar = x.m_header.m_playerCarIndex;

  console.clear();

  console.log('m_packetId ', x.m_header.m_packetId);
  console.log('m_sessionUID ', x.m_header.m_sessionUID);
  console.log('m_sessionTime ', x.m_header.m_sessionTime);
  console.log('m_frameIdentifier ', x.m_header.m_frameIdentifier);

  console.log(
    'float m_worldPositionX',
    x.m_carMotionData[myCar].m_worldPositionX
  );
  console.log(
    'float m_worldPositionY',
    x.m_carMotionData[myCar].m_worldPositionY
  );
  console.log(
    'float m_worldPositionZ',
    x.m_carMotionData[myCar].m_worldPositionZ
  );
  console.log(
    'float m_worldVelocityX',
    x.m_carMotionData[myCar].m_worldVelocityX
  );
  console.log(
    'float m_worldVelocityY',
    x.m_carMotionData[myCar].m_worldVelocityY
  );
  console.log(
    'int16 m_worldForwardDirX',
    x.m_carMotionData[myCar].m_worldForwardDirX
  );
  console.log(
    'int16 m_worldForwardDirY',
    x.m_carMotionData[myCar].m_worldForwardDirY
  );
  console.log(
    'int16 m_worldForwardDirZ',
    x.m_carMotionData[myCar].m_worldForwardDirZ
  );
  console.log(
    'int16 m_worldRightDirX',
    x.m_carMotionData[myCar].m_worldRightDirX
  );
  console.log(
    'int16 m_worldRightDirY',
    x.m_carMotionData[myCar].m_worldRightDirY
  );
  console.log(
    'int16 m_worldRightDirZ',
    x.m_carMotionData[myCar].m_worldRightDirZ
  );

  console.log(
    'float m_gForceLateral',
    x.m_carMotionData[myCar].m_gForceLateral
  );
  console.log(
    'float m_gForceLongitudinal',
    x.m_carMotionData[myCar].m_gForceLongitudinal
  );
  console.log(
    'float m_gForceVertical',
    x.m_carMotionData[myCar].m_gForceVertical
  );
  console.log('float m_yaw', x.m_carMotionData[myCar].m_yaw);
  console.log('float m_pitch', x.m_carMotionData[myCar].m_pitch);
  console.log('float m_roll', x.m_carMotionData[myCar].m_roll);

  console.log('float m_suspensionPosition FL', x.m_suspensionPosition[2]);
  console.log('float m_suspensionPosition FR', x.m_suspensionPosition[3]);
  console.log('float m_suspensionPosition RL', x.m_suspensionPosition[0]);
  console.log('float m_suspensionPosition RR', x.m_suspensionPosition[1]);

  console.log('float m_suspensionVelocity FL', x.m_suspensionVelocity[2]);
  console.log('float m_suspensionVelocity FR', x.m_suspensionVelocity[3]);
  console.log('float m_suspensionVelocity RL', x.m_suspensionVelocity[0]);
  console.log('float m_suspensionVelocity RR', x.m_suspensionVelocity[1]);

  console.log(
    'float m_suspensionAcceleration FL',
    x.m_suspensionAcceleration[2]
  );
  console.log(
    'float m_suspensionAcceleration FR',
    x.m_suspensionAcceleration[3]
  );
  console.log(
    'float m_suspensionAcceleration RL',
    x.m_suspensionAcceleration[0]
  );
  console.log(
    'float m_suspensionAcceleration RR',
    x.m_suspensionAcceleration[1]
  );

  console.log('float m_wheelSpeed FL', x.m_wheelSpeed[2]);
  console.log('float m_wheelSpeed FR', x.m_wheelSpeed[3]);
  console.log('float m_wheelSpeed RL', x.m_wheelSpeed[0]);
  console.log('float m_wheelSpeed RR', x.m_wheelSpeed[1]);

  console.log('float m_wheelSlip FL', x.m_wheelSlip[2]);
  console.log('float m_wheelSlip FR', x.m_wheelSlip[3]);
  console.log('float m_wheelSlip RL', x.m_wheelSlip[0]);
  console.log('float m_wheelSlip RR', x.m_wheelSlip[1]);

  console.log('float m_localVelocityX', x.m_localVelocityX);
  console.log('float m_localVelocityY', x.m_localVelocityY);
  console.log('float m_localVelocityZ', x.m_localVelocityZ);
  console.log('float m_angularVelocityX', x.m_angularVelocityX);
  console.log('float m_angularVelocityY', x.m_angularVelocityY);
  console.log('float m_angularVelocityZ', x.m_angularVelocityZ);
  console.log('float m_angularAccelerationX', x.m_angularAccelerationX);
  console.log('float m_angularAccelerationY', x.m_angularAccelerationY);
  console.log('float m_angularAccelerationZ', x.m_angularAccelerationZ);
  console.log('float m_frontWheelsAngle', x.m_frontWheelsAngle);
});

client.start();
