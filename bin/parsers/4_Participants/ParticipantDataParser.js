"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
class ParticipantDataParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.uint8('m_aiControlled')
            .uint8('m_driverId')
            .uint8('m_networkId')
            .uint8('m_teamId')
            .uint8('m_myTeam')
            .uint8('m_raceNumber')
            .uint8('m_nationality')
            .string('m_name', { length: 48, stripNull: true })
            .uint8('m_yourTelemetry');
    }
}
exports.ParticipantDataParser = ParticipantDataParser;
//# sourceMappingURL=ParticipantDataParser.js.map