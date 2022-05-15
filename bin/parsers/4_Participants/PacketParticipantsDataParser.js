"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketParticipantsDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
const ParticipantDataParser_1 = require("./ParticipantDataParser");
class PacketParticipantsDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .uint8('m_numActiveCars')
            .array('m_participants', {
            length: 22,
            type: new ParticipantDataParser_1.ParticipantDataParser(),
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketParticipantsDataParser = PacketParticipantsDataParser;
//# sourceMappingURL=PacketParticipantsDataParser.js.map