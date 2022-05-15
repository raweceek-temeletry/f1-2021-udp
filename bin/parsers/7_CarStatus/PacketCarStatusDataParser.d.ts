/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketCarStatusData } from '../../types/carStatus';
export declare class PacketCarStatusDataParser extends F1Parser {
    data: PacketCarStatusData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
