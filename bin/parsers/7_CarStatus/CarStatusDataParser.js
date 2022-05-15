"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarStatusDataParser = void 0;
const F1Parser_1 = require("../F1Parser");
class CarStatusDataParser extends F1Parser_1.F1Parser {
    constructor() {
        super();
        this.uint8('m_tractionControl')
            .uint8('m_antiLockBrakes')
            .uint8('m_fuelMix')
            .uint8('m_frontBrakeBias')
            .uint8('m_pitLimiterStatus')
            .floatle('m_fuelInTank')
            .floatle('m_fuelCapacity')
            .floatle('m_fuelRemainingLaps')
            .uint16le('m_maxRPM')
            .uint16le('m_idleRPM')
            .uint8('m_maxGears')
            .uint8('m_drsAllowed')
            .uint16le('m_drsActivationDistance')
            .uint8('m_actualTyreCompound')
            .uint8('m_visualTyreCompound')
            .uint8('m_tyresAgeLaps')
            .int8('m_vehicleFiaFlags')
            .floatle('m_ersStoreEnergy')
            .uint8('m_ersDeployMode')
            .floatle('m_ersHarvestedThisLapMGUK')
            .floatle('m_ersHarvestedThisLapMGUH')
            .floatle('m_ersDeployedThisLap')
            .uint8('m_networkPaused');
    }
}
exports.CarStatusDataParser = CarStatusDataParser;
//# sourceMappingURL=CarStatusDataParser.js.map