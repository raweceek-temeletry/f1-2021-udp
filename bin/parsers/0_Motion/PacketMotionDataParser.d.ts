/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketMotionData } from '../../types/motion';
export declare class PacketMotionDataParser extends F1Parser {
    data: PacketMotionData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
