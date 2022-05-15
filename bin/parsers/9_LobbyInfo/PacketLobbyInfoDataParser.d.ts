/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketLobbyInfoData } from '../../types/lobbyInfo';
export declare class PacketLobbyInfoDataParser extends F1Parser {
    data: PacketLobbyInfoData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
