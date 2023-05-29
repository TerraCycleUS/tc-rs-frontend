import { findRetailer, onError, formatForApi } from '../adminUtils'
import '@testing-library/jest-dom'

describe('paginationSlice', () => {
  test('findRetailer returns name by id', async () => {
    const mockRetailers = [
      {
        id: 2,
        name: 'Carrefour',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore.uis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat',
        backgroundImage: 'http:ca3a43cd02f.jpg',
        logo: 'http://e577fe1f42f.jpg',
        smallLogo: 'http://12-c2b5ff810076.png',
        userLoyaltyCode: null,
        userLoyaltyPassCode: '1030750000000000000',
      },
    ]

    const output = findRetailer(2, mockRetailers)
    expect(output).toBe('Carrefour')
  })

  test('onError finds error message in body', async () => {
    const mockError1 = { error: { body: { errors: 'OOps' } } }
    const mockError2 = { error: { body: { message: 'Something went wrong' } } }

    expect(() => onError(mockError1, (text) => text)).not.toThrow()
    expect(() => onError(mockError2, (text) => text)).not.toThrow()
  })

  test('formatForApi returns date in form of time stamp', async () => {
    const inputData = '2023-02-09T15:25:04.009Z'

    expect(formatForApi(inputData)).toBe(1675956304009)
  })
})
