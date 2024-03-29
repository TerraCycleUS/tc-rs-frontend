import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as LearnMore } from "../../assets/icons/learn-more.svg";
import classes from "./Profile.module.scss";
import FooterNav from "../../components/FooterNav";
import useLogout from "../../utils/useLogout";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import { setUser } from "../../actions/user";
import requiredItemsText from "../../utils/textChanging/itemsRecycledText";
import FeedbackSurvey from "../../components/FeedbackSurvey";

function getAccountOverview(user) {
  const accountOverview = [
    {
      icon: "retailer-list",
      to: "retailer-list",
      state: null,
      label: {
        id: "profile:MonoprixIdLabel",
        defaultMessage: "Retailer loyalty ID",
      },
    },
    {
      icon: "language",
      to: "language",
      label: {
        id: "profile:LanguageLabel",
        defaultMessage: "Language",
      },
    },
  ];

  if (user.socialProvider) return accountOverview;

  accountOverview.unshift({
    icon: "change-password",
    to: "change-password",
    label: {
      id: "profile:ChangePwLabel",
      defaultMessage: "Change password",
    },
  });

  return accountOverview;
}

const generalInfo = [
  {
    icon: "faq",
    to: "faq",
    label: { id: "profile:FAQLabel", defaultMessage: "FAQ" },
  },
  {
    icon: "tutorial",
    to: "tutorial",
    label: { id: "profile:TutorialLabel", defaultMessage: "Tutorial" },
  },
  {
    icon: "terms",
    to: "terms",
    label: {
      id: "profile:TermsLabel",
      defaultMessage: "Terms and conditions",
    },
  },
  {
    icon: "privacy",
    to: "privacy",
    label: {
      id: "profile:PrivacyLabel",
      defaultMessage: "Privacy policy",
    },
  },
  {
    icon: "cookie",
    to: "privacy/cookie-list",
    label: {
      id: "profile:CookieLabel",
      defaultMessage: "Manage cookies",
    },
  },
];

export default function Profile() {
  const user = useSelector((state) => state.user);
  const { formatMessage } = useIntl();
  const { name, email } = user;
  const getAmountApiCall = useApiCall();
  const logout = useLogout();
  const dispatch = useDispatch();
  const [recycledAmount, setRecycledAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getAmountApiCall(
      () => http.get("/api/user/profile"),
      (response) => {
        setRecycledAmount(response.data.recycledAmount);
        setTotalAmount(response.data.totalAmount);
        dispatch(setUser({ ...user, ...response.data }));
      },
      null,
      null,
      { message: true }
    );
  }, []);

  return (
    <div
      className={classNames(
        classes.wrapper,
        "d-flex",
        "flex-column",
        "h-100",
        "hide-on-exit"
      )}
    >
      <div
        className={classNames(
          classes.content,
          "position-relative",
          "my-bg-color-main",
          "bottom-curved"
        )}
      >
        <div
          className={classNames(
            classes.userDetails,
            "text-center",
            "position-relative"
          )}
        >
          <span
            className={classNames(
              classes.nameIcon,
              "my-text-h4",
              "d-block",
              "text-capitalize",
              "my-bg-color-lightGreen",
              "my-color-terraGreen",
              "position-absolute",
              "top-0",
              "start-50"
            )}
          >
            {name[0]}
          </span>
          <Container>
            <Row>
              <Col xs={{ span: 8, offset: 2 }}>
                <h6 className="my-text-primary text-capitalize text-white">
                  {name}
                </h6>
                <p className="my-text-description my-color-successLight">
                  {email}
                </p>
              </Col>
              <Col
                xs={2}
                className={classNames(
                  classes.buttonCol,
                  "d-flex",
                  "align-items-center",
                  "justify-content-center"
                )}
              >
                <Link to="edit">
                  <EditIcon />
                </Link>
              </Col>
            </Row>
          </Container>
          <div
            className={classNames(
              "d-flex",
              "justify-content-center",
              "position-absolute",
              "w-100",
              classes.boxRow
            )}
          >
            <Box
              value={recycledAmount}
              desc={requiredItemsText(recycledAmount)}
            />
            <Box
              value={totalAmount}
              desc={
                <FormattedMessage
                  id="profile:MyTotalImpact"
                  defaultMessage="My total impact"
                />
              }
              to="./history"
            />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          classes.menu,
          "position-relative",
          "flex-grow-1",
          "my-bg-color-terraGrey"
        )}
      >
        <Container>
          <div className={classNames(classes.menuItems)}>
            <h6 className={classes.sectionName}>
              <FormattedMessage
                id="profile:AccountOverview"
                defaultMessage="Account overview"
              />
            </h6>
            <ul>
              {getAccountOverview(user).map(({ to, label, state, icon }) => (
                <MenuItem
                  to={to}
                  label={formatMessage(label)}
                  state={state}
                  key={to}
                  icon={icon}
                />
              ))}
            </ul>
            <div className={classes.divider} />
            <h6 className={classes.sectionName}>
              <FormattedMessage
                id="profile:GeneralInfo"
                defaultMessage="General information"
              />
            </h6>
            <ul>
              {generalInfo.map(({ to, label, icon }) => (
                <MenuItem
                  to={to}
                  label={formatMessage(label)}
                  key={to}
                  icon={icon}
                />
              ))}
            </ul>
            <div className={classes.divider} />
            <button
              type="button"
              onClick={logout}
              className={classNames(
                classes.menuItem,
                classes.logout,
                "d-flex",
                "align-items-center",
                "my-text",
                "my-color-textPrimary",
                "w-100"
              )}
            >
              <FormattedMessage id="profile:Logout" defaultMessage="Logout" />
            </button>
          </div>
          <Link data-testid="contactUs-link" to="./contact-us">
            <div
              className={classNames(
                classes.contactUs,
                "d-flex align-items-center"
              )}
            >
              <span className="tool-btn flex-shrink-0">
                <LearnMore />
              </span>
              <p
                className="my-text-description my-color-main"
                data-testid="contact-us-text"
              >
                <FormattedMessage
                  id="profile:ContactUs"
                  defaultMessage="Questions? Contact us. We’re here to help!"
                />
              </p>
            </div>
          </Link>
          <FeedbackSurvey />
          <p
            className={classNames(
              "my-text-description",
              "text-center",
              "my-color-textSecondary",
              classes.poweredBy
            )}
          >
            <FormattedMessage
              id="profile:PoweredBy"
              defaultMessage="Powered by <b>TerraCycle</b>"
              values={{
                b: (chunks) => (
                  <strong className="my-color-darkGrey">{chunks}</strong>
                ),
              }}
            />
          </p>
        </Container>
      </div>
      <FooterNav className="position-sticky" />
    </div>
  );
}

function Box({ value, desc, to }) {
  if (!to)
    return (
      <div className={classes.box}>
        <p className={classes.value}>{value}</p>
        <p className={classes.desc}>{desc}</p>
      </div>
    );
  return (
    <Link data-testid="history-link" to={to} className={classes.box}>
      <p className={classes.value}>{value}</p>
      <p className={classes.desc}>{desc}</p>
    </Link>
  );
}

Box.propTypes = {
  value: PropTypes.node,
  desc: PropTypes.node,
  to: PropTypes.string,
};

function MenuItem({ to, label, state, icon }) {
  return (
    <li>
      <Link
        className={classNames(
          classes.menuItem,
          classes[icon],
          "d-flex",
          "align-items-center",
          "my-text",
          "my-color-textPrimary"
        )}
        to={to}
        state={state}
      >
        {label}
      </Link>
    </li>
  );
}

MenuItem.propTypes = {
  to: PropTypes.string,
  label: PropTypes.node,
  state: PropTypes.object,
  icon: PropTypes.string,
};
