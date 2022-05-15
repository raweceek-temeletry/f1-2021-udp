/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketLapData } from '../../types/lapData';
export declare class PacketLapDataParser extends F1Parser {
    data: PacketLapData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
