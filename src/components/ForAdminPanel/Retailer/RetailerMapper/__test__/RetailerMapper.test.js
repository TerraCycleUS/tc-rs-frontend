import { formatForCreate, retailerUploadImages } from '../createRetailer'
import { formatForUpdate, retailerUpdateImages } from '../updateRetailer'
import '@testing-library/jest-dom'

jest.mock('../../../../../utils/http', () => ({
  post: () => ({ data: { name: 'image123.png' } }),
}))

describe('RetailerMapper', () => {
  test('forUpdateRetailer properly returns properties from retailer object', async () => {
    const mockRetailer = {
      backgroundImage: { rawFile: {} },
      description: '<p>Mock description</p>',
      logo: { rawFile: {} },
      name: 'Mock Retailer',
      smallLogo: { rawFile: {} },
    }

    const mappedMockRetailer = {
      backgroundImage: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      description: '<p>Mock description</p>',
      logo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      name: 'Mock Retailer',
      smallLogo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
    }

    expect(
      formatForCreate(
        mockRetailer,
        'image123.png',
        'image123.png',
        'image123.png',
      ),
    ).toStrictEqual(mappedMockRetailer)
  })

  test('retailerUpdateFiles properly returns properties from retailer object', async () => {
    const mockRetailer = {
      backgroundImage: { rawFile: {} },
      description: '<p>Mock description</p>',
      logo: { rawFile: {} },
      name: 'Mock Retailer',
      smallLogo: { rawFile: {} },
    }

    const mappedMockRetailer = {
      backgroundImage: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      description: '<p>Mock description</p>',
      logo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      name: 'Mock Retailer',
      smallLogo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
    }

    retailerUploadImages(mockRetailer).then((data) => {
      expect(data).toStrictEqual(mappedMockRetailer)
    })
  })

  test('forUpdateRetailer properly returns properties from retailer object', async () => {
    const mockRetailer = {
      backgroundImage: 'oldImage',
      description: '<p>Mock description</p>',
      name: 'Mock Retailer',
      smallLogo: { rawFile: {} },
      logo: { rawFile: {} },
      id: 23,
      createdAt: '12.12.12',
      updatedAt: '12.12.12',
    }

    const mappedMockRetailer = {
      description: '<p>Mock description</p>',
      name: 'Mock Retailer',
      smallLogo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      logo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      langId: 'en',
      backgroundImage: 'oldImage',
    }

    expect(
      formatForUpdate(mockRetailer, 'en', 'image123.png', 'image123.png'),
    ).toStrictEqual(mappedMockRetailer)
  })

  test('retailerUpdateFiles properly returns properties from retailer object', async () => {
    const mockRetailer = {
      backgroundImage: { rawFile: {} },
      description: '<p>Mock description</p>',
      logo: 'oldImage',
      name: 'Mock Retailer',
      smallLogo: { rawFile: {} },
    }

    const mappedMockRetailer = {
      backgroundImage: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      description: '<p>Mock description</p>',
      logo: 'oldImage',
      name: 'Mock Retailer',
      smallLogo: `${process.env.REACT_APP_SERVER_API_URL}/api/file/image123.png`,
      langId: 'en',
    }

    retailerUpdateImages(mockRetailer, 'en').then((data) => {
      expect(data).toStrictEqual(mappedMockRetailer)
    })
  })
})
