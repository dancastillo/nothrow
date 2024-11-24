import { test } from 'node:test'
import {
  createFailureResult,
  createPartialSuccessfulResult,
  createSuccessfulResult,
  PartialSuccessfulResult,
} from '../src/result.js'
import assert from 'node:assert'

type SuccessType = {
  success: boolean
}

type FailureType = {
  errors: boolean
}

type FailureMappedType = {
  errors: boolean
  mapped: boolean
}

test('createSuccessfulResult :: methods', () => {
  const result = createSuccessfulResult({ success: true })

  assert.equal(result.isSuccessful(), true)
  assert.equal(result.isFailure(), false)
  assert.equal(result.isPartialSuccess(), false)
  assert.deepStrictEqual(result.data, { success: true })
  assert.equal(result.errors.length, 0)
})

test('createFailureResult :: methods', () => {
  const result = createFailureResult(['error'])

  assert.equal(result.isFailure(), true)
  assert.equal(result.isSuccessful(), false)
  assert.equal(result.isPartialSuccess(), false)
})

test('createPartialSuccessfulResult :: methods', () => {
  const result = createPartialSuccessfulResult({ success: true }, [{ errors: true }])

  assert.strictEqual(result.isPartialSuccess(), true)
  assert.strictEqual(result.isFailure(), false)
  assert.strictEqual(result.isSuccessful(), false)
})

test('createSuccessfulResult :: mapData', () => {
  const result = createSuccessfulResult({ success: true })
  const mappedResult = result.mapData((data: { success: boolean }) => ({
    success: data?.success,
    mapped: true,
  }))

  assert.deepStrictEqual(mappedResult, { success: true, mapped: true })
})

test('createSuccessfulResult :: mapTo', () => {
  const result = createSuccessfulResult({ success: true })
  const mappedResult = result.mapTo(
    (data: { success: boolean }) => ({ success: data?.success, mapped: true }),
    (errors) => errors
  )

  assert.deepStrictEqual(mappedResult, { data: { success: true, mapped: true }, errors: [] })
})

test('createSuccessfulResult :: mapErrors', () => {
  const result = createSuccessfulResult({ success: true })
  const mappedResult = result.mapErrors((errors) => errors)

  assert.deepStrictEqual(mappedResult, [])
})

test('createFailureResult :: mapData', () => {
  const result = createFailureResult([{ errors: true }])
  const mappedResult = result.mapData((data) => data)

  assert.deepStrictEqual(mappedResult, null)
})

test('createFailureResult :: mapTo', () => {
  const result = createFailureResult([{ errors: true }])
  const mappedResult = result.mapTo(
    (data) => data,
    (errors) => errors
  )

  assert.deepStrictEqual(mappedResult, { data: null, errors: [{ errors: true }] })
})

test('createFailureResult :: mapErrors', () => {
  const result = createFailureResult([{ errors: true }])
  const mappedResult = result.mapErrors((errors) => errors)

  assert.deepStrictEqual(mappedResult, [{ errors: true }])
})

test('createPartialSuccessfulResult :: mapData', () => {
  const result = createPartialSuccessfulResult({ success: true }, [{ errors: true }])
  const mappedResult = result.mapData((data) => data)

  assert.deepStrictEqual(mappedResult, { success: true })
})

test('createPartialSuccessfulResult :: mapTo', () => {
  const result: PartialSuccessfulResult<SuccessType, FailureType> = createPartialSuccessfulResult({ success: true }, [
    { errors: true },
  ])
  const mappedResult = result.mapTo(
    (data) => data,
    (errors) => errors
  )

  assert.deepStrictEqual(mappedResult, { data: { success: true }, errors: [{ errors: true }] })
})

test('createPartialSuccessfulResult :: mapErrors', () => {
  const result: PartialSuccessfulResult<SuccessType, FailureType> = createPartialSuccessfulResult({ success: true }, [
    { errors: true },
  ])
  const mappedResult: FailureMappedType[] = result.mapErrors<FailureMappedType>((errors) =>
    errors.map((error) => ({ errors: error.errors, mapped: true }))
  )

  assert.strictEqual(result.isPartialSuccess(), true)
  assert.deepStrictEqual(mappedResult, [{ errors: true, mapped: true }])
})
