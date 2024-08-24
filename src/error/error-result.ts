import { IErrorResult } from "./types/types";

export class ErrorResult implements IErrorResult {
  readonly code: number;
  readonly message: string;
  readonly meta: object;

  constructor(code: number, message: string, meta: object) {
    this.code = code;
    this.message = message;
    this.meta = meta;
  }

  // static with(code: number, message: string, meta: object): ErrorResult {
  //   return new ErrorResult(code, message, meta)
  // }
}
