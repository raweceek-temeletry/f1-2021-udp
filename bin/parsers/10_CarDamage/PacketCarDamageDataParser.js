"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketCarDamageParser = void 0;
const F1Parser_1 = require("../F1Parser");
const CarDamageDataParser_1 = require("./CarDamageDataParser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
class PacketCarDamageParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .array('m_carDamageData', {
            length: 22,
            type: new CarDamageDataParser_1.CarDamageDataParser(),
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketCarDamageParser = PacketCarDamageParser;
//# sourceMappingURL=PacketCarDamageDataParser.js.map