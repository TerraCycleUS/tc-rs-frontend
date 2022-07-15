import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import Text from '../../components/Text'
import Button from '../../components/Button'
import StyledSelect from '../../components/StyledSelect'
import http from '../../utils/http'
import extractErrorMessage from '../../utils/extractErrorMessage'
import useMessage from '../../utils/useMessage'
import BackdropMessage from '../../components/Message/BackdropMessage'
import ItemSaved from '../../components/PopUps/ItemSaved'
import CameraView from '../../components/CameraView'

export default function SaveItem() {
  const [message, updateMessage, clear] = useMessage()
  const [showPop, setShowPop] = useState(false)
  const [brands, setBrands] = useState()
  const [categories, setCategories] = useState()
  const [currentCategory, setCurrentCategory] = useState()
  const [currentBrand, setCurrentBrand] = useState()
  const [photo, setPhoto] = useState()
  const user = useSelector((state) => state.user)
  const config = {
    headers: {
      Authorization: `Bearer ${user.authorization}`,
    },
  }
  useEffect(() => {
    http
      .get('/api/category', config)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (currentCategory) {
      http
        .get(`/api/category/${currentCategory?.value}/brands`, config)
        .then((response) => {
          setBrands(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [currentCategory])

  function checkForm() {
    return !(photo && currentCategory && currentBrand)
  }

  function CategoryChange(category) {
    setCurrentCategory(category)
    setCurrentBrand(null)
  }

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url)
    const buf = await res.arrayBuffer()
    return new File([buf], filename, { type: mimeType })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    let binaryImage = await urlToFile(photo, 'product.jpeg', 'image/jpeg')
    // TODO to send binary image instead when back will be ready
    binaryImage =
      'https://www.laroche-posay.ua/-/media/project/loreal/brand-sites/lrp/emea/ua/products/effaclar/effaclar-k-plus/larocheposayfacecareeffaclark30ml3337872419638front.png'
    const data = {
      picture: binaryImage,
      brandId: currentBrand.value,
      categoryId: currentCategory.value,
    }
    http
      .post('/api/waste/addProduct', data, config)
      .then(() => {
        setShowPop(true)
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
  }

  return (
    <Page
      backButton
      title={
        <FormattedMessage id="saveItem:Title" defaultMessage="Item set-up" />
      }
      steps="1/2 "
    >
      {message ? (
        <BackdropMessage onClose={clear} type={message.type}>
          {message.text}
        </BackdropMessage>
      ) : null}
      <WrapperForm onSubmit={onSubmit}>
        <CameraView setPhoto={setPhoto} />
        <Text className="description">
          <FormattedMessage
            id="saveItem:Description"
            defaultMessage="Please provide details of your item below:"
          />
        </Text>
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
          onChange={(category) => setCurrentBrand(category)}
          placeholder={
            <FormattedMessage id="saveItem:Brand" defaultMessage="Brand" />
          }
          value={currentBrand}
        />
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

  .save-btn {
    margin-top: 10px;
  }
`
