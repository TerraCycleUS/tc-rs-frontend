import React, { useEffect, useState } from "react";
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

export default function Dashboard() {
  const [dashboardInfo, setDashboardInfo] = useState();
  const getDashboardDataApiCall = useApiCall();

  function getData() {
    return getDashboardDataApiCall(
      () => http.get("/api/admin/dashboard-info"),
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

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {dashboardInfo ? (
        <>
          <p>General</p>
          <CRow className="dashBoardContainer">
            <CCol sm={3}>
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
            <CCol sm={3}>
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
          </CRow>

          {dashboardInfo.retailers.map((retailerInfo) => {return (
            <>
            <p>{retailerInfo.name}</p>
            <CRow className="dashBoardContainer">

              <CCol sm={3}>
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
                <CCol sm={3}>
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
              <CCol sm={3}>
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
              <CCol sm={3}>
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
            </CRow>
            </>
          )})}
        </>
      ) : (
        <div className="loaderWrapper">
          <CircularProgress />
        </div>
      )}
    </>
  );
}
