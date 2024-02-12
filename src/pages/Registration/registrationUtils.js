import React from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

import classes from "./Registration.module.scss";

export const getRegistrationCheckboxes = (language) => [
  {
    name: "terms",
    content: {
      id: "signUp:Terms",
      defaultMessage:
        "I confirm that I have read and agree to the <Link>Terms&Conditions of Terracycle</Link><span>*</span>",
      values: {
        a: (chunks) => (
          <Link
            data-testid="terms"
            to={{
              pathname: "/profile/terms",
              search: queryString.stringify({
                language,
              }),
            }}
          >
            {chunks}
          </Link>
        ),
        span: (chunks) => <span className={classes.asterisk}>{chunks}</span>,
      },
    },
  },
  {
    name: "privacy",
    content: {
      id: "signUp:Privacy",
      defaultMessage:
        "I confirm that I have read and agree to the the <a>Terracycle Privacy Policy</a><span>*</span>",
      values: {
        a: (chunks) => (
          <Link
            data-testid="privacy"
            search={queryString.stringify(language)}
            to={{
              pathname: "/profile/privacy",
              search: queryString.stringify({
                language,
              }),
            }}
          >
            {chunks}
          </Link>
        ),
        span: (chunks) => <span className={classes.asterisk}>{chunks}</span>,
      },
    },
  },
  {
    name: "messages",
    content: {
      id: "signUp:Messages",
      defaultMessage:
        "I consent to Terracycle to send me marketing messages \nusing the data (name, e-mail address) hereby provided by me.",
    },
    className: "big-text",
  },
];
