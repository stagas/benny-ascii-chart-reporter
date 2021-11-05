import type { Summary } from 'benny/lib/internal/common-types'
import { asciiChartReporter } from './'

const summary = <Summary>{
  name: 'array find',
  date: new Date(),
  results: [
    {
      name: 'find',
      ops: 8541245,
      margin: 2.67,
      options: {
        delay: 0.005,
        initCount: 1,
        minTime: 0.05,
        maxTime: 0.25,
        minSamples: 10
      },
      samples: 12,
      promise: false,
      details: {
        min: 1.0865160753294714e-7,
        max: 1.2533940162949112e-7,
        mean: 1.1707895274203178e-7,
        median: 1.1597699345532257e-7,
        standardDeviation: 4.9220309733015655e-9,
        marginOfError: 3.127330366088566e-9,
        relativeMarginOfError: 2.6711294326139314,
        standardErrorOfMean: 1.4208679536976674e-9,
        sampleVariance: 2.422638890213996e-17,
        sampleResults: [
          1.0865160753294714e-7, 1.1339148078892301e-7, 1.141488802813766e-7,
          1.1450439205734385e-7, 1.1532953491241619e-7, 1.158390966564267e-7,
          1.1611489025421843e-7, 1.1617726281109477e-7, 1.1776668447531277e-7,
          1.2358666577623437e-7, 1.2409753572859623e-7, 1.2533940162949112e-7
        ]
      },
      completed: true,
      percentSlower: 0
    },
    {
      name: 'for-loop functional',
      ops: 7130423,
      margin: 3.44,
      options: {
        delay: 0.005,
        initCount: 1,
        minTime: 0.05,
        maxTime: 0.25,
        minSamples: 10
      },
      samples: 14,
      promise: false,
      details: {
        min: 1.3261033868748095e-7,
        max: 1.5642333026070835e-7,
        mean: 1.4024413559476005e-7,
        median: 1.364487052966557e-7,
        standardDeviation: 8.364850361758768e-9,
        marginOfError: 4.82889663956572e-9,
        relativeMarginOfError: 3.4432075316995587,
        standardErrorOfMean: 2.2356002960952407e-9,
        sampleVariance: 6.997072157461578e-17,
        sampleResults: [
          1.3261033868748095e-7, 1.3289713419625035e-7, 1.3332173209652172e-7,
          1.3387652456639806e-7, 1.339137392190438e-7, 1.342123467554706e-7,
          1.3526766448508787e-7, 1.3762974610822352e-7, 1.3979560567700727e-7,
          1.41170533268266e-7, 1.4957782132814861e-7, 1.4999243625973043e-7,
          1.5272894541830304e-7, 1.5642333026070835e-7
        ]
      },
      completed: true,
      percentSlower: 16.52
    },
    {
      name: 'for-loop hard-coded',
      ops: 6846101,
      margin: 3.33,
      options: {
        delay: 0.005,
        initCount: 1,
        minTime: 0.05,
        maxTime: 0.25,
        minSamples: 10
      },
      samples: 11,
      promise: false,
      details: {
        min: 1.3438367107010335e-7,
        max: 1.559891336749214e-7,
        mean: 1.4606854376586783e-7,
        median: 1.4549833329106685e-7,
        standardDeviation: 7.2439170370688065e-9,
        marginOfError: 4.8662264135280275e-9,
        relativeMarginOfError: 3.331467739781171,
        standardErrorOfMean: 2.1841231658563855e-9,
        sampleVariance: 5.247433403993572e-17,
        sampleResults: [
          1.3438367107010335e-7, 1.3473911081020086e-7, 1.4152494427866585e-7,
          1.435239242471632e-7, 1.4509189412644757e-7, 1.4549833329106685e-7,
          1.4867894931119697e-7, 1.5138115364999394e-7, 1.5181023750954518e-7,
          1.541326294552412e-7, 1.559891336749214e-7
        ]
      },
      completed: true,
      percentSlower: 19.85
    }
  ],
  fastest: {
    name: 'find',
    index: 0
  },
  slowest: {
    name: 'for-loop hard-coded',
    index: 2
  }
}

describe('asciiChartReporter(options)', () => {
  it('no options - should return a reporter function', () => {
    const reporter = asciiChartReporter()
    expect(typeof reporter).toEqual('function')
  })

  it('with options - should return a reporter function', () => {
    const reporter = asciiChartReporter({ colorLabels: false })
    expect(typeof reporter).toEqual('function')
  })
})

describe('reporter(summary)', () => {
  it('should output to console.log', () => {
    // TODO: better capture console.log output
    const fn = jest.fn()
    console.log = fn
    const reporter = asciiChartReporter()
    reporter(summary)
    expect(fn.mock.calls[1][0]).toContain('for-loop functional')
    expect(fn.mock.calls[1][0]).toContain('═══════════════')
  })
})
