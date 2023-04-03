import * as React from 'react'
import { useState } from 'react'
import { useLogin, useNotify } from 'react-admin'

function AdminCustomLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()
  const notify = useNotify()

  // eslint-disable-next-line no-console
  console.log('AdminCustomLogin', AdminCustomLogin)
  // eslint-disable-next-line no-console
  console.log('email', email)
  // eslint-disable-next-line no-console
  console.log('password', password)
  const handleSubmit = (e) => {
    // eslint-disable-next-line no-console
    console.log('handleSubmit', handleSubmit)
    e.preventDefault()
    // will call authProvider.login({ email, password })
    if (!email || !password) return
    login({ email, password }).catch(() => notify('Invalid email or password'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Admin login</h1>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </form>
  )
}

export default AdminCustomLogin
