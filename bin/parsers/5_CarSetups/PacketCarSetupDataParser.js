"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketCarSetupDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
const CarSetupDataParser_1 = require("./CarSetupDataParser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
class PacketCarSetupDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .array('m_carSetups', {
            length: 22,
            type: new CarSetupDataParser_1.CarSetupDataParser(),
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketCarSetupDataParser = PacketCarSetupDataParser;
//# sourceMappingURL=PacketCarSetupDataParser.js.map