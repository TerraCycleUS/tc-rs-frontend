import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import queryString from 'query-string'
import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import SortingPanel from '../../components/SortingPanel'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import { BinWrapper } from '../../components/Bin'
import DropOffItems from '../../components/DropOffItems'
import classes from './DropOffBin.module.scss'
import DropButton from '../../components/DropButton'
import ThankYou from '../../components/PopUps/ThankYou'
import useApiCall from '../../utils/useApiCall'

export default function DropOffBin() {
  const [currentCategory, setCurrentCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [checkedAmount, setCheckedAmount] = useState(0)
  const [showPop, setShowPop] = useState(false)
  const [blockBtn, setBlockBtn] = useState(true)
  const getCategoryApiCall = useApiCall()
  const getProductsApiCall = useApiCall()
  const dropApiCall = useApiCall()
  const location = useLocation()
  const params = queryString.parse(location.search)
  const navigate = useNavigate()
  const [locationId, setLocationId] = useState()
  const [qrCode, setQrCode] = useState()

  useEffect(() => {
    if (products?.filter((product) => product.checked === true).length > 0) {
      setBlockBtn(false)
    } else {
      setBlockBtn(true)
    }
  }, [products])

  useEffect(() => {
    if (Object.keys(params).length === 0) navigate('/map')
    setLocationId(params?.id)
    setQrCode(params?.qrCode)
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
    getProductsApiCall(
      () => http.get('/api/waste/getProducts'),
      (response) => {
        setProducts(
          response.data.map((product) => ({ ...product, checked: false })),
        )
      },
    )
  }, [])

  function selectAll() {
    if (!products) return
    setProducts((lastSaved) =>
      lastSaved.map((product) => ({
        ...product,
        checked:
          product.categoryId === currentCategory || currentCategory === 'All',
      })),
    )
  }

  function drop() {
    if (!products) return
    setBlockBtn(true)
    const toSend = {
      ids: products
        .filter((product) => product.checked === true)
        .map((product) => product.id)
        .join(','),
      locationId,
      verificationCode: qrCode,
    }
    dropApiCall(
      () => http.post('/api/waste/dropProducts', toSend),
      () => {
        setCheckedAmount(
          products.filter((product) => product.checked === true).length,
        )
        setBlockBtn(false)
        setShowPop(true)
        setProducts((lastSaved) =>
          lastSaved.filter((product) => product.checked === false),
        )
      },
    )
  }

  function renderPop() {
    if (!showPop) return null
    return <ThankYou setShowPop={setShowPop} amount={checkedAmount} />
  }

  return (
    <Page backgroundGrey innerClassName={classes.page}>
      <BinWrapper>
        <p
          className={classNames(
            'my-text',
            'text-center',
            'my-color-textPrimary',
            classes.description,
          )}
        >
          <FormattedMessage
            id="dropOffBin:Description"
            defaultMessage="Select the items you want to drop off in the in-store kiosk"
          />
        </p>
        <div className={classes.listAll}>
          <p className={classes.text}>
            <FormattedMessage
              id="dropOffBin:List"
              defaultMessage="List of items"
            />
          </p>
          <button
            className={classes.button}
            type="button"
            onClick={() => {
              selectAll()
            }}
          >
            <FormattedMessage
              id="dropOffBin:Select"
              defaultMessage="Select all"
            />
          </button>
        </div>
        <SortingPanel
          types={categories}
          currentType={currentCategory}
          setCurrentType={setCurrentCategory}
        />
        <DropOffItems
          currentCategory={currentCategory}
          setProducts={setProducts}
          products={products}
        />
        <DropButton disabled={blockBtn} drop={() => drop()} />
        {renderPop()}
      </BinWrapper>
    </Page>
  )
}
