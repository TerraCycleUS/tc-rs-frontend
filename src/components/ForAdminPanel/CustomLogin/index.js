import React, { useState } from 'react'
import { useLogin, useNotify, Notification } from 'react-admin'
import TextField from '@mui/material/TextField'
import classNames from 'classnames'
import classes from './CustomLogin.module.scss'

function CustomLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerificationCodeNeed, setIsVerificationCodeNeed] = useState(false)

  const login = useLogin()
  const notify = useNotify()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      email,
      password,
      verificationCode,
    })
      .then(() => {
        notify('Logged in successfully')
      })
      .catch((error) => {
        if (error.message === 'twoFaValidationCodeFail') {
          setVerificationCode('')
          setIsVerificationCodeNeed(true)
        } else if (error.message) {
          notify(`Error: ${error.message}`)
        } else {
          notify('Invalid email or password')
        }
      })
  }

  return (
    <div className={classNames(classes.setupWrapper, classes.login)}>
      <form className={classes.wrapper} onSubmit={handleSubmit}>
        <div className={classes.inputWrapper}>
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </div>
        <div className={classes.inputWrapper}>
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </div>

        {isVerificationCodeNeed && (
          <div className={classes.inputWrapper}>
            <p>To keep your account secure, we verify your identity.</p>
            <p>Enter the code generated by your authenticator app.</p>
            <TextField
              type="text"
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              fullWidth
            />
          </div>
        )}

        <button className={classes.signIn} type="submit">
          Sign in
        </button>
      </form>
    </div>
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
