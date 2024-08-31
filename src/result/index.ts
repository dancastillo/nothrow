import { Undefinable } from '../types'

export class Result<T, E> {
  readonly data: Undefinable<T>

  readonly errors: Undefinable<E>

  constructor(data: Undefinable<T>, errors: Undefinable<E>) {
    this.data = data
    this.errors = errors
  }

  //---------------------------------------------------------
  // Static Result/Error Methods
  //---------------------------------------------------------

  /**
    * Create a successful result when no errors are present
    *
    * @param {T} data - The data to be returned typed in generic T
    @returns {Result<T, undefined>}
    */
  public static successful<T>(data: T): Result<T, undefined> {
    return new Result(data, undefined)
  }

  /**
   * Create a failed result when no data is present
   *
   * @param {E} errors - The errors to be returned typed in generic E
   * @returns {Result<undefined, E>}
   */
  public static failure<E>(errors: E): Result<undefined, E> {
    return new Result(undefined, errors)
  }

  /**
   * Create a partial success result when both data and errors are present
   *
   * @param {T} data - The data to be returned typed in generic T
   * @param {E} errors - The errors to be returned typed in generic E
   * @returns {Result<T, E>}
   */
  public static partialSuccess<T, E>(data: T, errors: E): Result<T, E> {
    return new Result(data, errors)
  }

  //---------------------------------------------------------
  // Map Methods
  //---------------------------------------------------------

  /**
   * Map the result to a new result
   *
   * @param {fnResult} fnResult - The function to map the data to the type
   * @param {fnError} fnError - The function to map the errors
   * @returns {Result<RT, RE>}
   */
  public map<RT, RE>(fnResult: (data: Undefinable<T>) => RT, fnError: (errors: Undefinable<E>) => RE): Result<RT, RE> {
    const data = fnResult(this.data)
    const errors = fnError(this.errors)
    return new Result<RT, RE>(data, errors)
  }

  /**
   * Map the data to a new result
   *
   * @param {fnResult} fnResult - The function to map the data to the type
   * @returns {Undefinable<RT>}
   */
  public mapData<RT>(fnResult: (data: Undefinable<T>) => RT): Undefinable<RT> {
    return fnResult(this.data)
  }

  /**
   * Map the errors to a new result
   *
   * @param {fnError} fnError - The function to map the errors
   * @returns {Undefinable<RE>}
   */
  public mapErrors<RE>(fnError: (errors: Undefinable<E>) => RE): Undefinable<RE> {
    return fnError(this.errors)
  }

  //---------------------------------------------------------
  // Result Methods
  //---------------------------------------------------------

  /**
   * Check if the result is successful
   *
   * @returns {boolean}
   */
  public isSuccessful(): boolean {
    return this.data !== undefined && this.errors === undefined
  }

  /**
   * Check if the result is a failure
   *
   * @returns {boolean}
   */
  public isFailure(): boolean {
    return this.data === undefined && this.errors !== undefined
  }

  /**
   * Check if the result is a partial success
   *
   * @returns {boolean}
   */
  public isPartialSuccess(): boolean {
    return this.data !== undefined && this.errors !== undefined
  }

  //---------------------------------------------------------
  // Data Helper Methods
  //---------------------------------------------------------

  /**
   * Check if the result has data
   *
   * @returns {boolean}
   */
  public hasData(): boolean {
    return this.data !== undefined
  }

  /**
   * Get the data from the result
   *
   * @returns {Undefinable<T>}
   */
  public getData(): Undefinable<T> {
    return this.data
  }

  //---------------------------------------------------------
  // Error Helper Methods
  //---------------------------------------------------------

  /**
   * Get the errors from the result
   */
  public getErrors(): Undefinable<E> {
    return this.errors
  }

  /**
   * Check if the result has errors
   *
   * @returns {boolean}
   */
  public hasErrors(): boolean {
    return this.errors !== undefined
  }

  /**
   * Get the error count
   *
   * @returns {number}
   */
  public errorCount(): number {
    if (this.errors && Array.isArray(this.errors)) {
      return this.errors.length
    }

    return this.errors !== undefined ? 1 : 0
  }
}
