declare module "stringifystream" {
  import {Writable} from "stream";

  class StringifyStream extends Writable {}

  export = StringifyStream;
}
