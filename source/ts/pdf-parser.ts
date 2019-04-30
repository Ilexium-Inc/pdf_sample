/**
 * @author W. Alex Livesley
 * @copyright Copyright 2019 by Entitech Inc., USA. All Rights Reserved.
 * @Date: 2019-04-24
 * @description Implementation of the PDF parser.
 * @filename pdf-parser.ts
 */
import {
  createReadStream as _createReadStream,
  createWriteStream as _createWriteStream,
  ReadStream,
  WriteStream
} from "fs";
import PDFParser from "pdf2json";
import {homedir as _homedir} from "os";
import {join as _join} from "path";
import StringifyStream from "stringifystream";

/**
 * The attributes used to configure the parser.
 *
 * @interface
 */
export interface Options {
  /**
   * The name and path of the file to parse.
   *
   * @type {string}
   */
  fileNameAndPath: string;

  /**
   * The name and path of the output file.
   *
   * @type {string}
   */
  outputFileNameAndPath?: string;
}

/**
 * Returns a promise to parse a given PDF file.
 *
 * @param {Options} options The options for the parse process.
 *
 * @returns {Promise<void>} The promise to parse a given PDF file.
 */
export function parse(options: Options): Promise<void> {
  return new Promise(
    (resolve: () => void, reject: (reason?: any) => void): void => {
      let inputStream: ReadStream = _createReadStream(_join(_homedir(), options.fileNameAndPath));
      let outputFileNameAndPath: string =
        options.outputFileNameAndPath === undefined ||
        options.outputFileNameAndPath === null
          ? options.fileNameAndPath.replace(/pdf$/, "json")
          : options.outputFileNameAndPath;
      let outputStream: WriteStream = _createWriteStream(_join(_homedir(), outputFileNameAndPath));

      inputStream.once(
        "error",
        (...args: string[]): void => {
          reject(args);
        }
      );
      outputStream.once(
        "error",
        (...args: string[]): void => {
          reject(args);
        }
      );
      outputStream.once(
        "finish",
        (...args: string[]): void => {
          resolve();
        }
      );
      inputStream
        .pipe(new PDFParser())
        .pipe(new StringifyStream())
        .pipe(outputStream);
    }
  );
}
