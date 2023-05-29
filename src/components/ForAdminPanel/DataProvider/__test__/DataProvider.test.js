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

const mockHttpClient = (url) => url

function fetchDataPaginationStructure(url) {
  return new Promise((resolve) => {
    resolve({ json: { url, items: [{ url }], total: 0 } })
  })
}

function fetchData(url) {
  return new Promise((resolve) => {
    resolve({ json: [{ id: 0, url }] })
  })
}

describe('DataProvider', () => {
  test('DataProvider will return object with methods', async () => {
    expect(DataProvider(mockHttpClient, 'en', null)).toMatchObject(mockProvider)
  })

  test('getList will return getList object without params of filter and sort', async () => {
    const res = DataProvider(fetchDataPaginationStructure, 'en', null).getList(
      'user',
      {
        filter: {},
        sort: {},
      },
    )

    res.then((result) => {
      expect(result).toMatchObject({
        data: [
          {
            url: 'http://localhost:4000/api/admin/user?offset=NaN&limit=undefined&&order=[null,null]',
          },
        ],
        total: 0,
      })
    })
  })

  test('getList will return getList object with filter and sort', async () => {
    const res = DataProvider(fetchDataPaginationStructure, 'en', null).getList(
      'log',
      {
        filter: { role: 'USER' },
        pagination: { page: 1, perPage: 10 },
        sort: { field: 'id', order: 'ASC' },
      },
    )

    res.then((result) => {
      expect(result).toMatchObject({
        data: [
          {
            url: 'http://localhost:4000/api/admin/log?offset=0&limit=10&role=USER&order=["id","ASC"]',
          },
        ],
        total: 0,
      })
    })
  })

  test('getList will return object if not user or log resource', async () => {
    const res = DataProvider(fetchData, 'en', null).getList('coupon', {
      filter: { role: 'USER' },
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'id', order: 'ASC' },
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: [
          {
            url: 'http://localhost:4000/api/admin/coupon?lang=en&role=USER&offset=0&limit=10',
          },
        ],
        total: 1,
      })
    })
  })

  test('getMany will return object', async () => {
    const res = DataProvider(fetchData, 'en', null).getMany('page', {
      ids: [0],
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: [
          {
            url: 'http://localhost:4000/api/admin/page?lang=en',
          },
        ],
      })
    })
  })

  test('getMany will return array', async () => {
    const res = DataProvider(fetchData, 'en', null).getMany('coupon', {
      ids: [0],
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: [
          {
            url: 'http://localhost:4000/api/admin/coupon?lang=en',
          },
        ],
      })
    })
  })

  test('getManyReference will return array and length', async () => {
    const res = DataProvider(fetchData, 'en', null).getManyReference('brand', {
      ids: [0],
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: [
          {
            id: 0,
            url: 'http://localhost:4000/api/admin/brand?lang=en',
          },
        ],
        total: 1,
      })
    })
  })

  test('getOne will find user object', async () => {
    const res = DataProvider(fetchData, 'en', null).getOne('user', {
      id: 0,
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: undefined,
      })
    })
  })

  test('getOne will find coupon object', async () => {
    const res = DataProvider(fetchData, 'en', null).getOne('coupon', {
      id: 0,
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: {
          id: 0,
          url: 'http://localhost:4000/api/admin/coupon?lang=en',
        },
      })
    })
  })

  test('update will filter object', async () => {
    const res = DataProvider(fetchData, 'en', null).update('user', {
      data: {
        retailerId: '',
        name: 'mock',
        status: 'status',
        id: '1',
        role: 'USER',
        lastLogin: ' 356432',
        lastLogout: ' 356432',
        isTwoFaEnabled: true,
      },
      id: 2,
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: {
          id: 2,
        },
      })
    })
  })

  test('create will find create retailer', async () => {
    const res = DataProvider(fetchData, 'en', null).create('retailer', {
      id: 3,
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: {
          id: undefined,
        },
      })
    })
  })

  test('deleteMany will delete several retailer', async () => {
    const res = DataProvider(fetchData, 'en', null).deleteMany('retailer', {
      ids: [1, 0],
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: [1, 0],
      })
    })
  })

  test('delete will delete create retailer', async () => {
    const res = DataProvider(fetchData, 'en', null).delete('retailer', {
      id: 3,
    })

    res.then((result) => {
      expect(result).toMatchObject({
        data: undefined,
      })
    })
  })
})
