# NoThrow

## Description

A package to handle results. Success, errors or partial success as results and not throw errors

## Installation

```typescript
# npm
npm install @dancastillo/nothrow

# yarn
yarn install @dancastillo/nothrow

# pnpm
pnpm install @dancastillo/nothrow
```

## Usage

#### TypeScript

```typescript
import {
  type Result,
  createSuccessfulResult,
  createFailureResult,
  createPartialSuccessfulResult,
} from '@dancastillo/nothrow'
```

## Method Documentation

### `createSuccessfulResult`

Constructs a successful result with no errors

```typescript
const result = createSuccessfulResult({ success: true })
// result.data = { success: true }
// result.errors = []
```

### `createFailureResult`

Constructs a failure result with no data

```typescript
const result = createFailureResult([{ error: true }])
// result.data = null
// result.errors = [{ success: false }]
```

### `createPartialSuccessResult`

Constructs a result with data and errors

```typescript
const result = createPartialSuccessReuslt({ success: true }, [{ error: 'Missing input' }, { error: 'Not found' }])
// result.data ={ success: true }
// result.errors = [{ error: 'Missing input' }, { error: 'Not found' }]
```

## API Documentation

### `mapTo`

Map the data result and errors result to the wanted type. This method takes in two functions as its arguments

```typescript
const mappedResult = result.mapTo(
  (data: DataType) => {
    return <MappedDataType>{ id: data.id }
  },
  (errors: ErrorType) => {
    return <MappedErrorType[]>errors.map((err) => {
      error: err.message
    })
  }
)
```

### `mapData`

Map the data result and errors result to the wanted type. This method takes in two functions as its arguments

```typescript
const mappedResult = result.mapData((data: DataType) => {
  return <MappedDataType>{ id: data.id }
})
```

### `mapErrors`

Map the data result and errors result to the wanted type. This method takes in two functions as its arguments

```typescript
const mappedResult = result.mapErrors((errors: ErrorType) => {
  return <MappedErrorType[]>errors.map((err) => {
    error: err.message
  })
})
```

### `isSuccessful`

Returns `boolean`

### `isFailure`

Returns `boolean`

### `isPartialSuccess`

Returns `boolean`

### License

[MIT license](https://github.com/dancastillo/nothrow/blob/main/LICENSE).
