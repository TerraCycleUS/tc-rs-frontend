import React, { useState } from "react";
import { CRow, CCol } from "@coreui/react";
import "@coreui/coreui/scss/coreui-utilities.scss";
import "../Dashboard/_dashboard.scss";
import "../Reporting/_reporting.scss";
import { Button } from "@mui/material";
import "react-day-picker/dist/style.css";
import { useNotify } from "react-admin";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import http from "../../../utils/http";
import useApiCall from "../../../utils/useApiCall";
import { formatForApi } from "../adminUtils";

export default function PictureExport() {
  const getUserExport = useApiCall();
  const [wasClicked, setWasClicked] = useState(false);
  const [date, setDate] = useState();
  const notify = useNotify();

  let footer = <p>Please pick date interval.</p>;
  if (date?.to && date?.from) {
    footer = (
      <p>
        You picked from {format(date?.from, "PP")} to {format(date?.to, "PP")}.
      </p>
    );
  }

  function generateUserExport() {
    setWasClicked(true);
    getUserExport(
      () =>
        http.get(
          `/api/admin/export/generateUserExport?dateFrom=${formatForApi(
            date.from
          )}&dateEnd=${formatForApi(date.to)}`
        ),
      null,
      (error) => {
        if (error?.response?.data?.errorCode === "prevTaskInProgress")
          notify("Previous export is still generating");
        else notify(error?.response?.data?.message || "Error");
      },
      null,
      { retry: false, message: false }
    );
  }

  return (
    <CRow className="dashBoardContainer">
      <CCol sm={12}>
        <h2 className="admin-heading">Picture export:</h2>
        <p className="admin-description">
          Please choose a date range in order to generate export
        </p>
        <DayPicker
          captionLayout="dropdown"
          mode="range"
          selected={date}
          onSelect={setDate}
          footer={footer}
        />
        <Button
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
          variant="contained"
          disabled={wasClicked || !date?.to || !date?.from}
          onClick={() => generateUserExport()}
        >
          Generate user export
        </Button>
        {wasClicked && (
          <p className="instructions">
            The export is being generated, you will receive an email with the
            link once it is ready.
          </p>
        )}
      </CCol>
    </CRow>
  );
}
