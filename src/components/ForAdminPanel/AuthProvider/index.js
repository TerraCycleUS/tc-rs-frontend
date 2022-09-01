import { setUser } from '../../../actions/user'
import store from '../../../store'
import http from '../../../utils/http'

export default {
  // send username and password to the auth server and get back credentials
  login: async ({ username, password }) => {
    const data = {
      email: username,
      password,
    }
    try {
      const res = await http.post('/api/auth/login', data)
      store.dispatch(setUser({ ...res.data, role: 'admin' }))
      return { redirectTo: '/admin' }
    } catch (error) {
      throw error.response?.data?.errors?.join('')
    }
  },
  // when the dataProvider returns an error, check if this is an authentication error
  checkError: () => Promise.resolve(),
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: () => {
    const { user } = store.getState()
    return user?.role === 'admin' ? Promise.resolve() : Promise.reject()
  },
  // remove local credentials and notify the auth server that the user logged out
  logout: () => {
    store.dispatch(setUser(null))
    return Promise.resolve()
  },
  // get the user's profile
  getIdentity: () => Promise.resolve(),
  // get the user permissions (optional)
  getPermissions: () => Promise.resolve(),
}
