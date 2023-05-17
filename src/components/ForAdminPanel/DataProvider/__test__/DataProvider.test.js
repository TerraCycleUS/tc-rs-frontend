import DataProvider from '../index'
import '@testing-library/jest-dom'

const mockProvider = {
  create: expect.any(Function),
  delete: expect.any(Function),
  deleteMany: expect.any(Function),
  getList: expect.any(Function),
  getMany: expect.any(Function),
  getManyReference: expect.any(Function),
  getOne: expect.any(Function),
  update: expect.any(Function),
}

const mockHttpClient = (input) => ({ data: input })

describe('DataProvider', () => {
  test('DataProvider will return object with methods', async () => {
    expect(DataProvider(mockHttpClient, 'en', null)).toMatchObject(mockProvider)
  })
})
