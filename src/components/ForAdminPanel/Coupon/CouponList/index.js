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
      () => http.get('/api/map-items'),
      (response) => {
        setStores(response.data)
      },
    )
  }, [])

  function findRetailer(retailerId) {
    return retailers?.find((retailer) => retailer.id === retailerId)?.name
  }

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
        <ImageField source="brandLogo" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <ImageField source="backgroundImage" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        {/* TODO display words instead of numbers */}
        <FunctionField
          source="retailerId"
          render={(record) => findRetailer(record.retailerId)}
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
      </Datagrid>
    </List>
  )
}
