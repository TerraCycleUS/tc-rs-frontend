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
  AutocompleteArrayInput,
  FormDataConsumer,
  required,
} from 'react-admin'
import RichTextEditor from '../../../RichTextEditor'
import http from '../../../../utils/http'
import useApiCall from '../../../../utils/useApiCall'
import { onError } from '../../adminUtils'

export default function CouponEdit() {
  const notify = useNotify()
  const [categories, setCategories] = useState([])
  const [stores, setStores] = useState([])
  const getCategoryApiCall = useApiCall()
  const getStoresApiCall = useApiCall()

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

  const formatCategories = (categoriesToChange, retailer) =>
    categoriesToChange
      ?.filter((category) => category.retailerId === retailer)
      .map((category) => ({
        id: category.id,
        name: category.title,
      }))

  const formatStores = (storesToChange, retailer) =>
    storesToChange
      ?.filter((store) => store.retailerId === retailer)
      .map((store) => ({
        id: store.id,
        name: store.address,
      }))

  const validateCouponEdit = (values) => {
    const errors = {}
    if (!values.requiredAmount) {
      errors.requiredAmount = 'Required amount is required'
    } else if (values.requiredAmount < 1) {
      errors.requiredAmount = 'Required amount should be positive number'
    }

    if (!values.discount) {
      errors.discount = 'Discount is required'
    } else if (values.discount < 0) {
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
      mutationOptions={{ onError: (error) => onError(error, notify) }}
    >
      <SimpleForm validate={validateCouponEdit}>
        <TextInput name="name" source="name" fullWidth />
        <RichTextEditor source="description" />
        <NumberInput name="requiredAmount" source="requiredAmount" fullWidth />
        <NumberInput name="discount" source="discount" fullWidth />
        <NumberInput
          name="minimumPurchaseAmount"
          source="minimumPurchaseAmount"
          fullWidth
        />
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
        <FormDataConsumer>
          {({ formData }) => (
            <>
              <SelectInput
                validate={required()}
                choices={formatCategories(categories, formData?.retailerId)}
                source="categoryId"
                name="categoryId"
              />
              <AutocompleteArrayInput
                validate={required()}
                choices={formatStores(stores, formData?.retailerId)}
                source="storeIds"
                name="storeIds"
              />
            </>
          )}
        </FormDataConsumer>
        <ImageInput
          accept="image/*"
          name="backgroundImage"
          source="backgroundImage"
          fullWidth
          format={formatLogo}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <NumberInput
          min={1}
          max={31}
          name="availableDays"
          source="availableDays"
        />
        <SelectInput
          validate={required()}
          choices={[
            { id: 'ACTIVE', name: 'ACTIVE' },
            { id: 'INACTIVE', name: 'INACTIVE' },
          ]}
          source="status"
          name="status"
        />
        <TextInput name="brand" source="brand" fullWidth />
        <ImageInput
          accept="image/*"
          name="eanCodePicURL"
          source="eanCodePicURL"
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
