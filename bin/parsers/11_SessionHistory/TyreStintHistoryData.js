"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TyreStintHistoryDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
class TyreStintHistoryDataParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.uint8('m_endLap').uint8('m_tyreActualCompound').uint8('m_tyreVisualCompound');
    }
}
exports.TyreStintHistoryDataParser = TyreStintHistoryDataParser;
//# sourceMappingURL=TyreStintHistoryData.js.map