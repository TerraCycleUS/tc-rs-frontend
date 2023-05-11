import { formatRetailer, retailerUpdateFiles } from '../forCreateRetailer'
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
      formatRetailer(
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

    retailerUpdateFiles(mockRetailer).then((data) => {
      expect(data).toStrictEqual(mappedMockRetailer)
    })
  })
})
