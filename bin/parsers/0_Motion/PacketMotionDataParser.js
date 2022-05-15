"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketMotionDataParser = void 0;
const binary_parser_1 = require("binary-parser");
const F1Parser_1 = require("../F1Parser");
const CarMotionDataParser_1 = require("./CarMotionDataParser");
const PacketHeaderParser_1 = require("../PacketHeaderParser");
class PacketMotionDataParser extends F1Parser_1.F1Parser {
    constructor(buffer, bigintEnabled) {
        super();
        this.endianess('little')
            .nest('m_header', {
            type: new PacketHeaderParser_1.PacketHeaderParser(bigintEnabled),
        })
            .array('m_carMotionData', {
            length: 22,
            type: new CarMotionDataParser_1.CarMotionDataParser(),
        })
            .array('m_suspensionPosition', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_suspensionVelocity', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_suspensionAcceleration', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_wheelSpeed', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_wheelSlip', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .floatle('m_localVelocityX')
            .floatle('m_localVelocityY')
            .floatle('m_localVelocityZ')
            .floatle('m_angularVelocityX')
            .floatle('m_angularVelocityY')
            .floatle('m_angularVelocityZ')
            .floatle('m_angularAccelerationX')
            .floatle('m_angularAccelerationY')
            .floatle('m_angularAccelerationZ')
            .floatle('m_frontWheelsAngle');
        this.data = this.fromBuffer(buffer);
    }
}
exports.PacketMotionDataParser = PacketMotionDataParser;
//# sourceMappingURL=PacketMotionDataParser.js.map