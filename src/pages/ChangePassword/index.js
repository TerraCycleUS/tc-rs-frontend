import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object, ref } from "yup";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";

import Button from "../../components/Button";
import Page from "../../Layouts/Page";
import TextField from "../../components/TextField";
import { PASSWORD_REG } from "../../utils/const";
import http from "../../utils/http";
import useApiCall from "../../utils/useApiCall";
import { useMessageContext } from "../../context/message";
import Unmasker from "../../components/Icons/Unmasker";
import classes from "./ChangePassword.module.scss";

const textInputs = [
  {
    name: "current",
    label: { id: "changePassword:Current", defaultMessage: "Current password" },
    placeholder: {
      id: "changePassword:CurrentPlaceholder",
      defaultMessage: "Enter your password",
    },
  },
  {
    name: "next",
    label: { id: "changePassword:Next", defaultMessage: "New password" },
    placeholder: {
      id: "changePassword:NextPlaceholder",
      defaultMessage: "Enter your new password",
    },
  },
  {
    name: "confirm",
    label: {
      id: "changePassword:Confirm",
      defaultMessage: "Confirm new password",
    },
    placeholder: {
      id: "changePassword:ConfirmPlaceholder",
      defaultMessage: "Confirm your new password",
    },
  },
];

export default function ChangePassword() {
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.user);
  const [, updateMessage] = useMessageContext();
  const [masked, setMasked] = React.useState([true, true, true]);
  const defaultValues = {
    current: "",
    next: "",
    confirm: "",
  };
  const { formatMessage } = useIntl();

  const pwErrorMessage = formatMessage({
    id: "changePassword:PasswordError",
    defaultMessage: `Password must be at least 8 characters long, contain at least one lowercase character, one uppercase character and one of the following characters: !#$%&'()*+,-./:;<=>?@^_\`{|}~ and space`,
  });

  const schema = object({
    current: string()
      .required(
        formatMessage({
          id: "changePassword:CurrentRequired",
          defaultMessage: "Current password is required",
        })
      )
      .max(50),
    next: string()
      .required(
        formatMessage({
          id: "changePassword:NextRequired",
          defaultMessage: "New password is required",
        })
      )
      .min(8, pwErrorMessage)
      .matches(PASSWORD_REG, pwErrorMessage),
    confirm: string()
      .required(
        formatMessage({
          id: "changePassword:ConfirmationRequired",
          defaultMessage: "Password confirmation is required",
        })
      )
      .oneOf(
        [ref("next")],
        formatMessage({
          id: "changePassword:PasswordMathcError",
          defaultMessage: "Password must match",
        })
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const apiCall = useApiCall();

  function successCb() {
    updateMessage(
      {
        type: "success",
        text: formatMessage({
          id: "changePassword:SaveSuccess",
          defaultMessage: "Password updated!",
        }),
      },
      10000
    );
  }

  const onSubmit = (data) => {
    const values = {
      oldPassword: data.current,
      newPassword: data.next,
      lang,
    };
    apiCall(() => http.put("/api/user/updatePassword", values), successCb);
  };

  return (
    <Page footer>
      <div className={classes.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {textInputs.map(({ name, label, placeholder }, i) => (
            <TextField
              key={name}
              id={name}
              label={formatMessage(label)}
              error={errors[name]?.message}
              adornment={
                <Unmasker
                  isMasked={masked[i]}
                  onClick={() =>
                    setMasked((prev) => {
                      const nextValue = prev.slice(0);
                      nextValue[i] = !prev[i];
                      return nextValue;
                    })
                  }
                />
              }
              input={{
                ...register(name),
                placeholder: formatMessage(placeholder),
                type: masked[i] ? "password" : "text",
              }}
            />
          ))}
          <Button
            disabled={isSubmitted && !isValid}
            className={classes.submitBtn}
            type="submit"
          >
            <FormattedMessage
              id="changePassword:SubmitButton"
              defaultMessage="Save information"
            />
          </Button>
        </form>
        <Button
          inverted
          type="button"
          className={classes.cancelBtn}
          onClick={() => navigate(-1)}
        >
          <FormattedMessage id="profileEdit:Cancel" defaultMessage="Cancel" />
        </Button>
      </div>
    </Page>
  );
}
