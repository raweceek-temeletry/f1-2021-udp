"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyInfoDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
class LobbyInfoDataParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.uint8('m_aiControlled')
            .uint8('m_teamId')
            .uint8('m_nationality')
            .string('m_name', { length: 48, stripNull: true })
            .uint8('m_carNumber')
            .uint8('m_readyStatus');
    }
}
exports.LobbyInfoDataParser = LobbyInfoDataParser;
//# sourceMappingURL=LobbyInfoDataParser.js.map