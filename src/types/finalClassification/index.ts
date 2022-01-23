import {PacketHeader} from '../../types/PacketHeader';

/*
struct FinalClassificationData
{
    uint8     m_position;              // Finishing position
    uint8     m_numLaps;               // Number of laps completed
    uint8     m_gridPosition;          // Grid position of the car
    uint8     m_points;                // Number of points scored
    uint8     m_numPitStops;           // Number of pit stops made
    uint8     m_resultStatus;          // Result status - 0 = invalid, 1 = inactive, 2 = active
                                       // 3 = finished, 4 = didnotfinish, 5 = disqualified
                                       // 6 = not classified, 7 = retired
    uint32    m_bestLapTimeInMS;       // Best lap time of the session in milliseconds
    double    m_totalRaceTime;         // Total race time in seconds without penalties
    uint8     m_penaltiesTime;         // Total penalties accumulated in seconds
    uint8     m_numPenalties;          // Number of penalties applied to this driver
    uint8     m_numTyreStints;         // Number of tyres stints up to maximum
    uint8     m_tyreStintsActual[8];   // Actual tyres used by this driver
    uint8     m_tyreStintsVisual[8];   // Visual tyres used by this driver
};
*/
export interface FinalClassificationData {
  m_position: number;
  m_numLaps: number;
  m_gridPosition: number;
  m_points: number;
  m_numPitStops: number;
  m_resultStatus: number;
  m_bestLapTimeInMS: number;
  m_totalRaceTime: number;
  m_penaltiesTime: number;
  m_numPenalties: number;
  m_numTyreStints: number;
  m_tyreStintsActual: number[];
  m_tyreStintsVisual: number[];
}

/*
struct PacketFinalClassificationData
{
    PacketHeader    m_header;                      // Header

    uint8                      m_numCars;          // Number of cars in the final classification
    FinalClassificationData    m_classificationData[22];
};
*/
export interface PacketFinalClassificationData {
  m_header: PacketHeader;
  m_numCars: number;
  m_classificationData: FinalClassificationData[];
}
