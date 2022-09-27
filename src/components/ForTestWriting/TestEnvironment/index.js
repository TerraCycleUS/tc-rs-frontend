import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import PropTypes from 'prop-types'
import { DEFAULT_LANGUAGE } from '../../../utils/const'
import messagesJson from '../../../../locales/en.json'
import { ApiErrorProvider } from '../../../context/apiError'
import { MessageProvider } from '../../../context/message'

export default function TestEnvironment({
  children,
  store,
  locale = 'en',
  defaultLocale = DEFAULT_LANGUAGE,
  messages = messagesJson,
}) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ApiErrorProvider>
          <MessageProvider>
            <IntlProvider
              locale={locale}
              defaultLocale={defaultLocale}
              messages={messages}
            >
              {children}
            </IntlProvider>
          </MessageProvider>
        </ApiErrorProvider>
      </Provider>
    </BrowserRouter>
  )
}

TestEnvironment.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
  locale: PropTypes.string,
  defaultLocale: PropTypes.string,
  messages: PropTypes.object,
}