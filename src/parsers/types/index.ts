export interface PacketHeader {
  m_packetFormat: number;
  m_packetVersion: number;
  m_packetId: number;
  m_sessionUID: bigint | string;
  m_sessionTime: number;
  m_frameIdentifier: number;
  m_playerCarIndex: number;
  m_surfaceType: number[];
}

import {PacketMotionData} from '../0_Motion/types';
import {PacketSessionData} from '../1_Session/types';
import {PacketLapData} from '../2_LapData/types';
import {PacketEventData} from '../3_Event/types';
import {PacketParticipantsData} from '../4_Participants/types';
import {PacketCarSetupData} from '../5_CarSetups/types';
import {PacketCarTelemetryData} from '../6_CarTelemetry/types';
import {PacketCarStatusData} from '../7_CarStatus/types';
import {PacketFinalClassificationData} from '../8_FinalClassification/types';
import {PacketLobbyInfoData} from '../9_LobbyInfo/types';
import {PacketCarDamageData} from '../10_CarDamage/types';
import {PacketSessionHistoryData} from '../11_SessionHistory/types';

export {
  PacketMotionData,
  PacketSessionData,
  PacketLapData,
  PacketEventData,
  PacketParticipantsData,
  PacketCarSetupData,
  PacketCarTelemetryData,
  PacketCarStatusData,
  PacketFinalClassificationData,
  PacketLobbyInfoData,
  PacketCarDamageData,
  PacketSessionHistoryData,
};

export type parsedPackageData =
  | PacketMotionData
  | PacketSessionData
  | PacketLapData
  | PacketEventData
  | PacketParticipantsData
  | PacketCarSetupData
  | PacketCarTelemetryData
  | PacketCarStatusData
  | PacketFinalClassificationData
  | PacketLobbyInfoData
  | PacketCarDamageData
  | PacketSessionHistoryData
  | PacketHeader;
