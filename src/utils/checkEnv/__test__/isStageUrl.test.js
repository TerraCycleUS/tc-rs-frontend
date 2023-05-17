import isStageUrl from '../isStageUrl'
import '@testing-library/jest-dom'

describe('isStageUrl', () => {
  test('isStageUrl properly determines stage link', async () => {
    expect(
      isStageUrl(
        'https://tc-rsfrontend-stage.herokuapp.com/recycling-bin/scan-item',
      ),
    ).toBe(true)
  })
})
