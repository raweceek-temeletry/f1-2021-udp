import {F1Parser} from '../F1Parser';
import {CarDamageDataParser} from './CarDamageDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketCarDamageData} from './types';

export class PacketCarDamageParser extends F1Parser {
  data: PacketCarDamageData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();
    this.endianess('little')
        .nest('m_header', {
          type: new PacketHeaderParser(bigintEnabled),
        })
        .array('m_carDamageData', {
          length: 22,
          type: new CarDamageDataParser(),
        });

    this.data = this.fromBuffer(buffer);
  }
}
