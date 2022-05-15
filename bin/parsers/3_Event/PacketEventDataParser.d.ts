/// <reference types="node" />
import { F1Parser } from '../F1Parser';
import { PacketEventData } from '../../types/event';
export declare class FastestLapParser extends F1Parser {
    constructor();
}
export declare class RetirementParser extends F1Parser {
    constructor();
}
export declare class TeamMateInPitsParser extends F1Parser {
    constructor();
}
export declare class RaceWinnerParser extends F1Parser {
    constructor();
}
export declare class PenaltyParser extends F1Parser {
    constructor();
}
export declare class SpeedTrapParser extends F1Parser {
    constructor();
}
export declare class StartLightsParser extends F1Parser {
    constructor();
}
export declare class StartLightsOutParser extends F1Parser {
    constructor();
}
export declare class DriveThroughPenaltyServedParser extends F1Parser {
    constructor();
}
export declare class StopGoPenaltyServedParser extends F1Parser {
    constructor();
}
export declare class FlashbackParser extends F1Parser {
    constructor();
}
export declare class ButtonsParser extends F1Parser {
    constructor(binaryButtonFlags: boolean);
}
export declare class PacketEventDataParser extends F1Parser {
    data: PacketEventData;
    constructor(buffer: Buffer, bigintEnabled: boolean, binaryButtonFlags: boolean);
    unpack2021Format: (buffer: Buffer, bigintEnabled: boolean, binaryButtonFlags: boolean) => void;
    getEventStringCode: (buffer: Buffer, bigintEnabled: boolean) => any;
}
