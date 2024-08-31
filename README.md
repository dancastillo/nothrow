# NoThrow

## Description

A package to handle errors as a result and not throw errors

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

```typescript
import { Result } from 'neverthrow'
```

## API Documentation

### `successful`

Constructs a successful result with no errors

```typescript
const result = Result.successful({ success: true })
// result.data = { success: true }
// result.errors = undefined
```

### `failure`

Constructs a failed result with no data

```typescript
const result = Result.failure({ success: false })
// result.data = undefined
// result.errors = { success: false }
```

### `partialSuccess`

Constructs a result with data and errors

```typescript
const result = Result.partialSuccess({ success: true }, [{ error: 'Missing input' }, { error: 'Not found' }])
// result.data ={ success: true }
// result.errors = [{ error: 'Missing input' }, { error: 'Not found' }]
```

### `map`

Map the data result and errors result to the wanted type. This method takes in two functions as its arguments

```typescript
const mappedResult = result.map(
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

Returns `TRUE` if the result was successful and no errors

### `isFailure`

Returns `TRUE` if the result was N error reults and no data

### `isPartialSuccess`

Returns `FALSE` if the result returned both a data result and error result

### `hasData`

Helper method to determine if the `Result` has data value set

### `getData`

Helper method to retrieve the `Result` data value set

### `hasErrors`

Helper method to determine if the `Result` has error values set

### `getErrors`

Helper method to retrieve the `Result` error values set

### `errorCount`

Helper method to retrieve the `Result` error values count

### License

[MIT license](https://github.com/dancastillo/nothrow/blob/main/LICENSE).
