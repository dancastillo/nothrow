import { test } from 'node:test'
import { Result } from '../src'

test('result :: should return successful', (t) => {
  t.plan(8)

  const result = Result.successful({ success: true })

  t.assert.equal(result.isSuccessful(), true)
  t.assert.equal(result.isFailure(), false)
  t.assert.equal(result.isPartialSuccess(), false)
  t.assert.equal(result.hasData(), true)
  t.assert.deepEqual(result.getData(), { success: true })
  t.assert.equal(result.hasErrors(), false)
  t.assert.equal(result.getErrors(), undefined)
  t.assert.equal(result.errorCount(), 0)
})

test('result :: should return failure', (t) => {
  t.plan(8)

  const result = Result.failure({ success: false })

  t.assert.equal(result.isFailure(), true)
  t.assert.equal(result.isSuccessful(), false)
  t.assert.equal(result.isPartialSuccess(), false)
  t.assert.equal(result.hasData(), false)
  t.assert.equal(result.getData(), undefined)
  t.assert.equal(result.hasErrors(), true)
  t.assert.deepEqual(result.getErrors(), { success: false })
  t.assert.equal(result.errorCount(), 1)
})

test('result :: should count errors', (t) => {
  t.plan(3)

  const threeErrors = Result.failure([{ one: true }, { two: true }, { three: true }])
  const oneError = Result.failure({ one: true })
  const zeroErrors = Result.failure(undefined)

  t.assert.equal(threeErrors.errorCount(), 3)
  t.assert.equal(oneError.errorCount(), 1)
  t.assert.equal(zeroErrors.errorCount(), 0)
})
test('result :: should return partial success', (t) => {
  t.plan(8)

  const result = Result.partialSuccess({ success: true }, { errors: true })

  t.assert.equal(result.isPartialSuccess(), true)
  t.assert.equal(result.isFailure(), false)
  t.assert.equal(result.isSuccessful(), false)
  t.assert.equal(result.hasData(), true)
  t.assert.deepEqual(result.getData(), { success: true })
  t.assert.equal(result.hasErrors(), true)
  t.assert.deepEqual(result.getErrors(), { errors: true })
  t.assert.equal(result.errorCount(), 1)
})

test('result :: map successful result', (t) => {
  t.plan(1)

  const result = Result.successful({ success: true })
  const mappedResult = result.mapData((data) => ({
    success: data?.success,
    mapped: true,
  }))

  t.assert.deepEqual(mappedResult, { success: true, mapped: true })
})

test('result :: map failed result', (t) => {
  t.plan(1)

  const result = Result.failure([{ errors: true }])
  const mappedResult = result.mapErrors((errors) => errors?.map((error) => ({ errors: error.errors, mapped: true })))

  t.assert.deepEqual(mappedResult, [{ errors: true, mapped: true }])
})

test('result :: map result', (t) => {
  t.plan(2)

  const result = Result.partialSuccess({ success: true }, [{ errors: true }])
  const mappedResult = result.map(
    (data) => ({
      success: data?.success,
      mapped: true,
    }),
    (errors) => errors?.map((error) => ({ errors: error.errors, mapped: true }))
  )

  t.assert.deepEqual(mappedResult.data, { success: true, mapped: true })
  t.assert.deepEqual(mappedResult.errors, [{ errors: true, mapped: true }])
})
