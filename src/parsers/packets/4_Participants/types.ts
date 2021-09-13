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

export interface ParticipantData {
  m_aiControlled: number;
  m_driverId: number;
  m_networkId: number;
  m_teamId: number;
  m_myTeam: number;
  m_raceNumber: number;
  m_nationality: number;
  m_name: string;
  m_yourTelemetry: number;
}

export interface PacketParticipantsData {
  m_header: PacketHeader;
  m_numActiveCars: number;
  m_participants: ParticipantData[];
}
