/* eslint-disable @typescript-eslint/no-explicit-any */
import { suite, add, cycle, complete, configure } from 'benny'
import { asciiChartReporter } from '../src'

const length = 100
const target = 70
const items = Array.from({ length }).map((_, i) => ({ i }))

const matcher = (x: any) => x.i === target

const forLoopFunctional = (items: any[], fn: any) => {
  for (let i = 0, x; i < items.length; i++) {
    x = items[i]
    if (fn(x)) return x
  }
}

const forLoopFunctionalScope = () => {
  for (let i = 0, x; i < items.length; i++) {
    x = items[i]
    if (matcher(x)) return x
  }
}

const forLoopHardcoded = (items: any[]) => {
  for (let i = 0, x; i < items.length; i++) {
    x = items[i]
    if (x.i === target) return x
  }
}

const forLoopHardcodedScope = () => {
  for (let i = 0, x; i < items.length; i++) {
    x = items[i]
    if (x.i === target) return x
  }
}

suite(
  __filename,

  configure({
    cases: {
      minSamples: 30,
      maxTime: 5
    }
  }),

  add('find', () => items.find(matcher)),
  add('for-loop functional', () => forLoopFunctional(items, matcher)),
  add('for-loop functional scope', () => forLoopFunctionalScope()),
  add('for-loop hard-coded', () => forLoopHardcoded(items)),
  add('for-loop hard-coded scope', () => forLoopHardcodedScope()),

  cycle(),
  complete(asciiChartReporter()),
  complete()
)
