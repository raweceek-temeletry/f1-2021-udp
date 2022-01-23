import {PacketHeader} from '../../types/PacketHeader';

/*
// The event details packet is different for each type of event.
// Make sure only the correct type is interpreted.
union EventDataDetails
{
    struct
    {
        uint8	vehicleIdx; // Vehicle index of car achieving fastest lap
        float	lapTime;    // Lap time is in seconds
    } FastestLap;

    struct
    {
        uint8   vehicleIdx; // Vehicle index of car retiring
    } Retirement;

    struct
    {
        uint8   vehicleIdx; // Vehicle index of team mate
    } TeamMateInPits;

    struct
    {
        uint8   vehicleIdx; // Vehicle index of the race winner
    } RaceWinner;

    struct
    {
    	uint8 penaltyType;		// Penalty type – see Appendices
        uint8 infringementType;		// Infringement type – see Appendices
        uint8 vehicleIdx;         	// Vehicle index of the car the penalty is applied to
        uint8 otherVehicleIdx;    	// Vehicle index of the other car involved
        uint8 time;               	// Time gained, or time spent doing action in seconds
        uint8 lapNum;             	// Lap the penalty occurred on
        uint8 placesGained;       	// Number of places gained by this
    } Penalty;

    struct
    {
        uint8 vehicleIdx;		// Vehicle index of the vehicle triggering speed trap
        float speed;      		// Top speed achieved in kilometres per hour
        uint8 overallFastestInSession;   // Overall fastest speed in session = 1, otherwise 0
        uint8 driverFastestInSession;    // Fastest speed for driver in session = 1, otherwise 0
    } SpeedTrap;

    struct
    {
        uint8 numLights;		// Number of lights showing
    } StartLIghts;

    struct
    {
        uint8 vehicleIdx;                 // Vehicle index of the vehicle serving drive through
    } DriveThroughPenaltyServed;

    struct
    {
        uint8 vehicleIdx;                 // Vehicle index of the vehicle serving stop go
    } StopGoPenaltyServed;

    struct
    {
        uint32 flashbackFrameIdentifier;  // Frame identifier flashed back to
        float flashbackSessionTime;       // Session time flashed back to
    } Flashback;

    struct
    {
        uint32         m_buttonStatus;    // Bit flags specifying which buttons are being pressed
                                          // currently - see appendices
    } Buttons;
};
*/
export interface FastestLap {
  vehicleIdx: number;
  lapTime: number;
}

export interface Retirement {
  vehicleIdx: number;
}

export interface TeamMateInPits {
  vehicleIdx: number;
}

export interface RaceWinner {
  vehicleIdx: number;
}

export interface Penalty {
  penaltyType: number;
  infringementType: number;
  vehicleIdx: number;
  otherVehicleIdx: number;
  time: number;
  lapNum: number;
  placesGained: number;
}

export interface SpeedTrap {
  vehicleIdx: number;
  speed: number;
  overallFastestInSession: number;
  driverFastestInSession: number;
}

export interface StartLIghts {
  numLights: number;
}

export interface StartLightsOutParser {
  numLights: number;
}

export interface DriveThroughPenaltyServed {
  vehicleIdx: number;
}

export interface StopGoPenaltyServed {
  vehicleIdx: number;
}

export interface Flashback {
  flashbackFrameIdentifier: number;
  flashbackSessionTime: number;
}

export interface Buttons {
  m_buttonStatus?: number;
  bit1?: number;
  bit2?: number;
  bit3?: number;
  bit4?: number;
  bit5?: number;
  bit6?: number;
  bit7?: number;
  bit8?: number;
  Right_Stick_Right?: number;
  Right_Stick_Up?: number;
  Right_Stick_Down?: number;
  Special?: number;
  bit13?: number;
  bit14?: number;
  bit15?: number;
  bit16?: number;
  Options_or_Menu?: number;
  L1_or_LB?: number;
  R1_or_RB?: number;
  L2_or_LT?: number;
  R2_or_RT?: number;
  Left_Stick_Click?: number;
  Right_Stick_Click?: number;
  Right_Stick_Left?: number;
  Cross_or_A?: number;
  Triangle_or_Y?: number;
  Circle_or_B?: number;
  Square_or_X?: number;
  D_Pad_Left?: number;
  D_Pad_Right?: number;
  D_Pad_Up?: number;
  D_Pad_Down?: number;
}

/*
struct PacketEventData
{
    PacketHeader    	m_header;               	// Header

    uint8           	m_eventStringCode[4];   	// Event string code, see below
    EventDataDetails	m_eventDetails;         	// Event details - should be interpreted differently
                                                 // for each type
};
*/
export interface PacketEventData {
  m_header: PacketHeader;
  m_eventStringCode: string;
  FastestLap?: FastestLap;
  Retirement?: Retirement;
  TeamMateInPits?: TeamMateInPits;
  RaceWinner?: RaceWinner;
  Penalty?: Penalty;
  SpeedTrap?: SpeedTrap;
  StartLIghts?: StartLIghts;
  StartLightsOut?: StartLightsOutParser;
  DriveThroughPenaltyServed?: DriveThroughPenaltyServed;
  StopGoPenaltyServed?: StopGoPenaltyServed;
  Flashback?: Flashback;
  Buttons?: Buttons;
}

export interface ButtonFlags {
  bit1: number;
  bit2: number;
  bit3: number;
  bit4: number;
  bit5: number;
  bit6: number;
  bit7: number;
  bit8: number;
  Right_Stick_Right: number;
  Right_Stick_Up: number;
  Right_Stick_Down: number;
  Special: number;
  bit13: number;
  bit14: number;
  bit15: number;
  bit16: number;
  Options_or_Menu: number;
  L1_or_LB: number;
  R1_or_RB: number;
  L2_or_LT: number;
  R2_or_RT: number;
  Left_Stick_Click: number;
  Right_Stick_Click: number;
  Right_Stick_Left: number;
  Cross_or_A: number;
  Triangle_or_Y: number;
  Circle_or_B: number;
  Square_or_X: number;
  D_Pad_Left: number;
  D_Pad_Right: number;
  D_Pad_Up: number;
  D_Pad_Down: number;
}
