import {Parser} from 'binary-parser';

import {EVENT_CODES} from '../../constants';
import {F1Parser} from '../F1Parser';

import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketEventData} from './types';

export class GenericEventParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx');
  }
}

/*    struct
    {
        uint8	vehicleIdx; // Vehicle index of car achieving fastest lap
        float	lapTime;    // Lap time is in seconds
    } FastestLap;
*/
export class FastestLapParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx').floatle('lapTime');
  }
}

export class SpeedTrapParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little')
        .uint8('vehicleIdx')
        .floatle('speed')
        .uint8('overallFastestInSession')
        .uint8('driverFastestInSession');
  }
}


export class StartLIghtsParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('numLights');
  }
}

export class DriveThroughPenaltyServedParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx');
  }
}

export class StopGoPenaltyServedParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx');
  }
}


export class FlashbackParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little')
        .uint32('flashbackFrameIdentifier')
        .floatle('flashbackSessionTime');
  }
}


export class ButtonsParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint32('m_buttonStatus');
  }
}



export class PenaltyParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little')
        .uint8('penaltyType')
        .uint8('infringementType')
        .uint8('vehicleIdx')
        .uint8('otherVehicleIdx')
        .uint8('time')
        .uint8('lapNum')
        .uint8('placesGained');
  }
}

export class PacketEventDataParser extends F1Parser {
  data: PacketEventData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();

    this.endianess('little')
        .nest('m_header', {
          type: new PacketHeaderParser(bigintEnabled),
        })
        .string('m_eventStringCode', {length: 4});

    this.unpack2021Format(buffer, bigintEnabled);
    this.data = this.fromBuffer(buffer);
  }

  unpack2021Format = (buffer: Buffer, bigintEnabled: boolean) => {
    const eventStringCode = this.getEventStringCode(buffer, bigintEnabled);

    if (eventStringCode === EVENT_CODES.FastestLap) {
      this.nest('m_eventDetails', {type: new FastestLapParser()});

    } else if (
        eventStringCode === EVENT_CODES.Retirement ||
        eventStringCode === EVENT_CODES.TeammateInPits ||
        eventStringCode === EVENT_CODES.RaceWinner) {
      this.nest('m_eventDetails', {type: new GenericEventParser()});

    } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
      this.nest('m_eventDetails', {type: new SpeedTrapParser()});

    } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
      this.nest('m_eventDetails', {type: new PenaltyParser()});

    } else if (
        eventStringCode === EVENT_CODES.StartLights ||
        eventStringCode === EVENT_CODES.LightsOut) {
      this.nest('m_eventDetails', {type: new StartLIghtsParser()});

    } else if (eventStringCode === EVENT_CODES.DriveThroughServed) {
      this.nest(
          'm_eventDetails', {type: new DriveThroughPenaltyServedParser()});

    } else if (eventStringCode === EVENT_CODES.StopGoServed) {
      this.nest('m_eventDetails', {type: new StopGoPenaltyServedParser()});

    } else if (eventStringCode === EVENT_CODES.Flashback) {
      this.nest('m_eventDetails', {type: new FlashbackParser()});

    } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
      this.nest('m_eventDetails', {type: new ButtonsParser()});
    }
  };

  getEventStringCode = (buffer: Buffer, bigintEnabled: boolean) => {
    const headerParser = new Parser()
                             .endianess('little')
                             .nest('m_header', {
                               type: new PacketHeaderParser(bigintEnabled),
                             })
                             .string('m_eventStringCode', {length: 4});
    const {m_eventStringCode} = headerParser.parse(buffer);
    return m_eventStringCode;
  };
}
