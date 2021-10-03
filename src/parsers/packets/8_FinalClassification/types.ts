import {PacketHeader} from '../types';

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

export interface PacketFinalClassificationData {
  m_header: PacketHeader;
  m_numCars: number;
  m_classificationData: FinalClassificationData[];
}
