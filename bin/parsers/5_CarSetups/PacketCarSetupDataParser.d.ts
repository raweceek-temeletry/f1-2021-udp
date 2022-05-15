/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketCarSetupData } from '../../types/carSetups';
export declare class PacketCarSetupDataParser extends F1Parser {
    data: PacketCarSetupData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
