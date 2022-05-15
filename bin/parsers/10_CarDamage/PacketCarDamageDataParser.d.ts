/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketCarDamageData } from '../../types/carDamage';
export declare class PacketCarDamageParser extends F1Parser {
    data: PacketCarDamageData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
