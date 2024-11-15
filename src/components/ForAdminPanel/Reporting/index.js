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

ReportSelector.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.number,
  firstElement: PropTypes.object,
  disableFirst: PropTypes.bool,
};

function ReportSelector({ id, label, options, onChange, value, firstElement, disableFirst }) {
  return (
    <FormControl style={{marginRight: '10px'}}>
      <InputLabel id={`${id}_label`}>{label}</InputLabel>
      <Select
        sx={{ minWidth: 240 }}
        labelId={`${id}_label`}
        id={id}
        value={value}
        onChange={onChange}
      >

        {firstElement && (
          <MenuItem disabled={disableFirst} key={firstElement.id} value={firstElement.id}>
            {firstElement.name}
          </MenuItem>
        )}

        {options?.length &&
          options.map((option) => {
            return (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}


export default function Reporting({ language }) {
  const [date, setDate] = useState();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('Reporting.xlsx');
  const [retailerList, setRetailerList] = useState();
  const [selectedRetailer, setRetailerFilter] = useState(0);
  const [reportType, setReportType] = useState(0);
  const reportTypes = [
    {
      id: 1,
      name: 'Unlocked coupons',
    }, {
      id: 2,
      name: 'Waste products',
    }, {
      id: 3,
      name: 'User reports',
    }
  ];
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

  function downloadReport(url) {
    const retailerFilter = selectedRetailer
      ? `&retailerIds=${selectedRetailer}`
      : "";
    http
      .get(
        `${url}?lang=${language}&dateFrom=${formatForApi(
          date.from
        )}&dateEnd=${formatForApi(date.to)}${retailerFilter}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        const contentDisposition = response.headers['content-disposition'];
        const fileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
        setFileName(fileName);
        setFile(response.data);
      })
      .catch((error) => {
        notify(error?.response?.data?.message || "Error");
      });
  }

  function generateReport() {
    switch (reportType) {
      case 1:
        downloadReport('api/admin/export/carrefour');
        break;
      case 2:
        downloadReport('api/admin/export/waste_product');
        break;
      case 3:
        downloadReport('api/admin/export/user_list_export');
        break;
    }
  }

  function generateLink() {
    if (!file) return null;
    return window.URL.createObjectURL(file);
  }

  const setFileToNull = () => {
    setFile(null);
    setFileName(null);
  }

  const reportTypeOnChange = (value) => {
    setFileToNull();
    setRetailerFilter(0);
    setReportType(Number(value.target.value));
  };

  const retailerOnChange = (value) => {
    setFileToNull();
    setRetailerFilter(Number(value.target.value));
  };

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

          <ReportSelector disableFirst firstElement={{ id: 0, name: 'Type' }} id="report-types"
                          label="Select report type"
                          onChange={reportTypeOnChange} options={reportTypes} value={reportType}/>

          {(reportType === 1) && (<ReportSelector firstElement={{ id: 0, name: 'ALL' }} id="retailer" label="Retailer"
                                                  onChange={retailerOnChange} options={retailerList}
                                                  value={selectedRetailer}/>)}
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
          download={fileName}
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
