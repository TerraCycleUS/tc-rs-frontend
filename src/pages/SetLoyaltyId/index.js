import React from 'react'
import { useLocation } from 'react-router-dom'
import SetMonoprixLoyaltyId from '../../components/SetMonoprixLoyaltyId'
import SetCarrefourLoyaltyId from '../../components/SetCarrefourLoyaltyId'

export default function SetLoyaltyId() {
  const location = useLocation()
  const retailer = location?.state?.retailer

  switch (retailer) {
    case 1:
      return <SetMonoprixLoyaltyId />
    case 2:
      return <SetCarrefourLoyaltyId />
    default:
      return <SetMonoprixLoyaltyId />
  }
}
