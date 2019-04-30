interface Function {
  loadPdf(path: string): void;
}

declare module "pdf2json" {
  import STREAM from "stream";

  enum PDF_EVENTS {
    DATA_ERROR = "pdfParser_dataError",
    DATA_READY = "pdfParser_dataReady"
  }

  interface PdfPage {
    Height: number;
  }

  interface ParsedPdf {
    Agency: string;
    Id: any;
    Pages: PdfPage[];
    Transcoder: string;
    Width: number;
  }

  class PDFParser extends STREAM {
    constructor(context?: any, needRawText?: boolean);
    getRawTextContent():void;
    loadPDF(pdfFilePath: string, verbosity?: number): void;
    parseBuffer(buffer: Buffer): void;
    end: any;
    writable: boolean;
    write: any;
  }
  export = PDFParser;
}
