import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object, ref } from "yup";
import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "../../components/Button";
import Page from "../../Layouts/Page";
import TextField from "../../components/TextField";
import http from "../../utils/http";
import classes from "./PasswordSetup.module.scss";
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  DEFAULT_REGION,
  PASSWORD_REG,
} from "../../utils/const";
import { detectLanguage } from "../../utils/intl";
import useApiCall from "../../utils/useApiCall";
import { useMessageContext } from "../../context/message";
import { setUser } from "../../actions/user";

const defaultValues = {
  password: "",
  confirm: "",
};

const textInputs = [
  {
    name: "password",
    label: { id: "pwSetup:PasswordLabel", defaultMessage: "Password" },
    placeholder: {
      id: "pwSetup:PasswordPlaceholder",
      defaultMessage: "Enter your password",
    },
    showErrorAsDescription: true,
  },
  {
    name: "confirm",
    label: { id: "pwSetup:ConfirmLabel", defaultMessage: "Confirm Password" },
    placeholder: {
      id: "pwSetup:ConfirmPlaceholder",
      defaultMessage: "Confirm your password",
    },
  },
];

const passwordTextInputs = [
  {
    name: "password",
    label: {
      id: "passwordReset:PasswordLabel",
      defaultMessage: "New Password",
    },
    placeholder: {
      id: "passwordReset:PasswordPlaceholder",
      defaultMessage: "Enter your new password",
    },
    showErrorAsDescription: true,
  },
  {
    name: "confirm",
    label: {
      id: "passwordReset:ConfirmLabel",
      defaultMessage: "Confirm New Password",
    },
    placeholder: {
      id: "passwordReset:ConfirmPlaceholder",
      defaultMessage: "Confirm your new password",
    },
  },
];

export default function PasswordSetup({ forResetPw = false }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = user?.lang || detectLanguage();
  const [, updateMessage] = useMessageContext();
  const lang = AVAILABLE_LANGUAGES[currentLang]
    ? currentLang
    : DEFAULT_LANGUAGE;
  const dispatch = useDispatch();

  const { formatMessage } = useIntl();

  const errorText = formatMessage({
    id: "pwSetup:PasswordError",
    defaultMessage:
      "Password must be at least 8 characters long. Password must contain at least one lowercase character, one uppercase character and one non-alphanumeric character.",
  });

  const schema = object({
    password: string()
      .required(
        formatMessage({
          id: "pwSetup:PasswordRequired",
          defaultMessage: "Password is required.",
        })
      )
      .min(8, errorText)
      .matches(PASSWORD_REG, errorText),
    confirm: string()
      .required(
        formatMessage({
          id: "pwSetup:ConfirmationRequired",
          defaultMessage: "Password confirmation is required.",
        })
      )
      .oneOf(
        [ref("password")],
        formatMessage({
          id: "pwSetup:PasswordMathcError",
          defaultMessage: "Passwords must match",
        })
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const value = watch("password");

  const remapElements = ({
    name,
    label,
    placeholder,
    showErrorAsDescription,
  }) => {
    const error = errors[name]?.message;
    let list = null;
    let className = "";

    if (showErrorAsDescription) {
      list = <CheckList value={value} />;
      className = "no-error";
    }

    return (
      <TextField
        key={name}
        id={name}
        label={formatMessage(label)}
        error={error}
        className={className}
        showErrorMessage={!showErrorAsDescription}
        input={{
          ...register(name),
          placeholder: formatMessage(placeholder),
          type: "password",
        }}
      >
        {list}
      </TextField>
    );
  };

  const submitApiCall = useApiCall();

  const submitCb = () => {
    navigate({
      pathname: "../email-check",
      search: location.search,
    });
  };

  const onSubmit = ({ password }) => {
    const region = sessionStorage.getItem("_region") || DEFAULT_REGION;
    const { name, email, zipcode, messages, privacy, terms } =
      queryString.parse(location.search);
    const data = {
      name,
      email,
      zipcode,
      password,
      sendMarketingMessages: messages,
      privacy,
      terms,
      lang,
      region,
    };

    submitApiCall(() => http.post("/api/user/registration", data), submitCb);
  };

  const setPwSubmitApiCall = useApiCall();

  const setPwSuccessCb = () => {
    updateMessage({
      type: "success",
      text: (
        <FormattedMessage
          id="pwReset:Success"
          defaultMessage="Successful password setup!"
        />
      ),
      onClose: () => navigate("/sign-in"),
    });
  };

  const setPwSubmit = ({ password }) => {
    const params = queryString.parse(location.search);
    setPwSubmitApiCall(
      () =>
        http.post("/api/user/setPassword", {
          resetPasswordToken: params.resetPasswordToken,
          password,
        }),
      setPwSuccessCb
    );
    dispatch(setUser(null));
  };

  return (
    <Page>
      <div className={classes.wrapper}>
        <div>
          <p className={classNames(classes.pwDescription, "my-text")}>
            <FormattedMessage
              id={
                forResetPw
                  ? "passwordReset:setNewPassword"
                  : "pwSetup:Description"
              }
              defaultMessage={
                forResetPw
                  ? "You have successfully confirmed your e-mail address, now please enter your new password:"
                  : "Please choose a password for your account:"
              }
            />
          </p>
          <form onSubmit={handleSubmit(forResetPw ? setPwSubmit : onSubmit)}>
            {forResetPw
              ? passwordTextInputs.map(remapElements)
              : textInputs.map(remapElements)}
            <Button disabled={isSubmitted && !isValid}>
              <FormattedMessage
                id="pwSetup:SubmitButton"
                defaultMessage="Save"
              />
            </Button>
          </form>
        </div>
        <div className={classes.linkRow}>
          <Link
            to="/sign-in"
            data-testid="link-to-sign-in"
            className="sign-in-link"
          >
            <span className="my-text-primary my-color-main">
              <FormattedMessage id="signUp:SignIn" defaultMessage="Sign in" />
            </span>
          </Link>
        </div>
      </div>
    </Page>
  );
}

PasswordSetup.propTypes = {
  forResetPw: PropTypes.bool,
};

function CheckList({ value }) {
  const items = [
    {
      text: {
        id: "pwSetup:LengthTip",
        defaultMessage: "Password must be at least 8 characters long.",
      },
      valid: value.length >= 8,
    },
    {
      text: {
        id: "pwSetup:LowercaseTip",
        defaultMessage:
          "Password must contain at least one lowercase character.",
      },
      valid: /[a-z]+/.test(value),
    },
    {
      text: {
        id: "pwSetup:UppercaseTip",
        defaultMessage:
          "Password must contain at least one uppercase character.",
      },
      valid: /[A-Z]+/.test(value),
    },
    {
      text: {
        id: "pwSetup:CharTip",
        defaultMessage:
          "Password must contain at least one non-alphanumeric character.",
      },
      valid: /[^\w]+/.test(value),
    },
  ];

  return (
    <ul className={classes.checkList}>
      {items.map((item) => (
        <li
          key={item.text.id}
          className={classNames(
            { [classes.invalid]: !item.valid },
            "d-flex align-items-start"
          )}
        >
          <span className="my-text-error mt-0">
            <FormattedMessage {...item.text} />
          </span>
        </li>
      ))}
    </ul>
  );
}

CheckList.propTypes = {
  value: PropTypes.string,
};
