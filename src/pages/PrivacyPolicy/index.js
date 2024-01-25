import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import Page from "../../Layouts/Page";
import useApiCall from "../../utils/useApiCall";
import http from "../../utils/http";
import classes from "../CookiesUsed/CookiesUsed.module.scss";

export default function PrivacyPolicy() {
  const [pageContent, setPageContent] = useState();
  const getContentApiCall = useApiCall();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { language } = user?.lang
    ? { language: user?.lang }
    : queryString.parse(location.search);

  useEffect(() => {
    getContentApiCall(
      () => http.get(`/api/page/1?lang=${language}`),
      (response) => {
        setPageContent(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  return (
    <Page>
      {pageContent ? (
        <div
          className="default-font ck-content"
          dangerouslySetInnerHTML={{ __html: pageContent.body }}
        />
      ) : null}
      <Link
        className={classes.manageCookies}
        state={{ dontOpenSetting: true }}
        to="/profile/privacy/cookie-list"
      >
        <FormattedMessage
          id="privacyPolicy:CookiesUsed"
          defaultMessage="Cookies Used"
        />
      </Link>
    </Page>
  );
}
