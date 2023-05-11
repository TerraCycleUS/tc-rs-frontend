import paginationSlice from '../paginationSlice'
import '@testing-library/jest-dom'

describe('paginationSlice', () => {
  test('paginationSlice slices data array if nothing to return', async () => {
    const inputData = [
      { id: 0 },
      { id: 1 },
      { id: 1 },
      { id: 1 },
      { id: 1 },
      { id: 1 },
    ]
    const pagination = { page: 2, perPage: 10 }
    const output = paginationSlice(inputData, pagination)
    expect(output?.length).toBe(0)
  })

  test('paginationSlice returns full array if needed more the present', async () => {
    const inputData = [
      { id: 0 },
      { id: 1 },
      { id: 1 },
      { id: 1 },
      { id: 1 },
      { id: 1 },
    ]
    const pagination = { page: 1, perPage: 10 }
    const output = paginationSlice(inputData, pagination)
    expect(output?.length).toBe(6)
  })
})
