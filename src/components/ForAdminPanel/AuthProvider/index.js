import { setUser } from '../../../actions/user'
import store from '../../../store'
import http from '../../../utils/http'

export default {
  // send username and password to the auth server and get back credentials
  login: async ({ password, verificationCode, email }) => {
    const data = { email, password }
    if (verificationCode) data.verificationCode = verificationCode
    try {
      const res = await http.post('/api/auth/login', data)
      store.dispatch(setUser({ ...res.data, role: 'ADMIN' }))
      if (res.data.isTwoFaEnabled === false) return { redirectTo: '/admin/setup-two-factor' }
      return Promise.resolve();
    } catch (error) {
      console.log('error1', error);
      if (error.response.data.errorCode === 'twoFaValidationCodeFail') {
        throw new Error('twoFaValidationCodeFail')
      }
      throw new Error(error.response?.data?.errors?.join(''))
    }
  },

  checkError: (error) => {
    const { status } = error
    if (status === 401 || status === 403) {
      store.dispatch(setUser(null))
      // eslint-disable-next-line prefer-promise-reject-errors
      // return Promise.reject({ redirectTo: '/admin/login' })
      return Promise.reject()
    }
    return Promise.resolve()
  },
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: () => {
    const { user } = store.getState()
    // eslint-disable-next-line prefer-promise-reject-errors
    // return Promise.reject({ redirectTo: '/admin/login' })
    return user?.role === 'ADMIN' ? Promise.resolve() : Promise.reject()
  },
  // remove local credentials and notify the auth server that the user logged out
  logout: () => {
    store.dispatch(setUser(null))
    return Promise.resolve()
  },
  // get the user's profile
  getIdentity: () => {
    const { user } = store.getState()
    return user?.id
      ? Promise.resolve({
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      })
      : Promise.reject()
  },

  // get the user permissions (optional)
  getPermissions: (e) => Promise.resolve(e),
}
