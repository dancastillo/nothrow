/**
 * Error Type of common errors
 */
export enum ERROR_TYPE {
  INVALID_REQUEST = 'INVALID_REQUEST',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export type ErrorMeta<T extends object = object> = T

/**
 * Result Error type
 */
export type ResultError<T extends ErrorMeta> = {
  error: ERROR_TYPE
  message: string
  meta?: ErrorMeta<T>
}

export interface IErrorResult {
  /**
   * Error code for the Error
   *
   * @param {number}
   */
  code: number

  /**
   * Error message for the Error
   *
   * @param {string}
   */
  message: string

  /**
   * Additional information about the error in the form of key-value pairs
   *
   * @param {object}
   */
  meta: object
}
