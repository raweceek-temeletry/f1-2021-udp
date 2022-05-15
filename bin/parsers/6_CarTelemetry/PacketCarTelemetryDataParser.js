"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketCarTelemetryDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
const CarTelemetryDataParser_1 = require("./CarTelemetryDataParser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
class PacketCarTelemetryDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .array('m_carTelemetryData', {
            length: 22,
            type: new CarTelemetryDataParser_1.CarTelemetryDataParser(),
        })
            .uint8('m_mfdPanelIndex')
            .uint8('m_mfdPanelIndexSecondaryPlayer')
            .int8('m_suggestedGear');
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketCarTelemetryDataParser = PacketCarTelemetryDataParser;
//# sourceMappingURL=PacketCarTelemetryDataParser.js.map