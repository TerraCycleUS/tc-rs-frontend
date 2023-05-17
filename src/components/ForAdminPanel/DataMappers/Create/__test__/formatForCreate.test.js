import formatForCreate from '../formatForCreate'
import '@testing-library/jest-dom'

jest.mock('../../../../../utils/http', () => ({
  post: () => ({ data: { name: 'image123.png' } }),
}))

describe('formatForCreate', () => {
  test('formatForCreate will return retailer object if provided with retailer resource', async () => {
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

    formatForCreate('retailer', mockRetailer, 'en', null).then((data) => {
      expect(data).toStrictEqual(mappedMockRetailer)
    })
  })

  test('formatForCreate will return input data if no expected resource was provided', async () => {
    const mockRetailer = {
      backgroundImage: { rawFile: {} },
      description: '<p>Mock description</p>',
      logo: { rawFile: {} },
      name: 'Mock Retailer',
      smallLogo: { rawFile: {} },
    }

    expect(formatForCreate('404', mockRetailer, 'en', null)).toStrictEqual(
      mockRetailer,
    )
  })
})
