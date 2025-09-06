//---------------------------------------------------------
// Common Types
//---------------------------------------------------------
type Nullable<T> = T | null

//---------------------------------------------------------
// Result Types (predicate methods + mappers)
//---------------------------------------------------------

export interface SuccessfulResult<T, E = never> {
  readonly data: T
  readonly errors: never[]
  isSuccessful(): this is SuccessfulResult<T, E>
  isFailure(): this is FailureResult<E>
  isPartialSuccess(): this is PartialSuccessfulResult<T, E>
  mapTo<RT, RE>(mapResultData: (data: T) => RT, mapResultErrors: (errors: never[]) => RE[]): MappedResult<RT, RE>
  mapData<RT>(mapResultData: (data: T) => RT): RT
  mapErrors<RE>(mapResultErrors: (errors: never[]) => RE[]): RE[]
}

export interface FailureResult<E> {
  readonly data: null
  readonly errors: E[]
  isSuccessful(): this is SuccessfulResult<never, E>
  isFailure(): this is FailureResult<E>
  isPartialSuccess(): this is PartialSuccessfulResult<never, E>
  mapTo<RT, RE>(
    mapResultData: (data: null) => Nullable<RT>,
    mapResultErrors: (errors: E[]) => RE[]
  ): FailedMappedResult<RT, RE>
  mapData<RT>(mapResultData: (data: null) => Nullable<RT>): Nullable<RT>
  mapErrors<RE>(mapResultErrors: (errors: E[]) => RE[]): RE[]
}

export interface PartialSuccessfulResult<T, E> {
  readonly data: T
  readonly errors: E[]
  isSuccessful(): this is SuccessfulResult<T, E>
  isFailure(): this is FailureResult<E>
  isPartialSuccess(): this is PartialSuccessfulResult<T, E>
  mapTo<RT, RE>(mapResultData: (data: T) => RT, mapResultErrors: (errors: E[]) => RE[]): MappedResult<RT, RE>
  mapData<RT>(mapResultData: (data: T) => RT): RT
  mapErrors<RE>(mapResultErrors: (errors: E[]) => RE[]): RE[]
}

export type MappedResult<RT, RE> = {
  data: RT
  errors: RE[]
}

export type FailedMappedResult<RT, RE> = {
  data: Nullable<RT>
  errors: RE[]
}

export type Result<T, E> = SuccessfulResult<T, E> | FailureResult<E> | PartialSuccessfulResult<T, E>

//---------------------------------------------------------
// Factory Functions
//---------------------------------------------------------

export function createSuccessfulResult<T>(data: T): SuccessfulResult<T> {
  return {
    data,
    errors: [],
    isSuccessful(): this is SuccessfulResult<T> {
      return true
    },
    isFailure(): this is FailureResult<never> {
      return false
    },
    isPartialSuccess(): this is PartialSuccessfulResult<T, never> {
      return false
    },
    mapTo<RT, RE>(mapResultData: (d: T) => RT, mapResultErrors: (_e: never[]) => RE[]): MappedResult<RT, RE> {
      return { data: mapResultData(data), errors: mapResultErrors([]) }
    },
    mapData<RT>(mapResultData: (d: T) => RT): RT {
      return mapResultData(data)
    },
    mapErrors<RE>(mapResultErrors: (_e: never[]) => RE[]): RE[] {
      return mapResultErrors([])
    },
  }
}

export function createFailureResult<E>(errors: E[]): FailureResult<E> {
  return {
    data: null,
    errors,
    isSuccessful(): this is SuccessfulResult<never, E> {
      return false
    },
    isFailure(): this is FailureResult<E> {
      return true
    },
    isPartialSuccess(): this is PartialSuccessfulResult<never, E> {
      return false
    },
    mapTo<RT, RE>(
      mapResultData: (_: null) => Nullable<RT>,
      mapResultErrors: (e: E[]) => RE[]
    ): FailedMappedResult<RT, RE> {
      return { data: mapResultData(null), errors: mapResultErrors(errors) }
    },
    mapData<RT>(mapResultData: (_: null) => Nullable<RT>): Nullable<RT> {
      return mapResultData(null)
    },
    mapErrors<RE>(mapResultErrors: (e: E[]) => RE[]): RE[] {
      return mapResultErrors(errors)
    },
  }
}

export function createPartialSuccessfulResult<T, E>(data: T, errors: E[]): PartialSuccessfulResult<T, E> {
  return {
    data,
    errors,
    isSuccessful(): this is SuccessfulResult<T, E> {
      return false
    },
    isFailure(): this is FailureResult<E> {
      return false
    },
    isPartialSuccess(): this is PartialSuccessfulResult<T, E> {
      return true
    },
    mapTo<RT, RE>(mapResultData: (d: T) => RT, mapResultErrors: (e: E[]) => RE[]): MappedResult<RT, RE> {
      return { data: mapResultData(data), errors: mapResultErrors(errors) }
    },
    mapData<RT>(mapResultData: (d: T) => RT): RT {
      return mapResultData(data)
    },
    mapErrors<RE>(mapResultErrors: (e: E[]) => RE[]): RE[] {
      return mapResultErrors(errors)
    },
  }
}
