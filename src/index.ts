import * as dgram from 'dgram';
import {EventEmitter} from 'events';
import {AddressInfo} from 'net';
import * as constants from './constants';
import * as constantsTypes from './constants/types';
const {PACKETS} = constants;
import {
  PacketCarDamageParser,
  PacketCarSetupDataParser,
  PacketCarStatusDataParser,
  PacketCarTelemetryDataParser,
  PacketEventDataParser,
  PacketFinalClassificationDataParser,
  PacketHeaderParser,
  PacketLapDataParser,
  PacketLobbyInfoDataParser,
  PacketMotionDataParser,
  PacketParticipantsDataParser,
  PacketSessionDataParser,
  PacketSessionHistoryDataParser,
} from './parsers';
import {
  PacketCarDamageData,
  PacketCarSetupData,
  PacketCarStatusData,
  PacketCarTelemetryData,
  PacketEventData,
  PacketFinalClassificationData,
  PacketLapData,
  PacketLobbyInfoData,
  PacketMotionData,
  PacketParticipantsData,
  PacketSessionData,
  PacketSessionHistoryData,
} from './parsers/types';

import {PacketHeader} from './parsers/types';
import {Address, Options, ParsedMessage, PacketDataParser, F1_2021_UDP_Parser} from './types';

const DEFAULT_PORT = 20777;
const FORWARD_ADDRESSES = undefined;
const BIGINT_ENABLED = true;
const ADDRESS = 'localhost';
const BINARY_BUTTONS = false;

/**
 *
 */
declare interface F1TelemetryClient extends EventEmitter {
  on(event: 'motion', listener: (data: PacketMotionData) => void): this; //0
  on(event: 'session', listener: (data: PacketSessionData) => void): this; //1
  on(event: 'lapData', listener: (data: PacketLapData) => void): this; //2
  on(event: 'event', listener: (data: PacketEventData) => void): this; //3
  on(event: 'participants', listener: (data: PacketParticipantsData) => void): this; //4
  on(event: 'carSetups', listener: (data: PacketCarSetupData) => void): this; //5
  on(event: 'carTelemetry', listener: (data: PacketCarTelemetryData) => void): this; //6
  on(event: 'carStatus', listener: (data: PacketCarStatusData) => void): this; //7
  on(event: 'lobbyInfo', listener: (data: PacketLobbyInfoData) => void): this; //8
  on(event: 'finalClassification', listener: (data: PacketFinalClassificationData) => void): this; //8
  on(event: 'carDamage', listener: (data: PacketCarDamageData) => void): this; //10
  on(event: 'sessionHistory', listener: (data: PacketSessionHistoryData) => void): this; //11
}

class F1TelemetryClient extends EventEmitter {
  port: number;
  bigintEnabled: boolean;
  forwardAddresses?: Address[];
  binaryButtonFlags: boolean;
  address: string;
  socket?: dgram.Socket;

  constructor(opts: Options = {}) {
    super();

    const {
      port = DEFAULT_PORT,
      bigintEnabled = BIGINT_ENABLED,
      forwardAddresses = FORWARD_ADDRESSES,
      address = ADDRESS,
      binaryButtonFlags = BINARY_BUTTONS,
    } = opts;

    this.port = port;
    this.bigintEnabled = bigintEnabled;
    this.binaryButtonFlags = binaryButtonFlags;
    this.forwardAddresses = forwardAddresses;
    this.address = address;
    this.socket = dgram.createSocket('udp4');
  }

  /**
   *
   * @param {Buffer} message
   */
  static parseBufferMessage(
    message: Buffer,
    bigintEnabled = false,
    binaryButtonFlags = false
  ): ParsedMessage | undefined {
    const header: PacketHeader = F1TelemetryClient.parsePacketHeader(message, bigintEnabled);
    const {m_packetId} = header as PacketHeader;

    const parser: F1_2021_UDP_Parser = F1TelemetryClient.getParserByPacketId(m_packetId);

    if (!parser) {
      return;
    }

    const packetData: PacketDataParser = new parser(message, bigintEnabled, binaryButtonFlags);
    const packetID: string = Object.keys(constants.PACKETS)[m_packetId];

    // emit parsed message

    return {packetData, packetID};
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {Boolean} bigIntEnabled
   * @param {Boolean} binaryButtonFlags
   */

  static parsePacketHeader(buffer: Buffer, bigintEnabled: boolean): PacketHeader {
    const packetHeaderParser: PacketHeaderParser = new PacketHeaderParser(bigintEnabled);
    return packetHeaderParser.fromBuffer(buffer) as PacketHeader;
  }

  /**
   *
   * @param {Number} packetFormat
   * @param {Number} packetId
   */
  static getPacketSize(packetFormat: number, packetId: number): number {
    const {PACKET_SIZES} = constants;
    const packetValues: {[index: number]: number}[] = Object.values(PACKET_SIZES);
    return packetValues[packetId][packetFormat];
  }

  /**
   *
   * @param {Number} packetId
   */

  static getParserByPacketId(packetId: number): F1_2021_UDP_Parser {
    const packetKeys: string[] = Object.keys(PACKETS);
    const packetType: string = packetKeys[packetId];

    switch (packetType) {
      case PACKETS.carDamage:
        return PacketCarDamageParser;

      case PACKETS.sessionHistory:
        return PacketSessionHistoryDataParser;

      case PACKETS.session:
        return PacketSessionDataParser;

      case PACKETS.motion:
        return PacketMotionDataParser;

      case PACKETS.lapData:
        return PacketLapDataParser;

      case PACKETS.event:
        return PacketEventDataParser;

      case PACKETS.participants:
        return PacketParticipantsDataParser;

      case PACKETS.carSetups:
        return PacketCarSetupDataParser;

      case PACKETS.carTelemetry:
        return PacketCarTelemetryDataParser;

      case PACKETS.carStatus:
        return PacketCarStatusDataParser;

      case PACKETS.finalClassification:
        return PacketFinalClassificationDataParser;

      case PACKETS.lobbyInfo:
        return PacketLobbyInfoDataParser;

      default:
        return null;
    }
  }

  /**
   *
   * @param {Buffer} message
   */
  handleMessage(message: Buffer): void {
    if (this.forwardAddresses) {
      // bridge message
      this.bridgeMessage(message);
    }

    const parsedMessage: ParsedMessage | undefined = F1TelemetryClient.parseBufferMessage(
      message,
      this.bigintEnabled,
      this.binaryButtonFlags
    );

    if (!parsedMessage || !parsedMessage.packetData) {
      return;
    }

    // emit parsed message
    this.emit(parsedMessage.packetID, parsedMessage.packetData.data);
  }

  /**
   *
   * @param {Buffer} message
   */
  bridgeMessage(message: Buffer): void {
    if (!this.socket) {
      throw new Error('Socket is not initialized');
    }
    if (!this.forwardAddresses) {
      throw new Error('No ports to bridge over');
    }
    for (const address of this.forwardAddresses) {
      this.socket.send(message, 0, message.length, address.port, address.ip || '0.0.0.0');
    }
  }

  /**
   * Method to start listening for packets
   */
  start(): void {
    if (!this.socket) {
      return;
    }

    this.socket.on('listening', (): void => {
      if (!this.socket) {
        return;
      }

      const address: AddressInfo = this.socket.address();
      console.log(`UDP Client listening on ${address.address}:${address.port} 🏎`);
      this.socket.setBroadcast(true);
    });

    this.socket.on('message', (m: Buffer): void => this.handleMessage(m));
    this.socket.bind({
      port: this.port,
      address: this.address,
      exclusive: false,
    });
  }

  /**
   * Method to close the client
   */
  stop(): void {
    if (!this.socket) {
      return;
    }

    return this.socket.close((): void => {
      console.log('UDP Client closed 🏁');
      this.socket = undefined;
    });
  }
}

export {
  F1TelemetryClient,
  constants,
  constantsTypes,
  DEFAULT_PORT,
  BIGINT_ENABLED,
  FORWARD_ADDRESSES,
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
