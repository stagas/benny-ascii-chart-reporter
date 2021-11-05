/* eslint-disable @typescript-eslint/no-explicit-any */
import assert from 'assert'
import { suite, add, cycle, complete, configure } from 'benny'
import { asciiChartReporter } from '../src'

const length = 5
const entries = Array.from({ length }).map((_, i) => [i, i])
const object = Object.fromEntries(entries)

const transform = (x: string) => +x * 10

const fromEntries = (input: any, transform: (x: string) => any) =>
  Object.fromEntries(Object.entries(input).map(([k, v]) => [transform(k), v]))

const forLoop = (input: any, transform: (x: string) => any) => {
  const output: any = {}
  for (const k in input) {
    output[transform(k)] = input[k]
  }
  return output
}

const keysReduce = (input: any, transform: (x: string) => any) =>
  Object.keys(input).reduce((p: any, n) => {
    p[transform(n)] = input[n]
    return p
  }, {})

{
  const fixture = { 1: 1, 2: 2, 3: 3 }
  const expected = { 10: 1, 20: 2, 30: 3 }

  assert.deepStrictEqual(fromEntries(fixture, transform), expected)
  assert.deepStrictEqual(forLoop(fixture, transform), expected)
  assert.deepStrictEqual(keysReduce(fixture, transform), expected)
}

suite(
  __filename,

  configure({
    cases: {
      minSamples: 30,
      maxTime: 5
    }
  }),

  add('Object.fromEntries()', () => fromEntries(object, transform)),
  add('for-loop', () => forLoop(object, transform)),
  add('Object.keys().reduce()', () => keysReduce(object, transform)),

  cycle(),
  complete(asciiChartReporter()),
  complete()
)
