import React from "react";
import { IntlProvider } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import queryString from "query-string";

import { detectLanguage, loadLocales } from "./utils/intl";
import {
  DEFAULT_LANGUAGE,
  STOP_SHOWING_THIS,
  getScrollBehaviour,
  locationPollingBlacklist,
} from "./utils/const";
import GlobalHeader from "./components/GlobalHeader";
import ApiError from "./components/PopUps/ApiError";
import { useMessageContext } from "./context/message";
import BackdropMessage from "./components/Message/BackdropMessage";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Routes from "./components/Routes";
import LoadingScreen from "./components/LoadingScreen";
import useLocationPolling from "./utils/useLocationPolling";
import LocationDropOffPopup from "./components/PopUps/LocationDropOff";
import useApiCall from "./utils/useApiCall";
import http from "./utils/http";
import PleaseRegister from "./components/PopUps/PleaseRegister";

export default function App() {
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = React.useState({});
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const detectedLang = detectLanguage();
  const lang = user?.lang || detectedLang;
  const [message, , clear] = useMessageContext();
  const [retailers, setRetailers] = React.useState([]);
  const [pleaseRegister, setPleaseRegister] = React.useState(false);

  const retailersApiCall = useApiCall();
  const {
    state: locationState,
    start,
    clear: clearLocation,
    reset,
    stop,
  } = useLocationPolling();
  const navigate = useNavigate();

  function togglePolling() {
    const path = location.pathname.split("/")[1];

    if (locationPollingBlacklist[path]) {
      stop();
    } else {
      start();
    }
  }

  const itIsLocalHost =
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1";
  if (itIsLocalHost && window.location.protocol === "http:") {
    window.location.href = window.location.href.replace(/^http:/, "https:");
  }

  React.useEffect(() => {
    if (!user || user.role === "ADMIN") return;
    retailersApiCall(
      () => http.get("/api/retailer/my-retailers"),
      (res) => setRetailers(res.data),
      null,
      null
    );
  }, []);

  React.useEffect(() => {
    loadLocales(lang)
      .then((mod) => {
        setMessages(mod.default);
        setLoading(false);
      })
      .catch(() =>
        loadLocales(DEFAULT_LANGUAGE).then((mod) => {
          setMessages(mod.default);
          setLoading(false);
        })
      );
  }, [lang]);

  React.useEffect(() => {
    togglePolling();
  }, []);
  let redirectLink = "";
  if (locationState) {
    const { address, city, id, retailerId } = locationState;
    redirectLink = `/drop-off?${queryString.stringify({
      location: locationState.location,
      address,
      city,
      id,
      retailerId,
    })}`;
  }

  async function startDropOff() {
    const { retailerId } = locationState;
    let retailer;
    if (!retailers.length) {
      try {
        const tempRetailers = await http.get("/api/retailer/my-retailers");
        retailer = tempRetailers?.data?.find((item) => item.id === retailerId);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else retailer = retailers.find((item) => item.id === retailerId);
    if (user && !retailer) {
      setPleaseRegister(true);
      return;
    }

    clearLocation();
    navigate(redirectLink);
  }

  const stopShowingThis = sessionStorage.getItem(STOP_SHOWING_THIS);

  const locationDropCheck =
    !stopShowingThis && locationState && !pleaseRegister;

  function errorNotHandle() {}

  function stopShowingForThisSession() {
    if (!stopShowingThis) sessionStorage.setItem(STOP_SHOWING_THIS, true);
    reset();
  }

  if (loading) return <LoadingScreen />;

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
            onEnter={() => {
              window.scrollTo({
                top: 0,
                behavior: getScrollBehaviour(location.pathname),
              });
            }}
            onEntering={togglePolling}
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
      {locationDropCheck ? (
        <LocationDropOffPopup
          onStart={startDropOff}
          brand={locationState?.brand}
          location={locationState?.location}
          onCancel={stopShowingForThisSession}
        />
      ) : null}
      {pleaseRegister ? (
        <PleaseRegister
          closePop={() => {
            setPleaseRegister(false);
            stopShowingForThisSession();
          }}
          currentRetailerId={locationState?.retailerId}
          unregisteredRetailer={locationState?.brand}
          user={user}
          onClick={() => {
            setPleaseRegister(false);
            clearLocation();
          }}
          redirect={redirectLink}
        />
      ) : null}
    </IntlProvider>
  );
}
