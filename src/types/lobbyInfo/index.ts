import {PacketHeader} from '../../types/PacketHeader';

/*
struct LobbyInfoData
{
    uint8     m_aiControlled;            // Whether the vehicle is AI (1) or Human (0) controlled
    uint8     m_teamId;                  // Team id - see appendix (255 if no team currently selected)
    uint8     m_nationality;             // Nationality of the driver
    char      m_name[48];		// Name of participant in UTF-8 format – null terminated
                                         // Will be truncated with ... (U+2026) if too long
    uint8     m_carNumber;               // Car number of the player
    uint8     m_readyStatus;             // 0 = not ready, 1 = ready, 2 = spectating
};
*/
export interface LobbyInfoData {
  m_aiController: number;
  m_teamId: number;
  m_nationality: number;
  m_name: string;
  m_carNumber: number;
  m_readyStatus: number;
}

/*
struct PacketLobbyInfoData
{
    PacketHeader    m_header;                       // Header

    // Packet specific data
    uint8               m_numPlayers;               // Number of players in the lobby data
    LobbyInfoData       m_lobbyPlayers[22];
};
*/
export interface PacketLobbyInfoData {
  m_header: PacketHeader;
  m_numPlayers: number;
  m_lobbyPlayers: LobbyInfoData[];
}
