import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import queryString from "query-string";
import PropTypes from "prop-types";
import Page from "../../Layouts/Page";
import { ReactComponent as Eye } from "../../assets/icons/password-mask.svg";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Text, { TextPrimary } from "../../components/Text";
import http from "../../utils/http";
import SocialLogin from "../../components/SocialLogin";
import { setUser } from "../../actions/user";
import useApiCall from "../../utils/useApiCall";
import SocialLoginError from "../../components/PopUps/SocialLoginError";
import { detectLanguage } from "../../utils/intl";
import classes from "./SignIn.module.scss";

const defaultValues = {
  email: "",
  password: "",
};

export default function SignIn({ language }) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const [isMasked, setMasked] = React.useState(true);
  const dispatch = useDispatch();
  const apiCall = useApiCall();
  const location = useLocation();
  const [, setParams] = useSearchParams();
  const params = queryString.parse(location.search);
  const socialError = params["social-error"];
  const detectedLang = detectLanguage();

  const onPopupClose = () => {
    setParams("", { replace: true });
  };

  let queryParam;
  const successCb = (res) => {
    dispatch(setUser(res.data));
    if (res.data.status === "INVITED") {
      navigate({
        pathname: "/registration/confirm-code",
        search: queryParam,
      });
      return;
    }
    navigate(params.redirect || "/", { replace: true });
  };

  const schema = object({
    email: string()
      .email(
        formatMessage({
          id: "signIn:EmailInvalid",
          defaultMessage: "Email must be a valid Email.",
        })
      )
      .required(
        formatMessage({
          id: "signIn:EmailRequired",
          defaultMessage: "Email is required.",
        })
      )
      .max(50),
    password: string()
      .required(
        formatMessage({
          id: "signIn:PasswordRequired",
          defaultMessage: "Password is required.",
        })
      )
      .max(50),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  function onSubmit(data) {
    queryParam = queryString.stringify({ email: data.email });
    apiCall(
      () => http.post("/api/auth/login", { ...data, lang: detectedLang }),
      successCb
    );
  }

  const unMasker = (
    <button
      type="button"
      className={classNames(classes.changeType, { isMasked })}
      onClick={() => setMasked((prev) => !prev)}
    >
      <Eye />
    </button>
  );

  return (
    <Page>
      {socialError ? (
        <SocialLoginError type={socialError} onClose={onPopupClose} />
      ) : null}
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="email"
            label={formatMessage({
              id: "signIn:EmailLabel",
              defaultMessage: "Email",
            })}
            error={errors.email?.message}
            input={{
              ...register("email"),
              placeholder: formatMessage({
                id: "signIn:EmailPlaceholder",
                defaultMessage: "Enter your registered email address",
              }),
            }}
          />
          <TextField
            id="password"
            className={classes.password}
            adornment={unMasker}
            label={formatMessage({
              id: "signIn:PasswordLabel",
              defaultMessage: "Password",
            })}
            error={errors.password?.message}
            input={{
              ...register("password"),
              placeholder: formatMessage({
                id: "signIn:PasswordPlaceholder",
                defaultMessage: "Enter your password",
              }),
              type: isMasked ? "password" : "text",
            }}
          />
          <Text className={classNames("text-end", classes.forgottenPassword)}>
            <Link to="/reset-password">
              <FormattedMessage
                id="signIn:ForgottenPassword"
                defaultMessage="Forgotten password?"
              />
            </Link>
          </Text>
          <Button
            disabled={!(dirtyFields.email && dirtyFields.password)}
            type="submit"
          >
            <FormattedMessage
              id="signIn:SubmitButton"
              defaultMessage="Sign in"
            />
          </Button>
        </form>
        <SocialLogin language={language} />
        <div className={classes.linkRow}>
          <Link
            to="/registration"
            className="registration-link"
            data-testid="registration"
          >
            <TextPrimary>
              <FormattedMessage
                id="signIn:SignUp"
                defaultMessage="Create an account"
              />
            </TextPrimary>
          </Link>
        </div>
      </div>
    </Page>
  );
}

SignIn.propTypes = {
  language: PropTypes.string,
};
