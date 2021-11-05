import { suite, add, cycle, complete } from 'benny'
import { asciiChartReporter, Options } from '../src'

suite(
  __filename,

  add('Reduce two elements', () => {
    ;[1, 2].reduce((a, b) => a + b)
  }),

  add('Reduce five elements', () => {
    ;[1, 2, 3, 4, 5].reduce((a, b) => a + b)
  }),

  cycle(),

  // just pass it to complete()
  complete(
    asciiChartReporter(<Options>{
      theme: 'beach'
    })
  ),

  // complete() can be called again
  // for the default report output
  complete()
)
