import React from 'react'
import { IntlProvider } from 'react-intl'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import queryString from 'query-string'

import { detectLanguage, loadLocales } from './utils/intl'
import { DEFAULT_LANGUAGE } from './utils/const'
import GlobalHeader from './components/GlobalHeader'
import ApiError from './components/PopUps/ApiError'
import { useMessageContext } from './context/message'
import BackdropMessage from './components/Message/BackdropMessage'
import AnimatedRoutes from './components/AnimatedRoutes'
import Routes from './components/Routes'
import LoadingScreen from './components/LoadingScreen'
import useLocationPolling from './utils/useLocationPolling'
import LocationDropOffPopup from './components/PopUps/LocationDropOff'

export default function App() {
  const user = useSelector((state) => state.user)
  const [messages, setMessages] = React.useState({})
  const location = useLocation()
  const [loading, setLoading] = React.useState(true)
  const detectedLang = detectLanguage()
  const lang = user?.lang || detectedLang
  const [message, , clear] = useMessageContext()
  const {
    state: locationState,
    start,
    clear: clearLocation,
  } = useLocationPolling()
  const navigate = useNavigate()

  React.useEffect(() => {
    loadLocales(lang)
      .then((mod) => {
        setMessages(mod.default)
        setLoading(false)
      })
      .catch(() =>
        loadLocales(DEFAULT_LANGUAGE).then((mod) => {
          setMessages(mod.default)
          setLoading(false)
        }),
      )
  }, [lang])

  React.useEffect(() => {
    start()
  }, [])

  function startDropOff() {
    clearLocation()
    const { address, city, id, retailerId } = locationState
    navigate({
      pathname: '/drop-off',
      search: queryString.stringify({
        location: locationState.location,
        address,
        city,
        id,
        retailerId,
      }),
    })
  }

  function errorNotHandle() {}

  if (loading) return <LoadingScreen />

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
      {locationState ? (
        <LocationDropOffPopup
          onStart={startDropOff}
          brand={locationState.brand}
          location={locationState.location}
          setShow={start}
        />
      ) : null}
    </IntlProvider>
  )
}
