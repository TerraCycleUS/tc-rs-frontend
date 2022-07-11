import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import Text from '../../components/Text'
import Button from '../../components/Button'
import 'react-html5-camera-photo/build/css/index.css'
import StyledSelect from '../../components/StyledSelect'
import http from '../../utils/http'
import extractErrorMessage from '../../utils/extractErrorMessage'
import useMessage from '../../utils/useMessage'
import BackdropMessage from '../../components/Message/BackdropMessage'
import ItemSaved from '../../components/PopUps/ItemSaved'

export default function SaveItem() {
  const [message, updateMessage, clear] = useMessage()
  const [show, setShow] = useState()
  const [brands, setBrands] = useState()
  const [categories, setCategories] = useState()
  const [currentCategory, setCurrentCategory] = useState()
  const [currentBrand, setCurrentBrand] = useState()
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

  const { handleSubmit } = useForm({
    mode: 'onTouched',
  })

  function CategoryChange(category) {
    setCurrentCategory(category)
    setCurrentBrand({})
  }

  const onSubmit = ({ photo, category, brand }) => {
    const data = {
      photo,
      category,
      brand,
    }

    http
      .post('/api/user/save-item', data)
      .then(() => {
        setShow(true)
      })
      .catch((res) => {
        updateMessage({ type: 'error', text: extractErrorMessage(res) }, 10000)
      })
      .then(() => {
        // TODO delete this then block when api will be done
        setShow(true)
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
      <WrapperForm onSubmit={handleSubmit(onSubmit)}>
        {/* <CameraView /> */}
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
        <Button className="save-btn">
          <FormattedMessage id="saveItem:Save" defaultMessage="Save" />
        </Button>
      </WrapperForm>
      {show ? <ItemSaved setShow={setShow} /> : ''}
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
