import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Page from "../../Layouts/Page";
import Button from "../../components/Button";
import classes from "./RetailerListPage.module.scss";
import useApiCall from "../../utils/useApiCall";
import http from "../../utils/http";
import RetailerList from "../../components/RetailerList";
import { MONOPRIX_ID } from "../../utils/const";

export default function RetailerListPage() {
  const [retailers, setRetailers] = useState([]);
  const getMyRetailersApiCall = useApiCall();

  useEffect(() => {
    getMyRetailersApiCall(
      () => http.get("/api/retailer/my-retailers"),
      (response) => {
        response.data.forEach((item) => {
          item.disabled = item.id === MONOPRIX_ID;
        });
        setRetailers(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  return (
    <Page backgroundGrey noSidePadding>
      <h6
        className={classNames(
          classes.yourRetailers,
          "my-text-primary my-color-textPrimary"
        )}
      >
        <FormattedMessage
          id="retailerList:YourRetailers"
          defaultMessage="Your retailers"
        />
      </h6>
      <RetailerList retailers={retailers} to="../retailer-id-edit" />
      <Link
        className={classes.addMore}
        data-testid="add-retailer"
        to="/registration/select-retailer?fromProfile=true"
      >
        <Button>
          <FormattedMessage
            id="retailerList:AddMore"
            defaultMessage="Add more"
          />
        </Button>
      </Link>
    </Page>
  );
}
