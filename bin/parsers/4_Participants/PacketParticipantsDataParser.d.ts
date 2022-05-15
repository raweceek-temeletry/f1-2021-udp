/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketParticipantsData } from '../../types/participants';
export declare class PacketParticipantsDataParser extends F1Parser {
    data: PacketParticipantsData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
