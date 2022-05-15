"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherForecastSampleParser = void 0;
const F1Parser_1 = require("../F1Parser");
class WeatherForecastSampleParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.endianess('little')
            .uint8('m_sessionType')
            .uint8('m_timeOffset')
            .uint8('m_weather')
            .int8('m_trackTemperature')
            .int8('m_trackTemperatureChange')
            .int8('m_airTemperature')
            .int8('m_airTemperatureChange')
            .uint8('m_rainPercentage');
    }
}
exports.WeatherForecastSampleParser = WeatherForecastSampleParser;
//# sourceMappingURL=WeatherForecastSampleParser.js.map