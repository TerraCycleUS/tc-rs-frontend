import React from "react";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, boolean, object } from "yup";
import { FormattedMessage, useIntl } from "react-intl";

import PropTypes from "prop-types";
import Button from "../../components/Button";
import Page from "../../Layouts/Page";
import TextField from "../../components/TextField";
import Checkbox from "../../components/Checkbox";
import Text, { TextPrimary } from "../../components/Text";
import SocialLogin from "../../components/SocialLogin";
import { defaultRegistrationValues } from "../../utils/const";
import useApiCall from "../../utils/useApiCall";
import http from "../../utils/http";
import classes from "./Registration.module.scss";
import { useMessageContext } from "../../context/message";
import { getRegistrationCheckboxes } from "./registrationUtils";

const schema = object({
  name: string()
    .required(
      <FormattedMessage
        id="signUp:NameRequired"
        defaultMessage="Name is required."
      />
    )
    .min(
      3,
      <FormattedMessage
        id="signUp:NameError"
        defaultMessage="Name must be at least 3 characters long and 30 characters at most."
      />
    )
    .max(
      30,
      <FormattedMessage
        id="signUp:NameError"
        defaultMessage="Name must be at least 3 characters long and 30 characters at most."
      />
    )
    .trim(),
  email: string()
    .email(
      <FormattedMessage
        id="signUp:EmailInvalid"
        defaultMessage="Email must be a valid Email"
      />
    )
    .required(
      <FormattedMessage
        id="signUp:EmailRequired"
        defaultMessage="Email is required."
      />
    )
    .max(50),
  zipcode: string()
    .required(
      <FormattedMessage
        id="signUp:PostCodeRequired"
        defaultMessage="Post Code is required."
      />
    )
    .max(30),
  terms: boolean().oneOf([true]),
  privacy: boolean().oneOf([true]),
  messages: boolean(),
});

const textInputs = [
  {
    name: "name",
    label: { id: "signUp:NameLabel", defaultMessage: "Name" },
    placeholder: {
      id: "signUp:NamePlaceholder",
      defaultMessage: "Enter your name",
    },
  },
  {
    name: "email",
    label: { id: "signUp:EmailLabel", defaultMessage: "Email" },
    placeholder: {
      id: "signUp:EmailPlaceholder",
      defaultMessage: "Enter your registered email address",
    },
  },
  {
    name: "zipcode",
    label: { id: "signUp:ZipLabel", defaultMessage: "Zip code" },
    placeholder: {
      id: "signUp:ZipPlaceholder",
      defaultMessage: "Enter your Zip code",
    },
  },
];

export default function Registration({ language }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, updateMessage] = useMessageContext();
  const defaultValues =
    queryString.parse(location.search, { parseBooleans: true }) ||
    defaultRegistrationValues;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  const { formatMessage } = useIntl();
  const apiCall = useApiCall();

  const successCb = (res, data) => {
    if (res.data.message === "User is exist") {
      updateMessage(
        {
          text: formatMessage({
            id: "signUp:UserExists",
            defaultMessage: "An account already exists",
          }),
          type: "error",
        },
        10000
      );
    } else if (res.data.message === "User is not exist") {
      navigate({ pathname: "pw-setup", search: queryString.stringify(data) });
    }
  };

  function onSubmit(data) {
    apiCall(
      () => http.get(`/api/auth/email-check?email=${data.email}`),
      (res) => successCb(res, data)
    );
  }

  function onError(errorsData) {
    if (errorsData.privacy || errorsData.terms)
      updateMessage(
        {
          text: formatMessage({
            id: "signUp:PleaseAgree",
            defaultMessage:
              "Please agree to the mandatory terms & conditions and Privacy Policy to continue.",
          }),
          type: "error",
        },
        10000
      );
  }

  return (
    <Page>
      <div className={classes.wrapper}>
        <form
          className={classes.registerForm}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          {textInputs.map(({ name, label, placeholder }) => (
            <TextField
              key={name}
              id={name}
              label={formatMessage(label)}
              error={errors[name]?.message}
              input={{
                ...register(name),
                placeholder: formatMessage(placeholder),
              }}
            />
          ))}
          {getRegistrationCheckboxes(language).map(
            ({ name, content, className }) => (
              <Checkbox
                key={name}
                id={name}
                input={register(name)}
                className={className}
              >
                <Text className={errors[name] && classes.hasError}>
                  <FormattedMessage {...content} />
                </Text>
              </Checkbox>
            )
          )}
          <Button disabled={isSubmitted && !isValid}>
            <FormattedMessage
              id="signUp:SubmitButton"
              defaultMessage="Create account"
            />
          </Button>
        </form>
        <SocialLogin language={language} />
        <div className={classes.linkRow}>
          <Link to="/sign-in" className="sign-in-link">
            <TextPrimary>
              <FormattedMessage id="signUp:SignIn" defaultMessage="Sign in" />
            </TextPrimary>
          </Link>
        </div>
      </div>
    </Page>
  );
}

Registration.propTypes = {
  language: PropTypes.string,
};
