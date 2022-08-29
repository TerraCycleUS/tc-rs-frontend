import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Page from '../../Layouts/Page'
import Text from '../../components/Text'
import Button from '../../components/Button'
import StyledSelect from '../../components/StyledSelect'
import http from '../../utils/http'
import ItemSaved from '../../components/PopUps/ItemSaved'
import TextField from '../../components/TextField'
import CameraView from '../../components/CameraView'
import useApiCall from '../../utils/useApiCall'

export default function SaveItem() {
  const location = useLocation()
  const values = location.state
  const [showPop, setShowPop] = useState(false)
  const [brands, setBrands] = useState()
  const [categories, setCategories] = useState(values?.categories)
  const [currentCategory, setCurrentCategory] = useState(
    values?.currentCategory,
  )
  const [currentBrand, setCurrentBrand] = useState(values?.currentBrand)
  const [withBrandReset, setWithBrandReset] = useState(!values?.currentBrand)
  const [fromScanner, setFromScanner] = useState(values?.fromScanner)
  const [photo, setPhoto] = useState()
  const [otherBrandValue, setOtherBrandValue] = useState(
    values?.otherBrandValue || '',
  )
  const [wasClicked, setWasClicked] = useState(false)
  const user = useSelector((state) => state.user)
  const { formatMessage } = useIntl()
  const getCategoryApiCall = useApiCall()
  const getBrandsApiCall = useApiCall()

  const other = formatMessage({
    id: 'saveItem:Other',
    defaultMessage: 'Other',
  })
  const otherBrand = { id: -1, name: other }

  const sendFileConfig = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
      'Content-Type': 'multipart/form-data',
    },
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }
  useEffect(() => {
    if (categories) return

    getCategoryApiCall(
      () => http.get('/api/category', config),
      (response) => {
        setCategories(response.data)
      },
    )
  }, [])

  useEffect(() => {
    if (currentCategory) {
      getBrandsApiCall(
        () =>
          http.get(`/api/category/${currentCategory?.value}/brands`, config),
        (response) => {
          const originalData = response.data
          originalData.push(otherBrand)
          setBrands(originalData)
        },
      )
    }
  }, [currentCategory])

  function checkForm() {
    if (isNotOtherBrand())
      return !(photo && currentCategory && currentBrand && !wasClicked)
    return !(
      photo &&
      currentCategory &&
      currentBrand &&
      otherBrandValue &&
      !wasClicked
    )
  }

  function PhotoChange(picture) {
    setWasClicked(false)
    setPhoto(picture)
  }

  function CategoryChange(category) {
    setWasClicked(false)
    setCurrentCategory(category)
    setFromScanner(false)
    if (withBrandReset) {
      setCurrentBrand(null)
    }
  }

  function BrandChange(brand) {
    setWasClicked(false)
    setCurrentBrand(brand)
    setWithBrandReset(true)
    setFromScanner(false)
  }

  function OtherBrandChange(otherValue) {
    setWasClicked(false)
    setOtherBrandValue(otherValue)
  }

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url)
    const buf = await res.arrayBuffer()
    return new File([buf], filename, { type: mimeType })
  }

  const apiCall = useApiCall()

  const successCb = () => {
    setShowPop(true)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setWasClicked(true)
    const binaryImage = await urlToFile(photo, 'product.jpeg', 'image/jpeg')
    const formData = new FormData()
    formData.append('file', binaryImage)

    let brandName
    let brandId
    if (isNotOtherBrand()) {
      brandId = currentBrand.value
    } else {
      brandName = otherBrandValue
    }

    const data = {
      picture: '',
      brandId,
      categoryId: currentCategory.value,
      brandName,
    }
    apiCall(
      () =>
        http
          .post('/api/upload/product', formData, sendFileConfig)
          .then((response) => {
            data.picture = response.data.name
            return http.post('/api/waste/addProduct', data, config)
          }),
      successCb,
    )
  }

  function isNotOtherBrand() {
    return currentBrand?.value !== -1
  }

  function renderOtherBrandInput() {
    if (isNotOtherBrand()) return ''
    return (
      <TextField
        className="other-input"
        id="other-brand"
        input={{
          placeholder: formatMessage({
            id: 'saveItem:OtherPlaceholder',
            defaultMessage: 'Please enter the brand',
          }),
          onChange: (e) => OtherBrandChange(e.target.value),
          value: otherBrandValue,
        }}
      />
    )
  }

  let description = {
    id: 'saveItem:Description',
    defaultMessage: 'Please manually fill out the fields below:',
  }

  if (fromScanner) {
    if (currentBrand && currentCategory) {
      description = {
        id: 'saveItem:DescriptionIdSuccess',
        defaultMessage:
          'Automatic product identification done. Please find the details of your item below:',
      }
    } else {
      description = {
        id: 'saveItem:DescriptionIdFail',
        defaultMessage:
          'We couldn’t identify your item! Please manually fill out the fields below:',
      }
    }
  }

  return (
    <Page>
      <WrapperForm onSubmit={onSubmit}>
        <CameraView
          imageSrc={values}
          setPhoto={PhotoChange}
          goTo="../take-photo"
          valuesToSave={{ currentCategory, currentBrand, otherBrandValue }}
        />
        <Text className="description">{formatMessage(description)}</Text>
        <StyledSelect
          options={categories?.map(({ id, title }) => ({
            value: id,
            label: title,
          }))}
          onChange={(category) => CategoryChange(category)}
          placeholder={
            <FormattedMessage
              id="saveItem:Category"
              defaultMessage="Category"
            />
          }
          value={currentCategory}
        />
        <StyledSelect
          options={brands?.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          onChange={(brand) => BrandChange(brand)}
          placeholder={
            <FormattedMessage id="saveItem:Brand" defaultMessage="Brand" />
          }
          value={currentBrand}
          noOptionsMessage={() =>
            formatMessage({
              id: 'saveItem:SelectCategoryFirst',
              defaultMessage: 'Please select category first',
            })
          }
        />
        {renderOtherBrandInput()}
        <Button disabled={checkForm()} className="save-btn">
          <FormattedMessage id="saveItem:Save" defaultMessage="Save" />
        </Button>
      </WrapperForm>
      {showPop ? <ItemSaved setShow={setShowPop} /> : ''}
    </Page>
  )
}

export const WrapperForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .description {
    margin-bottom: 30px;
    text-align: center;
    color: ${({ theme }) => theme.textBlack};
  }

  .other-input {
    width: 100%;
    margin-bottom: 25px;
  }

  .save-btn {
    margin-top: 10px;
  }
`
