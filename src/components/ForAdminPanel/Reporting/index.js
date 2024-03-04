import React, { useEffect, useState } from "react";
import { CRow, CCol } from "@coreui/react";
import "@coreui/coreui/scss/coreui-utilities.scss";
import "../Dashboard/_dashboard.scss";
import "./_reporting.scss";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import {
  Button,
  Link,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNotify } from "react-admin";
import http from "../../../utils/http";
import useApiCall from "../../../utils/useApiCall";
import "react-day-picker/dist/style.css";
import { formatForApi } from "../adminUtils";

export default function Reporting({ language }) {
  const [date, setDate] = useState();
  const [file, setFile] = useState();
  const [retailerList, setRetailerList] = useState();
  const [selectedRetailer, setRetailerFilter] = useState(0);
  const apiCall = useApiCall();
  const notify = useNotify();

  useEffect(() => {
    apiCall(
      () => http.get("/api/admin/retailer"),
      (response) => {
        setRetailerList(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  let footer = <p>Please pick date interval.</p>;
  if (date?.to && date?.from) {
    footer = (
      <p>
        You picked from {format(date?.from, "PP")} to {format(date?.to, "PP")}.
      </p>
    );
  }

  function generateReport() {
    const retailerFilter = selectedRetailer
      ? `&retailerIds=${selectedRetailer}`
      : "";
    http
      .get(
        `api/admin/export/carrefour?lang=${language}&dateFrom=${formatForApi(
          date.from
        )}&dateEnd=${formatForApi(date.to)}${retailerFilter}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        setFile(response.data);
      })
      .catch((error) => {
        notify(error?.response?.data?.message || "Error");
      });
  }

  function generateLink() {
    if (!file) return null;
    return window.URL.createObjectURL(file);
  }
  return (
    <CRow className="dashBoardContainer">
      <CCol sm={12}>
        <h2 className="admin-heading">Reporting:</h2>
        <p className="admin-description">
          Please choose a date range in order to generate report
        </p>
        <DayPicker
          captionLayout="dropdown"
          mode="range"
          selected={date}
          onSelect={setDate}
          footer={footer}
        />
        <div style={{ flexShrink: 0, marginBottom: 12, minWidth: 240 }}>
          <FormControl>
            <InputLabel id="retailer-select-label">Retailer</InputLabel>
            <Select
              sx={{ minWidth: 240 }}
              labelId="retailer-select-label"
              id="retailer-label"
              value={selectedRetailer}
              onChange={(value) => {
                setFile(null);
                setRetailerFilter(value.target.value);
              }}
            >
              <MenuItem key={0} value={0}>
                All
              </MenuItem>
              {retailerList &&
                retailerList.map((retailer) => {
                  return (
                    <MenuItem key={retailer.id} value={retailer.id}>
                      {retailer.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>
        <Button
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
          disabled={!date?.to || !date?.from}
          variant="contained"
          onClick={() => generateReport()}
        >
          Generate report
        </Button>

        <Link
          variant="button"
          href={generateLink()}
          target="_blank"
          download="Report.xlsx"
          underline="none"
          disabled={!file}
          sx={{ marginLeft: "15px" }}
        >
          {file ? "Click to download" : "No report"}
        </Link>
      </CCol>
    </CRow>
  );
}

Reporting.propTypes = {
  language: PropTypes.string,
};
