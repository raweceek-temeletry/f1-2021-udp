"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketEventDataParser = exports.ButtonsParser = exports.FlashbackParser = exports.StopGoPenaltyServedParser = exports.DriveThroughPenaltyServedParser = exports.StartLightsOutParser = exports.StartLightsParser = exports.SpeedTrapParser = exports.PenaltyParser = exports.RaceWinnerParser = exports.TeamMateInPitsParser = exports.RetirementParser = exports.FastestLapParser = void 0;
const binary_parser_1 = require("binary-parser");
const constants_1 = require("../../constants");
const F1Parser_1 = require("../F1Parser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
class FastestLapParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('vehicleIdx').floatle('lapTime');
    }
}
exports.FastestLapParser = FastestLapParser;
class RetirementParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('vehicleIdx');
    }
}
exports.RetirementParser = RetirementParser;
class TeamMateInPitsParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('vehicleIdx');
    }
}
exports.TeamMateInPitsParser = TeamMateInPitsParser;
class RaceWinnerParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('vehicleIdx');
    }
}
exports.RaceWinnerParser = RaceWinnerParser;
class PenaltyParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little')
            .uint8('penaltyType')
            .uint8('infringementType')
            .uint8('vehicleIdx')
            .uint8('otherVehicleIdx')
            .uint8('time')
            .uint8('lapNum')
            .uint8('placesGained');
    }
}
exports.PenaltyParser = PenaltyParser;
class SpeedTrapParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little')
            .uint8('vehicleIdx')
            .floatle('speed')
            .uint8('overallFastestInSession')
            .uint8('driverFastestInSession');
    }
}
exports.SpeedTrapParser = SpeedTrapParser;
class StartLightsParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('numLights');
    }
}
exports.StartLightsParser = StartLightsParser;
class StartLightsOutParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('LightsOut');
    }
}
exports.StartLightsOutParser = StartLightsOutParser;
class DriveThroughPenaltyServedParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('vehicleIdx');
    }
}
exports.DriveThroughPenaltyServedParser = DriveThroughPenaltyServedParser;
class StopGoPenaltyServedParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint8('vehicleIdx');
    }
}
exports.StopGoPenaltyServedParser = StopGoPenaltyServedParser;
class FlashbackParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint32le('flashbackFrameIdentifier').floatle('flashbackSessionTime');
    }
}
exports.FlashbackParser = FlashbackParser;
class ButtonsParser extends F1Parser_1.F1Parser {
    constructor(binaryButtonFlags) {
        super();
        if (binaryButtonFlags) {
            this.endianess('little')
                .bit1('bit1')
                .bit1('bit2')
                .bit1('bit3')
                .bit1('bit4')
                .bit1('bit5')
                .bit1('bit6')
                .bit1('bit7')
                .bit1('bit8')
                .bit1('Right_Stick_Right')
                .bit1('Right_Stick_Up')
                .bit1('Right_Stick_Down')
                .bit1('Special')
                .bit1('bit13')
                .bit1('bit14')
                .bit1('bit15')
                .bit1('bit16')
                .bit1('Options_or_Menu')
                .bit1('L1_or_LB')
                .bit1('R1_or_RB')
                .bit1('L2_or_LT')
                .bit1('R2_or_RT')
                .bit1('Left_Stick_Click')
                .bit1('Right_Stick_Click')
                .bit1('Right_Stick_Left')
                .bit1('Cross_or_A')
                .bit1('Triangle_or_Y')
                .bit1('Circle_or_B')
                .bit1('Square_or_X')
                .bit1('D_Pad_Left')
                .bit1('D_Pad_Right')
                .bit1('D_Pad_Up')
                .bit1('D_Pad_Down');
        }
        else {
            this.endianess('little').uint32le('m_buttonStatus');
        }
    }
}
exports.ButtonsParser = ButtonsParser;
class PacketEventDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled, binaryButtonFlags) {
        super();
        this.unpack2021Format = (buffer, bigintEnabled, binaryButtonFlags) => {
            const eventStringCode = this.getEventStringCode(buffer, bigintEnabled);
            if (eventStringCode === constants_1.EVENT_CODES.FastestLap) {
                this.nest('FastestLap', { type: new FastestLapParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.Retirement) {
                this.nest('Retirement', { type: new RetirementParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.TeammateInPits) {
                this.nest('TeamMateInPits', { type: new TeamMateInPitsParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.RaceWinner) {
                this.nest('RaceWinner', { type: new RaceWinnerParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.PenaltyIssued) {
                this.nest('Penalty', { type: new PenaltyParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.SpeedTrapTriggered) {
                this.nest('SpeedTrap', { type: new SpeedTrapParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.StartLights) {
                this.nest('StartLights', { type: new StartLightsParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.LightsOut) {
                this.nest('StartLightsOut', { type: new StartLightsOutParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.DriveThroughServed) {
                this.nest('DriveThroughPenaltyServed', { type: new DriveThroughPenaltyServedParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.StopGoServed) {
                this.nest('StopGoPenaltyServed', { type: new StopGoPenaltyServedParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.Flashback) {
                this.nest('Flashback', { type: new FlashbackParser() });
            }
            else if (eventStringCode === constants_1.EVENT_CODES.ButtonStatus) {
                this.nest('Buttons', { type: new ButtonsParser(binaryButtonFlags) });
            }
        };
        this.getEventStringCode = (buffer, bigintEnabled) => {
            const headerParser = new binary_parser_1.Parser()
                .endianess('little')
                .nest('m_header', { type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled) })
                .string('m_eventStringCode', { length: 4 });
            const { m_eventStringCode } = headerParser.parse(buffer);
            return m_eventStringCode;
        };
        this.endianess('little')
            .nest('m_header', { type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled) })
            .string('m_eventStringCode', { length: 4 })
            .unpack2021Format(buffer, bigintEnabled, binaryButtonFlags);
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketEventDataParser = PacketEventDataParser;
//# sourceMappingURL=PacketEventDataParser.js.map