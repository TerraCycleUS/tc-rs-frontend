import React from "react";
import { useLocation } from "react-router-dom";
import SetMonoprixLoyaltyId from "../../components/SetMonoprixLoyaltyId";
import SetCarrefourLoyaltyId from "../../components/SetCarrefourLoyaltyId";
import { CARREFOUR_ID, MONOPRIX_ID } from "../../utils/const";

export default function SetLoyaltyId() {
  const location = useLocation();
  const retailer = location?.state?.retailer;

  switch (retailer) {
    case MONOPRIX_ID:
      return <SetMonoprixLoyaltyId />;
    case CARREFOUR_ID:
      return <SetCarrefourLoyaltyId />;
    default:
      return <SetMonoprixLoyaltyId />;
  }
}
