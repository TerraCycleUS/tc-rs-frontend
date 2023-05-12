import forUpdateCoupon from '../forUpdateCoupon'
import '@testing-library/jest-dom'

jest.mock('../../../../../utils/http', () => ({
  post: () => ({ data: { name: 'image123.png' } }),
}))

describe('forUpdateCoupon', () => {
  test('forUpdateCoupon properly returns properties from coupon object if there was no image updates', async () => {
    const mockCoupon = {
      id: 24,
      availableDays: 8,
      backgroundImage: 'oldImage',
      brand: 'Palmolive',
      categoryId: 10,
      description:
        '<h1>Save up to 15% on selected Gillette disposable razor! <i>resale.5</i></h1><p>&nbsp;</p>',
      discount: 45,
      endDate: '2023-05-23T07:56:14.275Z',
      langId: 'fr',
      minimumPurchaseAmount: 0,
      name: 'Name 1046',
      requiredAmount: 1,
      startDate: '2023-03-02T00:00:00.000Z',
      status: 'ACTIVE',
      storeIds: [181],
      retailerId: 2,
      createdAt: '2023-03-23T08:56:14.276Z',
      updatedAt: '2023-05-12T07:47:41.157Z',
    }

    const mappedMockCoupon = {
      availableDays: 8,
      backgroundImage: 'oldImage',
      brand: 'Palmolive',
      categoryId: 10,
      description:
        '<h1>Save up to 15% on selected Gillette disposable razor! <i>resale.5</i></h1><p>&nbsp;</p>',
      discount: 45,
      endDate: '2023-05-23T07:56:14.275Z',
      langId: 'fr',
      minimumPurchaseAmount: 0,
      name: 'Name 1046',
      requiredAmount: 1,
      startDate: '2023-03-02T00:00:00.000Z',
      status: 'ACTIVE',
      storeIds: [181],
    }

    forUpdateCoupon(mockCoupon, 'fr', null).then((data) => {
      expect(data).toStrictEqual(mappedMockCoupon)
    })
  })

  test('forUpdateCoupon properly returns properties from coupon object if there was image updated', async () => {
    const mockCoupon = {
      id: 24,
      availableDays: 8,
      backgroundImage: { rawFile: {} },
      brand: 'Palmolive',
      brandLogo:
        'http://localhost:4000/api/file/af4ab39d-cf0c-49c3-99a6-2dbf9e8bf6c6.jpg',
      categoryId: 10,
      description:
        '<h1>Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products ayjynd quantities stated.Coupons not authorized if purchasing products for <i>resale.5</i></h1><p>&nbsp;</p>',
      discount: 45,
      eanCodePicURL: 'https://example.com/somepic.jpg',
      endDate: '2023-05-23T07:56:14.275Z',
      langId: 'fr',
      minimumPurchaseAmount: 0,
      name: 'Name 1046',
      requiredAmount: 1,
      startDate: '2023-03-02T00:00:00.000Z',
      status: 'ACTIVE',
      storeIds: [181],
      retailerId: 2,
      createdAt: '2023-03-23T08:56:14.276Z',
      updatedAt: '2023-05-12T07:47:41.157Z',
    }

    const mappedMockCoupon = {
      availableDays: 8,
      backgroundImage: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      brand: 'Palmolive',
      brandLogo:
        'http://localhost:4000/api/file/af4ab39d-cf0c-49c3-99a6-2dbf9e8bf6c6.jpg',
      categoryId: 10,
      description:
        '<h1>Save up to 15% on selected Gillette disposable razor! This offer is available in store.May not be available online. Limit one coupon per purchase of products ayjynd quantities stated.Coupons not authorized if purchasing products for <i>resale.5</i></h1><p>&nbsp;</p>',
      discount: 45,
      eanCodePicURL: 'https://example.com/somepic.jpg',
      endDate: '2023-05-23T07:56:14.275Z',
      langId: 'fr',
      minimumPurchaseAmount: 0,
      name: 'Name 1046',
      requiredAmount: 1,
      startDate: '2023-03-02T00:00:00.000Z',
      status: 'ACTIVE',
      storeIds: [181],
    }

    forUpdateCoupon(mockCoupon, 'fr', null).then((data) => {
      expect(data).toStrictEqual(mappedMockCoupon)
    })
  })
})
