"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LapHistoryDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
class LapHistoryDataParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.uint32le('m_lapTimeInMS')
            .uint16le('m_sector1TimeInMS')
            .uint16le('m_sector2TimeInMS')
            .uint16le('m_sector3TimeInMS')
            .uint8('m_lapValidBitFlags');
    }
}
exports.LapHistoryDataParser = LapHistoryDataParser;
//# sourceMappingURL=LapHistoryData.js.map