/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketSessionHistoryData } from '../../types/sessionHistory';
export declare class PacketSessionHistoryDataParser extends F1Parser {
    data: PacketSessionHistoryData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
