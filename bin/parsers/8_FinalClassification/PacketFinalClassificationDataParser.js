"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketFinalClassificationDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
const FinalClassificationDataParser_1 = require("./FinalClassificationDataParser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
class PacketFinalClassificationDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .uint8('m_numCars')
            .array('m_classificationData', {
            length: 22,
            type: new FinalClassificationDataParser_1.FinalClassificationDataParser(),
        });
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketFinalClassificationDataParser = PacketFinalClassificationDataParser;
//# sourceMappingURL=PacketFinalClassificationDataParser.js.map