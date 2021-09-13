import {Parser} from 'binary-parser';
import {PacketMotionData} from './packets/0_Motion/types';
import {PacketSessionData} from './packets/1_Session/types';
import {PacketLapData} from './packets/2_LapData/types';
import {PacketEventData} from './packets/3_Event/types';
import {PacketParticipantsData} from './packets/4_Participants/types';
import {PacketCarSetupData} from './packets/5_CarSetups/types';
import {PacketCarTelemetryData} from './packets/6_CarTelemetry/types';
import {PacketCarStatusData} from './packets/7_CarStatus/types';
import {PacketFinalClassificationData} from './packets/8_FinalClassification/types';
import {PacketLobbyInfoData} from './packets/9_LobbyInfo/types';
import {PacketCarDamageData} from './packets/10_CarDamage/types';
import {PacketSessionHistoryData} from './packets/11_SessionHistory/types';
export class F1Parser extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  fromBuffer(
    buffer: Buffer
  ):
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
    | null {
    return this.parse(buffer);
  }
}
