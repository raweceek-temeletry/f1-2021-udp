"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarshalZoneParser = void 0;
const F1Parser_1 = require("../F1Parser");
class MarshalZoneParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little').floatle('m_zoneStart').int8('m_zoneFlag');
    }
}
exports.MarshalZoneParser = MarshalZoneParser;
//# sourceMappingURL=MarshalZoneParser.js.map