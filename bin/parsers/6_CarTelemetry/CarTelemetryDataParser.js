"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarTelemetryDataParser = void 0;
const binary_parser_1 = require("binary-parser");
const F1Parser_1 = require("../F1Parser");
class CarTelemetryDataParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.uint16le('m_speed')
            .floatle('m_throttle')
            .floatle('m_steer')
            .floatle('m_brake')
            .uint8('m_clutch')
            .int8('m_gear')
            .uint16le('m_engineRPM')
            .uint8('m_drs')
            .uint8('m_revLightsPercent')
            .uint16le('m_revLightsBitValue')
            .array('m_brakesTemperature', {
            length: 4,
            type: new binary_parser_1.Parser().uint16le(''),
        })
            .array('m_tyresSurfaceTemperature', {
            length: 4,
            type: new binary_parser_1.Parser().uint8(''),
        })
            .array('m_tyresInnerTemperature', {
            length: 4,
            type: new binary_parser_1.Parser().uint8(''),
        })
            .uint16le('m_engineTemperature')
            .array('m_tyresPressure', {
            length: 4,
            type: new binary_parser_1.Parser().floatle(''),
        })
            .array('m_surfaceType', {
            length: 4,
            type: new binary_parser_1.Parser().uint8(''),
        });
    }
}
exports.CarTelemetryDataParser = CarTelemetryDataParser;
//# sourceMappingURL=CarTelemetryDataParser.js.map