"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketFormatParser = void 0;
const F1Parser_1 = require("./F1Parser");
class PacketFormatParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').uint16le('m_packetFormat');
    }
}
exports.PacketFormatParser = PacketFormatParser;
//# sourceMappingURL=PacketFormatParser.js.map