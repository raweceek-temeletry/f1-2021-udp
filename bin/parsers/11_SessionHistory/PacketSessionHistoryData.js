"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSessionHistoryDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
const LapHistoryData_1 = require("./LapHistoryData");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
const TyreStintHistoryData_1 = require("./TyreStintHistoryData");
class PacketSessionHistoryDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .uint8('m_carIdx')
            .uint8('m_numLaps')
            .uint8('m_numTyreStints')
            .uint8('m_bestLapTimeLapNum')
            .uint8('m_bestSector1LapNum')
            .uint8('m_bestSector2LapNum')
            .uint8('m_bestSector3LapNum')
            .array('m_lapHistoryData', {
            length: 100,
            type: new LapHistoryData_1.LapHistoryDataParser(),
        })
            .array('m_tyreStintsHistoryData', {
            length: 8,
            type: new TyreStintHistoryData_1.TyreStintHistoryDataParser(),
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketSessionHistoryDataParser = PacketSessionHistoryDataParser;
//# sourceMappingURL=PacketSessionHistoryData.js.map