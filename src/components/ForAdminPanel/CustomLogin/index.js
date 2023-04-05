import React, { useState } from 'react'
import {
  useLogin,
  useNotify,
  Notification,
  TextInput,
  Form,
  PasswordInput,
} from 'react-admin'
import classes from './CustomLogin.module.scss'

function CustomLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()
  const notify = useNotify()

  const handleSubmit = (e) => {
    // eslint-disable-next-line no-console
    console.log('handleSubmit', 'CustomLoginForm')
    login({ email: e.email, password: e.password })
      // login({ email: "recycle-and-save-admin@terracycle.com", password: "p056gF!7xMZ!" })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('then', 'CustomLoginForm')
        notify('Logged in successfully')
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error catch', 'CustomLoginForm', error)
        // redirect('customLogin1417')
        notify('Invalid email or password')
      })
  }

  // eslint-disable-next-line no-console
  console.log('render', 'CustomLoginForm')

  return (
    <Form className={classes.wrapper} onSubmit={handleSubmit}>
      <div className={classes.inputWrapper}>
        <TextInput
          label="Email"
          source="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </div>
      <div className={classes.inputWrapper}>
        <PasswordInput
          label="Password"
          source="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.password)}
          fullWidth
        />
      </div>
      <button className={classes.signIn} type="submit">
        Sign in
      </button>
    </Form>
  )
}

function CustomLoginPage() {
  return (
    <>
      <Notification />
      <CustomLoginForm />
    </>
  )
}

export default CustomLoginPage
