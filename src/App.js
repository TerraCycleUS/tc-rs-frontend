import React from 'react'
import { IntlProvider } from 'react-intl'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { detectLanguage, loadLocales } from './utils/intl'
import { DEFAULT_LANGUAGE } from './utils/const'
import GlobalHeader from './components/GlobalHeader'
import ApiError from './components/PopUps/ApiError'
import { useMessageContext } from './context/message'
import BackdropMessage from './components/Message/BackdropMessage'
import AnimatedRoutes from './components/AnimatedRoutes'
import Routes from './components/Routes'

export default function App() {
  const user = useSelector((state) => state.user)
  const seenTutorial = useSelector((state) => state.seenTutorial)
  const [messages, setMessages] = React.useState({})
  const location = useLocation()
  const detectedLang = detectLanguage()
  const lang = user?.lang || detectedLang
  const [message, , clear] = useMessageContext()
  const navigate = useNavigate()
  React.useEffect(() => {
    loadLocales(lang)
      .then((mod) => setMessages(mod.default))
      .catch(() => {
        loadLocales(DEFAULT_LANGUAGE).then((mod) => setMessages(mod.default))
      })
  }, [lang])

  React.useEffect(() => {
    if (!seenTutorial) navigate('/profile/tutorial')
  }, [])

  function errorNotHandle() {}

  return (
    <IntlProvider
      locale={lang}
      defaultLocale={DEFAULT_LANGUAGE}
      messages={messages}
      onError={errorNotHandle}
    >
      <GlobalHeader />
      <div className="position-relative flex-grow-1">
        <TransitionGroup component={null}>
          <CSSTransition
            timeout={600}
            key={location.pathname}
            onEnter={() => window.scrollTo({ top: 0, behavior: 'auto' })}
          >
            <AnimatedRoutes />
          </CSSTransition>
        </TransitionGroup>
        <Routes />
      </div>
      <ApiError />
      {message ? (
        <BackdropMessage onClose={clear} type={message.type}>
          {message.text}
        </BackdropMessage>
      ) : null}
    </IntlProvider>
  )
}
