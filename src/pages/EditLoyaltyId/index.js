import React from 'react'
import { useLocation } from 'react-router-dom'
import EditMonoprixLoyaltyId from '../../components/EditMonoprixLoyaltyId'
import EditCarrefourLoyaltyId from '../../components/EditCarrefourLoyaltyId'

export default function EditLoyaltyId() {
  const location = useLocation()
  const retailer = location?.state?.retailer

  switch (retailer) {
    case 1:
      return <EditMonoprixLoyaltyId />
    case 2:
      return <EditCarrefourLoyaltyId />
    default:
      return <EditMonoprixLoyaltyId />
  }
}
