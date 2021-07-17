import {EventCode} from './types';

export const EVENT_CODES: {[index: string]: EventCode} = {
  SessionStarted: 'SSTA',
  SessionEnded: 'SEND',
  FastestLap: 'FTLP',
  Retirement: 'RTMT',
  DRSEnabled: 'DRSE',
  DRSDisabled: 'DRSD',
  TeammateInPits: 'TMPT',
  ChequeredFlag: 'CHQF',
  RaceWinner: 'RCWN',
  PenaltyIssued: 'PENA',
  SpeedTrapTriggered: 'SPTP',

  StartLights: 'STLG',
  LightsOut: 'LGOT',
  DriveThroughServed: 'DTSV',
  StopGoServed: 'SGSV',
  Flashback: 'FLBK',
  ButtonStatus: 'BUTN'
};


/*Session Started	“SSTA”	Sent when the session starts
Session Ended	“SEND”	Sent when the session ends
Fastest Lap	“FTLP”	When a driver achieves the fastest lap
Retirement	“RTMT”	When a driver retires
DRS enabled	“DRSE”	Race control have enabled DRS
DRS disabled	“DRSD”	Race control have disabled DRS
Team mate in pits	“TMPT”	Your team mate has entered the pits
Chequered flag	“CHQF”	The chequered flag has been waved
Race Winner	“RCWN”	The race winner is announced
Penalty Issued	“PENA”	A penalty has been issued – details in event
Speed Trap Triggered	“SPTP”	Speed trap has been triggered by fastest speed
Start lights	“STLG”	Start lights – number shown
Lights out	“LGOT”	Lights out
Drive through served	“DTSV”	Drive through penalty served
Stop go served	“SGSV”	Stop go penalty served
Flashback	“FLBK”	Flashback activated
Button status	“BUTN”	Button status changed
*/