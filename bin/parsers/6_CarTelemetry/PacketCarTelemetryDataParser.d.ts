/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketCarTelemetryData } from '../../types/carTelemetry';
export declare class PacketCarTelemetryDataParser extends F1Parser {
    data: PacketCarTelemetryData;
    constructor(buffer: Buffer, bigintEnabled: boolean);
}
