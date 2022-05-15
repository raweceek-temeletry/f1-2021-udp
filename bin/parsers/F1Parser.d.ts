/// <reference types="node" />
import { Parser } from 'binary-parser';
import { parsedPackageData } from '../types';
export declare class F1Parser extends Parser {
    /**
     *
     * @param {Buffer} buffer
     */
    fromBuffer(buffer: Buffer): parsedPackageData;
}
