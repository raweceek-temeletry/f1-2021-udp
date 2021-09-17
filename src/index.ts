import * as dgram from 'dgram';
import {EventEmitter} from 'events';
import {AddressInfo} from 'net';
import * as constants from './constants';
import * as constantsTypes from './constants/types';
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
} from './parsers/packets';

import {PacketHeader} from './parsers/packets/types/index';
import {Address, Options, ParsedMessage, PacketData} from './types';

const DEFAULT_PORT = 20777;
const FORWARD_ADDRESSES = undefined;
const BIGINT_ENABLED = true;
const ADDRESS = 'localhost';

/**
 *
 */
class F1TelemetryClient extends EventEmitter {
  port: number;
  bigintEnabled: boolean;
  forwardAddresses?: Address[];
  address: string;
  socket?: dgram.Socket;

  constructor(opts: Options = {}) {
    super();

    const {
      port = DEFAULT_PORT,
      bigintEnabled = BIGINT_ENABLED,
      forwardAddresses = FORWARD_ADDRESSES,
      address = ADDRESS,
    } = opts;

    this.port = port;
    this.bigintEnabled = bigintEnabled;
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
    bigintEnabled = false
  ): ParsedMessage | undefined {
    const header: PacketHeader = F1TelemetryClient.parsePacketHeader(
      message,
      bigintEnabled
    );
    const {m_packetId} = header as PacketHeader;

    const parser:
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
      | null = F1TelemetryClient.getParserByPacketId(m_packetId);

    if (!parser) {
      return;
    }

    const packetData: PacketData = new parser(message, bigintEnabled);
    const packetID: string = Object.keys(constants.PACKETS)[m_packetId];

    // emit parsed message
    return {packetData, packetID};
  }

  /**
   *
   * @param {Buffer} buffer
   * @param {Boolean} bigIntEnabled
   */

  static parsePacketHeader(
    buffer: Buffer,
    bigintEnabled: boolean
  ): PacketHeader {
    const packetHeaderParser: PacketHeaderParser = new PacketHeaderParser(
      bigintEnabled
    );
    return packetHeaderParser.fromBuffer(buffer) as PacketHeader;
  }

  /**
   *
   * @param {Number} packetFormat
   * @param {Number} packetId
   */
  static getPacketSize(packetFormat: number, packetId: number): number {
    const {PACKET_SIZES} = constants;
    const packetValues: {[index: number]: number}[] =
      Object.values(PACKET_SIZES);
    return packetValues[packetId][packetFormat];
  }

  /**
   *
   * @param {Number} packetId
   */

  static getParserByPacketId(
    packetId: number
  ):
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
    | null {
    const {PACKETS} = constants;

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

    const parsedMessage: ParsedMessage | undefined =
      F1TelemetryClient.parseBufferMessage(message, this.bigintEnabled);

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
      this.socket.send(
        message,
        0,
        message.length,
        address.port,
        address.ip || '0.0.0.0'
      );
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
      console.log(
        `UDP Client listening on ${address.address}:${address.port} 🏎`
      );
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
};
