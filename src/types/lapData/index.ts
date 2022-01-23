import {PacketHeader} from '../PacketHeader';

/*
struct LapData
{
    uint32   m_lastLapTimeInMS;	       	 // Last lap time in milliseconds
    uint32   m_currentLapTimeInMS; 	 // Current time around the lap in milliseconds
    uint16   m_sector1TimeInMS;           // Sector 1 time in milliseconds
    uint16   m_sector2TimeInMS;           // Sector 2 time in milliseconds
    float    m_lapDistance;		 // Distance vehicle is around current lap in metres – could
					 // be negative if line hasn’t been crossed yet
    float    m_totalDistance;		 // Total distance travelled in session in metres – could
					 // be negative if line hasn’t been crossed yet
    float    m_safetyCarDelta;            // Delta in seconds for safety car
    uint8    m_carPosition;   	         // Car race position
    uint8    m_currentLapNum;		 // Current lap number
    uint8    m_pitStatus;            	 // 0 = none, 1 = pitting, 2 = in pit area
    uint8    m_numPitStops;            	 // Number of pit stops taken in this race
    uint8    m_sector;               	 // 0 = sector1, 1 = sector2, 2 = sector3
    uint8    m_currentLapInvalid;    	 // Current lap invalid - 0 = valid, 1 = invalid
    uint8    m_penalties;            	 // Accumulated time penalties in seconds to be added
    uint8    m_warnings;                  // Accumulated number of warnings issued
    uint8    m_numUnservedDriveThroughPens;  // Num drive through pens left to serve
    uint8    m_numUnservedStopGoPens;        // Num stop go pens left to serve
    uint8    m_gridPosition;         	 // Grid position the vehicle started the race in
    uint8    m_driverStatus;         	 // Status of driver - 0 = in garage, 1 = flying lap
                                          // 2 = in lap, 3 = out lap, 4 = on track
    uint8    m_resultStatus;              // Result status - 0 = invalid, 1 = inactive, 2 = active
                                          // 3 = finished, 4 = didnotfinish, 5 = disqualified
                                          // 6 = not classified, 7 = retired
    uint8    m_pitLaneTimerActive;     	 // Pit lane timing, 0 = inactive, 1 = active
    uint16   m_pitLaneTimeInLaneInMS;   	 // If active, the current time spent in the pit lane in ms
    uint16   m_pitStopTimerInMS;        	 // Time of the actual pit stop in ms
    uint8    m_pitStopShouldServePen;   	 // Whether the car should serve a penalty at this stop
};
*/
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

/*
struct PacketLapData
{
    PacketHeader    m_header;              // Header

    LapData         m_lapData[22];         // Lap data for all cars on track
};
*/
export interface PacketLapData {
  m_header: PacketHeader;
  m_lapData: LapData[];
}
