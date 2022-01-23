import {Parser} from 'binary-parser';

import {parsedPackageData} from '../types';

export class F1Parser extends Parser {
  /**
   *
   * @param {Buffer} buffer
   */
  fromBuffer(buffer: Buffer): parsedPackageData {
    return this.parse(buffer);
  }
}
