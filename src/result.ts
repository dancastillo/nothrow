//---------------------------------------------------------
// Common Types
//---------------------------------------------------------
type Nullable<T> = T | null

//---------------------------------------------------------
// Result Types
//---------------------------------------------------------

export type SuccessfulResult<T> = {
  data: T
  errors: never[]
  isSuccessful: () => true
  isFailure: () => false
  isPartialSuccess: () => false
  mapTo: <RT, RE>(mapResultData: (data: T) => RT, mapResultErrors: (errors: never[]) => RE[]) => MappedResult<RT, RE>
  mapData: <RT>(mapResultData: (data: T) => RT) => RT
  mapErrors: <RE>(mapResultErrors: (errors: never[]) => RE[]) => RE[]
}

export type FailureResult<E> = {
  data: null
  errors: E[]
  isSuccessful: () => false
  isFailure: () => true
  isPartialSuccess: () => false
  mapTo: <RT, RE>(
    mapResultData: (data: null) => Nullable<RT>,
    mapResultErrors: (errors: E[]) => RE[]
  ) => FailedMappedResult<RT, RE>
  mapData: <RT>(mapResultData: (data: null) => null) => Nullable<RT>
  mapErrors: <RE>(mapResultErrors: (errors: E[]) => RE[]) => RE[]
}

export type PartialSuccessfulResult<T, E> = {
  data: T
  errors: E[]
  isSuccessful: () => false
  isFailure: () => false
  isPartialSuccess: () => true
  mapTo: <RT, RE>(mapResultData: (data: T) => RT, mapResultErrors: (errors: E[]) => RE[]) => MappedResult<RT, RE>
  mapData: <RT>(mapResultData: (data: T) => RT) => RT
  mapErrors: <RE>(mapResultErrors: (errors: E[]) => RE[]) => RE[]
}

export type MappedResult<RT, RE> = {
  data: RT
  errors: RE[]
}

export type FailedMappedResult<RT, RE> = {
  data: Nullable<RT>
  errors: RE[]
}

export type Result<T, E> = SuccessfulResult<T> | FailureResult<E> | PartialSuccessfulResult<T, E>

//---------------------------------------------------------
// Factory Functions
//---------------------------------------------------------

export function createSuccessfulResult<T>(data: T): SuccessfulResult<T> {
  return {
    data: data,
    errors: [],
    isSuccessful: (): true => true,
    isFailure: (): false => false,
    isPartialSuccess: (): false => false,
    mapTo: <RT, RE>(
      mapResultData: (data: T) => RT,
      mapResultErrors: (errors: []) => RE[]
    ): { data: RT; errors: RE[] } => ({
      data: mapResultData(data),
      errors: mapResultErrors([]),
    }),
    mapData: <RT>(mapResultData: (data: T) => RT): RT => mapResultData(data),
    mapErrors: <RE>(mapResultErrors: (errors: never[]) => RE[]): RE[] => mapResultErrors([]),
  }
}

export function createFailureResult<E>(errors: E[]): FailureResult<E> {
  return {
    data: null,
    errors: errors,
    isSuccessful: (): false => false,
    isFailure: (): true => true,
    isPartialSuccess: (): false => false,
    mapTo: <RT, RE>(
      mapResultData: (data: null) => Nullable<RT>,
      mapResultErrors: (errors: E[]) => RE[]
    ): { data: Nullable<RT>; errors: RE[] } => ({
      data: mapResultData(null),
      errors: mapResultErrors(errors),
    }),
    mapData: <RT>(mapResultData: (data: null) => RT): RT => mapResultData(null),
    mapErrors: <RE>(mapResultErrors: (errors: E[]) => RE[]): RE[] => mapResultErrors(errors),
  }
}

export function createPartialSuccessfulResult<T, E>(data: T, errors: E[]): PartialSuccessfulResult<T, E> {
  return {
    data: data,
    errors: errors,
    isSuccessful: (): false => false,
    isFailure: (): false => false,
    isPartialSuccess: (): true => true,
    mapTo: <RT, RE>(
      mapResultData: (data: T) => RT,
      mapResultErrors: (errors: E[]) => RE[]
    ): { data: RT; errors: RE[] } => ({
      data: mapResultData(data),
      errors: mapResultErrors(errors),
    }),
    mapData: <RT>(mapResultData: (data: T) => RT): RT => mapResultData(data),
    mapErrors: <RE>(mapResultErrors: (errors: E[]) => RE[]): RE[] => mapResultErrors(errors),
  }
}
