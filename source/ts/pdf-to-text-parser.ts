/**
 * @author W. Alex Livesley
 * @copyright Copyright 2019 by Entitech Inc., USA. All Rights Reserved.
 * @Date: 2019-04-24
 * @description Implementation of the PDF parser exporting text.
 * @filename pdf-to-text-parser.ts
 */
import { writeFile as _writeFile } from "fs";
import { homedir as _homedir } from "os";
import { join as _join } from "path";
import PDFParser from "pdf2json";

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
 * Returns a promise to parse a given PDF file exporting text.
 *
 * @param {Options} options The options for the parse process.
 *
 * @returns {Promise<void>} The promise to parse a given PDF file.
 */
export function parse(options: Options): Promise<void> {
  return new Promise(
    (resolve: () => void, reject: (reason?: any) => void): void => {
      let pdfParser: PDFParser = new PDFParser(null, true);

      pdfParser.once(
        "pdfParser_dataError",
        (err: any): void => {
          reject(err);
        }
      );
      pdfParser.once(
        "pdfParser_dataReady",
        (pdfData: any): void => {
          let outputFileNameAndPath: string =
            options.outputFileNameAndPath === undefined ||
            options.outputFileNameAndPath === null
              ? options.fileNameAndPath.replace(/pdf$/, "txt")
              : options.outputFileNameAndPath;

          _writeFile(
            _join(_homedir(), outputFileNameAndPath),
            pdfParser.getRawTextContent(),
            (err: NodeJS.ErrnoException | null = null): void => {
              if (err === null) {
                resolve();
              } else {
                reject(err);
              }
            }
          );
        }
      );
      pdfParser.loadPDF(_join(_homedir(), options.fileNameAndPath), 0);
    }
  );
}
