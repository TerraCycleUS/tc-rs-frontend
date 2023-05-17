import AuthProvider from '../index'
import '@testing-library/jest-dom'

const mockProvider = {
  login: expect.any(Function),
  checkError: expect.any(Function),
  checkAuth: expect.any(Function),
  logout: expect.any(Function),
  getIdentity: expect.any(Function),
}

describe('AuthProvider', () => {
  test('AuthProvider will return object with methods', async () => {
    expect(AuthProvider).toMatchObject(mockProvider)
  })
})
