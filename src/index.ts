import Chartscii, { ChartData, Options } from 'chartscii'
import type { Summary } from 'benny/lib/internal/common-types'

type CompleteFn = (summary: Summary) => void

export type { Options }

/**
 * Create a benny ascii chart reporter.
 *
 * @param options Chartscii options
 * @returns The reporter function that can be passed to `complete()`.
 */
export const asciiChartReporter =
  (options: Options = {}): CompleteFn =>
  /**
   * The ascii chart reporter.
   *
   * @param summary The summary passed in the suite's `complete()` callback.
   */
  (summary: Summary) => {
    const charts = new Chartscii(
      summary.results.map(
        r =>
          <ChartData>{
            value: r.ops,
            label:
              (r.percentSlower ? '(-' + r.percentSlower + '%) ' : '') + r.name,
            color: !r.percentSlower ? 'green' : 'pink'
          }
      ),
      <Options>{
        theme: 'lush',
        width: 30,
        sort: true,
        char: '■',
        colorLabels: true,
        ...options
      }
    )
    console.log()
    console.log(charts.create())
  }
