import React, { useEffect, useState } from 'react'
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  ImageInput,
  ImageField,
  SelectInput,
} from 'react-admin'
import RichTextEditor from '../../../RichTextEditor'
import http from '../../../../utils/http'
import { useWatch } from 'react-hook-form'
import useApiCall from '../../../../utils/useApiCall'

export default function CouponEdit() {
  const notify = useNotify()
  const [retailers, setRetailers] = useState([])
  const getRetailersApiCall = useApiCall()
  const [currentRetailer, setCurrentRetailer] = useState()
  const [categories, setCategories] = useState([])
  const getCategoryApiCall = useApiCall()
  const country = useWatch('retailerId' )
  console.log(country)
  // const retailerCategories = categories.filter(category => category.retailerId === ).map(category => ({id: category.id, name: category.name}))

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

  const onError = (error) => {
    notify(`${error.body.errors}`)
  }

  const validateCouponEdit = (values) => {
    const errors = {}
    if (!values.requiredAmount) {
      errors.requiredAmount = 'Required amount is required'
    } else if (values.requiredAmount < 1) {
      errors.requiredAmount = 'Required amount should be positive number'
    }

    if (!values.discount) {
      errors.discount = 'Discount is required'
    } else if (values.discount < 1) {
      errors.discount = 'Discount should be positive number'
    } else if (values.discount >= 100) {
      errors.discount = 'Discount should be less then 100'
    }
    return errors
  }

  return (
    <Edit
      sx={{
        '& .MuiPaper-root, MuiPaper-elevation, RaEdit-card': {
          overflow: 'visible',
        },
      }}
      mutationMode="pessimistic"
      mutationOptions={{ onError }}
    >
      <SimpleForm validate={validateCouponEdit}>
        <TextInput name="name" source="name" fullWidth />
        <RichTextEditor source="description" />
        <NumberInput name="requiredAmount" source="requiredAmount" fullWidth />
        <NumberInput name="discount" source="discount" fullWidth />
        <ImageInput
          accept="image/*"
          name="brandLogo"
          source="brandLogo"
          fullWidth
          format={formatLogo}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <DateInput name="startDate" source="startDate" fullWidth />
        <DateInput name="endDate" source="endDate" fullWidth />
        <SelectInput
          choices={retailers}
          source="retailerId"
          name="retailerId"
          onChange={(e) => console.log(e)}
        />
        {/*<SelectInput*/}
        {/*  choices={retailerCategories}*/}
        {/*  source="categoryId"*/}
        {/*  name="categoryId"*/}
        {/*/>*/}
        <ImageInput
          accept="image/*"
          name="backgroundImage"
          source="backgroundImage"
          fullWidth
          format={formatLogo}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  )
}

function formatLogo(value) {
  if (!value || typeof value === 'string') {
    return { url: value }
  }
  return value
}
