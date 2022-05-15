"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketLobbyInfoDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
const LobbyInfoDataParser_1 = require("./LobbyInfoDataParser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
class PacketLobbyInfoDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .uint8('m_numPlayers')
            .array('m_lobbyPlayers', { length: 22, type: new LobbyInfoDataParser_1.LobbyInfoDataParser() });
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketLobbyInfoDataParser = PacketLobbyInfoDataParser;
//# sourceMappingURL=PacketLobbyInfoDataParser.js.map