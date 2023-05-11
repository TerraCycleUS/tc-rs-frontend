import dataSort from '../dataSort'
import '@testing-library/jest-dom'

describe('dataSort', () => {
  test('dataSort correctly sorts numbers in descending order', async () => {
    const inputData = [
      { id: 17, name: 'erg4eg3' },
      { id: 18, name: 'rgrg' },
      { id: 2, name: 'rgrgr' },
      { id: 16, name: 'rgrgrgrgr7' },
    ]
    const sort = { field: 'id', order: 'DESC' }
    const outputData = [
      { id: 18, name: 'rgrg' },
      { id: 17, name: 'erg4eg3' },
      { id: 16, name: 'rgrgrgrgr7' },
      { id: 2, name: 'rgrgr' },
    ]
    const output = dataSort(inputData, sort)
    expect(output).toStrictEqual(outputData)
  })

  test('dataSort correctly sorts string in ascending order ', async () => {
    const inputData = [
      { id: 17, name: 'erg4eg3' },
      { id: 18, name: 'rgrg' },
      { id: 2, name: 'rgrgr' },
      { id: 16, name: 'rgrgrgrgr7' },
    ]
    const sort = { field: 'name', order: 'ASC' }
    const outputData = [
      { id: 17, name: 'erg4eg3' },
      { id: 18, name: 'rgrg' },
      { id: 2, name: 'rgrgr' },
      { id: 16, name: 'rgrgrgrgr7' },
    ]
    const output = dataSort(inputData, sort)
    expect(output).toStrictEqual(outputData)
  })
})
