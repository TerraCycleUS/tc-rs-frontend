import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object, boolean } from "yup";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import PropTypes from "prop-types";

import Text, { TextPrimary } from "../../components/Text";
import Page from "../../Layouts/Page";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import classes from "./EmailSetup.module.scss";
import { getRegistrationCheckboxes } from "../Registration/registrationUtils";
import Checkbox from "../../components/Checkbox";
import { defaultRegistrationValues } from "../../utils/const";
import { useMessageContext } from "../../context/message";

const textInputs = [
  {
    name: "email",
    label: { id: "emailSetup:EmailLabel", defaultMessage: "Email" },
    placeholder: {
      id: "emailSetup:EmailPlaceholder",
      defaultMessage: "Enter your email address",
    },
  },
  {
    name: "zipcode",
    label: { id: "emailSetup:ZipLabel", defaultMessage: "Postcode" },
    placeholder: {
      id: "emailSetup:ZipPlaceholder",
      defaultMessage: "Enter your Postcode",
    },
  },
];

export default function EmailSetup({ language }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    email: defaultEmail,
    sessionId,
    socialProvider,
  } = queryString.parse(location.search);
  const { formatMessage } = useIntl();
  const apiCall = useApiCall();
  const [, updateMessage] = useMessageContext();

  const schema = object({
    email: string()
      .email(
        <FormattedMessage
          id="signUp:EmailInvalid"
          defaultMessage="Email must be a valid Email"
        />
      )

      .max(50)
      .when("$defaultEmail", (value, schemaProp, { context }) => {
        return context.defaultEmail
          ? schemaProp
          : schemaProp.required(
              <FormattedMessage
                id="signUp:EmailRequired"
                defaultMessage="Email is required."
              />
            );
      }),
    zipcode: string(
      <FormattedMessage
        id="signUp:PostCodeRequired"
        defaultMessage="Post Code is required."
      />
    )
      .required()
      .max(30),
    terms: boolean().oneOf([true]),
    privacy: boolean().oneOf([true]),
    messages: boolean(),
  });

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

  const submitHandler = (data) => {
    apiCall(
      () =>
        http.post("/api/user/updateSocialProfile", {
          ...data,
          session_id: sessionId,
        }),
      (response) =>
        navigate({
          pathname: "/registration/email-check",
          search: queryString.stringify({
            email: response.data.email,
            socialProvider,
          }),
        })
    );
  };

  const defaultValues = defaultEmail
    ? {
        ...defaultRegistrationValues,
        email: defaultEmail,
      }
    : defaultRegistrationValues;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    context: { defaultEmail },
  });

  const allowedInputs = defaultEmail ? [textInputs[1]] : textInputs;

  return (
    <Page>
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit(submitHandler, onError)}>
          <Text className={classes.description}>
            {!defaultEmail ? (
              <FormattedMessage
                id="emailSetup:Description"
                defaultMessage="Please enter your email address:"
              />
            ) : (
              <FormattedMessage
                id="emailSetup:DescriptionZipOnly"
                defaultMessage="Please enter your postcode:"
              />
            )}
          </Text>
          {allowedInputs.map(({ name, label, placeholder }) => (
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
          <Button type="submit" disabled={isSubmitted && !isValid}>
            <FormattedMessage
              id="emailSetup:SubmitButton"
              defaultMessage="Save"
            />
          </Button>
        </form>
        <div className={classes.linkRow}>
          <Link data-testid="sign-in" to="/sign-in" className="sign-in-link">
            <TextPrimary>
              <FormattedMessage id="signUp:SignIn" defaultMessage="Sign in" />
            </TextPrimary>
          </Link>
        </div>
      </div>
    </Page>
  );
}

EmailSetup.propTypes = {
  language: PropTypes.string,
};
