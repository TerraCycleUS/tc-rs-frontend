import forUpdateUser from '../forUpdateUser'
import '@testing-library/jest-dom'

const mockUser = {
  retailerId: '',
  name: 'mock',
  status: 'status',
  id: 'id',
  role: 'USER',
  lastLogin: ' 356432',
  lastLogout: ' 356432',
  isTwoFaEnabled: true,
}

const mappedMockUser = {
  retailerId: null,
  name: 'mock',
}

describe('forUpdateUser', () => {
  test('forUpdateUser properly deletes properties from user object', async () => {
    expect(forUpdateUser(mockUser)).toStrictEqual(mappedMockUser)
  })
})
