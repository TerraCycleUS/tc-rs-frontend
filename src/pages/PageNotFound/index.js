import React from "react";
import classNames from "classnames";
import Page from "../../Layouts/Page";
import classes from "./PageNotFound.module.scss";

export default function PageNotFound() {
  return (
    <Page className={classes.wrapper} innerClassName={classes.innerContainer}>
      <p className={classes.number}>404</p>
      <h2 className={classNames(classes.text, "my-text-h2")}>Page not found</h2>
    </Page>
  );
}
