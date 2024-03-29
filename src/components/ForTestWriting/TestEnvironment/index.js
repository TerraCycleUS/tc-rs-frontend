import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import PropTypes from "prop-types";
import { DEFAULT_LANGUAGE } from "../../../utils/const";
import messagesJson from "../../../../locales/en.json";
import { MessageProvider } from "../../../context/message";
import defaultStore from "../../../store";

export default function TestEnvironment({
  children,
  store,
  locale = "en",
  defaultLocale = DEFAULT_LANGUAGE,
  messages = messagesJson,
  initialEntries,
}) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={store || defaultStore}>
        <MessageProvider>
          <IntlProvider
            locale={locale}
            defaultLocale={defaultLocale}
            messages={messages}
          >
            {children}
          </IntlProvider>
        </MessageProvider>
      </Provider>
    </MemoryRouter>
  );
}

TestEnvironment.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object,
  locale: PropTypes.string,
  defaultLocale: PropTypes.string,
  messages: PropTypes.object,
  initialEntries: PropTypes.array,
};
