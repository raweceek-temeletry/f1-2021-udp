import {
  PacketCarDamageParser,
  PacketCarSetupDataParser,
  PacketCarStatusDataParser,
  PacketCarTelemetryDataParser,
  PacketEventDataParser,
  PacketFinalClassificationDataParser,
  PacketLapDataParser,
  PacketLobbyInfoDataParser,
  PacketMotionDataParser,
  PacketParticipantsDataParser,
  PacketSessionDataParser,
  PacketSessionHistoryDataParser,
} from '../parsers';

export interface Options {
  port?: number;
  forwardAddresses?: Address[] | undefined;
  bigintEnabled?: boolean;
  skipParsing?: boolean;
  address?: string;
  binaryButtonFlags?: boolean;
}

export interface Address {
  port: number;
  ip?: string;
}

export interface ParsedMessage {
  packetID: string;
  packetData: PacketDataParser;
}

export type PacketDataParser =
  | PacketSessionDataParser
  | PacketMotionDataParser
  | PacketCarDamageParser
  | PacketSessionHistoryDataParser
  | PacketLapDataParser
  | PacketEventDataParser
  | PacketParticipantsDataParser
  | PacketCarSetupDataParser
  | PacketCarTelemetryDataParser
  | PacketCarStatusDataParser
  | PacketFinalClassificationDataParser
  | PacketLobbyInfoDataParser
  | null;

export type F1_2021_UDP_Parser =
  | typeof PacketCarDamageParser
  | typeof PacketCarSetupDataParser
  | typeof PacketCarStatusDataParser
  | typeof PacketCarTelemetryDataParser
  | typeof PacketEventDataParser
  | typeof PacketFinalClassificationDataParser
  | typeof PacketLapDataParser
  | typeof PacketLobbyInfoDataParser
  | typeof PacketMotionDataParser
  | typeof PacketParticipantsDataParser
  | typeof PacketSessionDataParser
  | typeof PacketSessionHistoryDataParser
  | null;

import {PacketHeader} from '../types/PacketHeader';

import {PacketMotionData} from '../types/motion';
import {PacketSessionData} from '../types/session';
import {PacketLapData} from '../types/lapData';
import {PacketEventData} from '../types/event';
import {PacketParticipantsData} from '../types/participants';
import {PacketCarSetupData} from '../types/carSetups';
import {PacketCarTelemetryData} from '../types/carTelemetry';
import {PacketCarStatusData} from '../types/carStatus';
import {PacketFinalClassificationData} from '../types/finalClassification';
import {PacketLobbyInfoData} from '../types/lobbyInfo';
import {PacketCarDamageData} from '../types/carDamage';
import {PacketSessionHistoryData} from '../types/sessionHistory';

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
  PacketHeader,
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
