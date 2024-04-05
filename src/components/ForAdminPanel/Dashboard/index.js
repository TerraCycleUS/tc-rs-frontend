import React, { useEffect, useState, Fragment } from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import "@coreui/coreui/scss/coreui-utilities.scss";
import "./_dashboard.scss";
import CircularProgress from "@mui/material/CircularProgress";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import http from "../../../utils/http";
import useApiCall from "../../../utils/useApiCall";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { formatForApi } from "../adminUtils";
import { DayPicker } from "react-day-picker";
import { Button } from "@mui/material";

export default function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState();
  const [date, setDate] = useState();
  const getDashboardDataApiCall = useApiCall();

  function getData() {
    let dateFilter = '';
    if(date && date.from && date.to){
      dateFilter = `?dateFrom=${formatForApi(date.from)}&dateEnd=${formatForApi(date.to)}`;
    }

    return getDashboardDataApiCall(
      () => http.get(`/api/admin/dashboard-info${dateFilter}`),
      (response) => {
        setDashboardInfo(response.data);
      },
      null,
      null,
      { message: false }
    );
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    document.addEventListener("refresh", getData);
    return () => {
      document.removeEventListener("refresh", getData);
    };
  }, []);

  let footer = <p>Please pick date interval.</p>;
  if (date?.to && date?.from) {
    footer = (
      <p>
        You picked from {format(date?.from, "PP")} to {format(date?.to, "PP")}.
      </p>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {dashboardInfo ? (
        <>
          <p className="mt-4 title">Total Recycle+Save</p>
          <CRow className="dashBoardContainer">
            <CCol sm={2}>
              <CWidgetStatsA
                className="mb-4"
                color="primary"
                value={
                  <div className="iconAlign">
                    <div className="fs-4 fw-semibold">
                      {dashboardInfo.userCounter}
                    </div>
                    <PeopleIcon
                      sx={{ fontSize: "36px", marginRight: "18px" }}
                    />
                  </div>
                }
                title={<h2>Registered users</h2>}
              />
            </CCol>
            <CCol sm={2}>
              <CWidgetStatsA
                className="mb-4"
                color="warning"
                value={
                  <div className="iconAlign">
                    <div className="fs-4 fw-semibold">
                      {dashboardInfo.userCommonCount}
                    </div>
                    <QrCodeScannerIcon
                      sx={{ fontSize: "36px", marginRight: "18px" }}
                    />
                  </div>
                }
                title={<h2>Multiple retailer users</h2>}
              />
            </CCol>
            <CCol sm={2}>
              <CWidgetStatsA
                className="mb-4"
                color="warning"
                value={
                  <div className="iconAlign">
                    <div className="fs-4 fw-semibold">
                      {dashboardInfo.productCounter}
                    </div>
                    <QrCodeScannerIcon
                      sx={{ fontSize: "36px", marginRight: "18px" }}
                    />
                  </div>
                }
                title={<h2>Products scanned</h2>}
              />
            </CCol>
            <CCol sm={2}>
              <CWidgetStatsA
                className="mb-4"
                color="danger"
                value={
                  <div className="iconAlign">
                    <div className="fs-4 fw-semibold">
                      {dashboardInfo.droppedProductCounter}
                    </div>
                    <DeleteIcon
                      sx={{ fontSize: "36px", marginRight: "18px" }}
                    />
                  </div>
                }
                title={<h2>Products dropped</h2>}
              />
            </CCol>
            <CCol sm={2}>
              <CWidgetStatsA
                className="mb-4"
                color="success"
                value={
                  <div className="iconAlign">
                    <div className="fs-4 fw-semibold">
                      {dashboardInfo.exchangedProductCounter}
                    </div>
                    <CurrencyExchangeIcon
                      sx={{ fontSize: "36px", marginRight: "18px" }}
                    />
                  </div>
                }
                title={<h2>Products exchanged</h2>}
              />
            </CCol>
            <CCol sm={2}>
              <CWidgetStatsA
                className="mb-4"
                color="info"
                value={
                  <div className="iconAlign">
                    <div className="fs-4 fw-semibold">
                      {dashboardInfo.unlockedCouponCounter}
                    </div>
                    <LockOpenIcon
                      sx={{ fontSize: "36px", marginRight: "18px" }}
                    />
                  </div>
                }
                title={<h2>Coupons unlocked</h2>}
              />
            </CCol>
          </CRow>

          {dashboardInfo?.retailers?.map((retailerInfo, index) => (
            <Fragment key={`${retailerInfo?.name}-${index}`}>
              <p className="title">{retailerInfo.name}</p>
              <CRow className="dashBoardContainer">
                <CCol sm={2}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={
                      <div className="iconAlign">
                        <div className="fs-4 fw-semibold">
                          {retailerInfo.user_count}
                        </div>
                        <PeopleIcon
                          sx={{ fontSize: "36px", marginRight: "18px" }}
                        />
                      </div>
                    }
                    title={<h2>Registred users</h2>}
                  />
                </CCol>
                <CCol sm={2}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value={
                      <div className="iconAlign">
                        <div className="fs-4 fw-semibold">
                          {retailerInfo.dropped_products_count}
                        </div>
                        <DeleteIcon
                          sx={{ fontSize: "36px", marginRight: "18px" }}
                        />
                      </div>
                    }
                    title={<h2>Products dropped</h2>}
                  />
                </CCol>
                <CCol sm={2}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    value={
                      <div className="iconAlign">
                        <div className="fs-4 fw-semibold">
                          {retailerInfo.exchanged_products_count}
                        </div>
                        <CurrencyExchangeIcon
                          sx={{ fontSize: "36px", marginRight: "18px" }}
                        />
                      </div>
                    }
                    title={<h2>Products exchanged</h2>}
                  />
                </CCol>
                <CCol sm={2}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={
                      <div className="iconAlign">
                        <div className="fs-4 fw-semibold">
                          {retailerInfo.unlocked_coupons_count}
                        </div>
                        <LockOpenIcon
                          sx={{ fontSize: "36px", marginRight: "18px" }}
                        />
                      </div>
                    }
                    title={<h2>Coupons unlocked</h2>}
                  />
                </CCol>
              </CRow>
            </Fragment>
          ))}

          <p className="admin-description">
            Please choose a date range
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
              width: "150px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
            disabled={!date?.to || !date?.from}
            variant="contained"
            onClick={() => getData()}
          >
            Set date filter
          </Button>
        </>
      ) : (
        <div className="loaderWrapper">
          <CircularProgress/>
        </div>
      )}
    </>
  );
}
