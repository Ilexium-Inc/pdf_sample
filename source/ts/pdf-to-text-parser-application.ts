/**
 * @author W. Alex Livesley
 * @copyright Copyright 2019 by Entitech Inc., USA. All Rights Reserved.
 * @date 2019-04-24
 * @description An application that executes the PDF to text parser.
 * @filename pdf-to-text-parser-application.ts
 */
import { parse as _parse, Options } from "./pdf-to-text-parser";

const options: Options = {
  fileNameAndPath:
    (process.env.PDF_FILE_NAME_AND_PATH === undefined || process.env.PDF_FILE_NAME_AND_PATH === null
      ? ""
      : process.env.PDF_FILE_NAME_AND_PATH)
};

console.log("The PDF to text parser application is starting");
_parse(options)
  .then(
    (): void => {
      console.log("The PDF to text parser application is complete");
      process.exit();
    }
  )
  .catch(
    (e: any): Promise<any> => {
      console.log(`The PDF to text parser application has failed ${e}`);
      process.exit(1);
      return Promise.resolve();
    }
  );
