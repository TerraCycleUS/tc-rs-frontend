import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import Page from "../../Layouts/Page";
import classes from "./RetailerListPage.module.scss";
import useApiCall from "../../utils/useApiCall";
import http from "../../utils/http";
import RetailerList from "../../components/RetailerList";

export default function RetailerListPage() {
  const [retailers, setRetailers] = useState([]);
  const getMyRetailersApiCall = useApiCall();

  const successHandler = ([
    { data: myRetailers },
    { data: publicRetailers },
  ]) => {
    const result = publicRetailers.map((item) => {
      const myRetailer = myRetailers.find(({ id }) => id === item.id);
      return {
        ...item,
        ...(myRetailer || {}),
        active: !!myRetailer,
      };
    });
    result.sort((a, b) => {
      if (a.active && !b.active) {
        return -1;
      } else if (!a.active && b.active) {
        return 1;
      }
      return 0;
    });
    setRetailers(result);
  };

  useEffect(() => {
    getMyRetailersApiCall(
      () =>
        Promise.all([
          http.get("/api/retailer/my-retailers"),
          http.get("/api/retailer/public-retailers"),
        ]),
      successHandler,
      null,
      null,
      { message: false }
    );
  }, []);

  return (
    <Page backgroundGrey noSidePadding innerClassName={classes.page}>
      <h6
        className={classNames(
          classes.yourRetailers,
          "my-text-primary my-color-textPrimary text-center"
        )}
      >
        <FormattedMessage
          id="retailerList:YourRetailers"
          defaultMessage="Your retailers"
        />
      </h6>
      <p
        className={classNames(
          "my-text my-color-textPrimary text-center",
          classes.subheader
        )}
      >
        <FormattedMessage
          id="retailerList:subheader"
          defaultMessage="Add your customer ID and discover other available programs"
        />
      </p>
      <RetailerList
        retailers={retailers}
        to="../retailer-id-edit"
        fromProfile
      />
    </Page>
  );
}
