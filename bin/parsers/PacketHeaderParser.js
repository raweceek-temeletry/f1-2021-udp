"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketHeaderParser = void 0;
const F1Parser_1 = require("../parsers/F1Parser");
class PacketHeaderParser extends F1Parser_1.F1Parser {
    constructor(bigintEnabled) {
        super();
        this.endianess('little')
            .uint16le('m_packetFormat')
            .uint8('m_gameMajorVersion')
            .uint8('m_gameMinorVersion')
            .uint8('m_packetVersion')
            .uint8('m_packetId');
        if (bigintEnabled) {
            this.uint64('m_sessionUID');
        }
        else {
            this.skip(8);
        }
        this.floatle('m_sessionTime')
            .uint32le('m_frameIdentifier')
            .uint8('m_playerCarIndex')
            .uint8('m_secondaryPlayerCarIndex');
    }
}
exports.PacketHeaderParser = PacketHeaderParser;
//# sourceMappingURL=PacketHeaderParser.js.map