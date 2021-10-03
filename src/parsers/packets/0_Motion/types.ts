import {PacketHeader} from '../types';

interface CarMotionData {
  m_worldPositionX: number;
  m_worldPositionY: number;
  m_worldPositionZ: number;
  m_worldVelocityX: number;
  m_worldVelocityY: number;
  m_worldVelocityZ: number;
  m_worldForwardDirX: number;
  m_worldForwardDirY: number;
  m_worldForwardDirZ: number;
  m_worldRightDirX: number;
  m_worldRightDirY: number;
  m_worldRightDirZ: number;
  m_gForceLateral: number;
  m_gForceLongitudinal: number;
  m_gForceVertical: number;
  m_yaw: number;
  m_pitch: number;
  m_roll: number;
}

export interface PacketMotionData {
  m_header: PacketHeader;
  m_carMotionData: CarMotionData[];
  m_suspensionPosition: [number, number, number, number];
  m_suspensionVelocity: [number, number, number, number];
  m_suspensionAcceleration: [number, number, number, number];
  m_wheelSpeed: [number, number, number, number];
  m_wheelSlip: [number, number, number, number];
  m_localVelocityX: number;
  m_localVelocityY: number;
  m_localVelocityZ: number;
  m_angularVelocityX: number;
  m_angularVelocityY: number;
  m_angularVelocityZ: number;
  m_angularAccelerationX: number;
  m_angularAccelerationY: number;
  m_angularAccelerationZ: number;
  m_frontWheelsAngle: number;
}
