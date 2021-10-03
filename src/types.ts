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
} from './parsers/packets';

export interface Options {
  port?: number;
  forwardAddresses?: Address[] | undefined;
  bigintEnabled?: boolean;
  skipParsing?: boolean;
  address?: string;
  binaryButtons?: boolean;
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
