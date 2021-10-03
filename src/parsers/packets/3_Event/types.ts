import {PacketHeader} from '../types';

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
  m_buttonStatus: number;
}

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
