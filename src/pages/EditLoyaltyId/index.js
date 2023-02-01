import React from 'react'
import { useLocation } from 'react-router-dom'
import EditMonoprixLoyaltyId from '../../components/EditMonoprixLoyaltyId'
import EditCarrefourLoyaltyId from '../../components/EditCarrefourLoyaltyId'
import { CARREFOUR_ID, MONOPRIX_ID } from '../../utils/const'

export default function EditLoyaltyId() {
  const location = useLocation()
  const retailer = location?.state?.retailer

  switch (retailer) {
    case MONOPRIX_ID:
      return <EditMonoprixLoyaltyId />
    case CARREFOUR_ID:
      return <EditCarrefourLoyaltyId />
    default:
      return <EditMonoprixLoyaltyId />
  }
}
