import React, { useEffect, useState } from 'react'
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  RichTextField,
  ImageField,
  FunctionField,
} from 'react-admin'
import BulkActionButtons from '../../BulkActionButtons'
import useApiCall from '../../../../utils/useApiCall'
import http from '../../../../utils/http'
import { findRetailer } from '../../adminUtils'

export default function CouponList() {
  const [retailers, setRetailers] = useState([])
  const getRetailersApiCall = useApiCall()
  const [categories, setCategories] = useState([])
  const getCategoryApiCall = useApiCall()
  const [stores, setStores] = useState([])
  const getStoresApiCall = useApiCall()

  useEffect(() => {
    getRetailersApiCall(
      () => http.get('/api/retailer'),
      (response) => {
        setRetailers(
          response.data.map((retailer) => ({
            id: retailer.id,
            name: retailer.name,
          })),
        )
      },
      null,
      null,
      { message: false },
    )
  }, [])

  useEffect(() => {
    getCategoryApiCall(
      () => http.get('/api/category'),
      (response) => {
        setCategories(response.data)
      },
    )
  }, [])

  useEffect(() => {
    getStoresApiCall(
      () => http.get('/api/map-items/public'),
      (response) => {
        setStores(response.data)
      },
    )
  }, [])

  function findCategory(categoryId) {
    return categories?.find((retailer) => retailer.id === categoryId)?.title
  }

  function findStores(storeIds) {
    return stores
      ?.filter((store) => storeIds?.some((id) => store.id === id))
      ?.map((store) => store.address)
      ?.join(',\n')
  }

  return (
    <List>
      <Datagrid
        sx={{
          '& span': {
            overflow: 'hidden',
            maxHeight: '200px',
            display: 'inline-block',
          },
        }}
        bulkActionButtons={<BulkActionButtons />}
        rowClick="edit"
      >
        <TextField source="id" />
        <TextField source="name" />
        <RichTextField source="description" />
        <NumberField source="requiredAmount" />
        <FunctionField
          source="discount"
          render={(record) => `${record.discount}€`}
        />
        <FunctionField
          source="minimumPurchaseAmount"
          render={(record) => `${record.minimumPurchaseAmount}€`}
        />
        <ImageField source="brandLogo" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <ImageField source="backgroundImage" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <FunctionField
          source="retailerId"
          render={(record) => findRetailer(record.retailerId, retailers)}
        />
        <FunctionField
          source="categoryId"
          render={(record) => findCategory(record.categoryId)}
        />
        <FunctionField
          source="storeIds"
          render={(record) => findStores(record.storeIds)}
        />
        <NumberField source="availableDays" />
        <TextField source="status" />
      </Datagrid>
    </List>
  )
}
