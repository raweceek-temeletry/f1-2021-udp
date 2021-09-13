export interface PacketHeader {
  m_packetFormat: number;
  m_gameMajorVersion: number;
  m_gameMinorVersion: number;
  m_packetVersion: number;
  m_packetId: number;
  m_sessionUID: bigint;
  m_sessionTime: number;
  m_frameIdentifier: number;
  m_playerCarIndex: number;
}

export interface LapData {
  m_lastLapTimeInMS: number;
  m_currentLapTimeInMS: number;
  m_sector1TimeInMS: number;
  m_sector2TimeInMS: number;
  m_lapDistance: number;
  m_totalDistance: number;
  m_safetyCarDelta: number;
  m_carPosition: number;
  m_currentLapNum: number;
  m_pitStatus: number;
  m_numPitStops: number;
  m_sector: number;
  m_currentLapInvalid: number;
  m_penalties: number;
  m_warnings: number;
  m_numUnservedDriveThroughPens: number;
  m_numUnservedStopGoPens: number;
  m_gridPosition: number;
  m_driverStatus: number;
  m_resultStatus: number;
  m_pitLaneTimerActive: number;
  m_pitLaneTimeInLaneInMS: number;
  m_pitStopTimerInMS: number;
  m_pitStopShouldServePen: number;
}

export interface PacketLapData {
  m_header: PacketHeader;
  m_lapData: LapData[];
}
