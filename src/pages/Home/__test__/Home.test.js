import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'
import Home from '../index'
import store from '../../../store'
import { DEFAULT_LANGUAGE } from '../../../utils/const'
import messages from '../../../../locales/en.json'
import { setUser } from '../../../actions/user'

afterEach(() => {
  store.dispatch(setUser(null))
})

test('it redirect to sign-in if user not logged in(no user in local storage)', async () => {
  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <IntlProvider
          locale="en"
          defaultLocale={DEFAULT_LANGUAGE}
          messages={messages}
        >
          <Home />
        </IntlProvider>
      </Provider>
    </BrowserRouter>,
  )
  expect(container.querySelector('a')).toHaveProperty(
    'href',
    'http://localhost/sign-in',
  )
})

test('it redirect to recycling bin if user is logged in', async () => {
  store.dispatch(setUser({ user: 'mock' }))

  const { container } = render(
    <BrowserRouter>
      <Provider store={store}>
        <IntlProvider
          locale="en"
          defaultLocale={DEFAULT_LANGUAGE}
          messages={messages}
        >
          <Home />
        </IntlProvider>
      </Provider>
    </BrowserRouter>,
  )
  expect(container.querySelector('a')).toHaveProperty(
    'href',
    'http://localhost/recycling-bin',
  )
})
