import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductMenu from '../../components/ProductMenu'
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
  const user = useSelector((state) => state.user)
  const getCategoryApiCall = useApiCall()
  const getProductsApiCall = useApiCall()
  const dropApiCall = useApiCall()
  const location = useLocation()
  const params = queryString.parse(location.search)
  const navigate = useNavigate()
  const [locationId, setLocationId] = useState()
  const [qrCode, setQrCode] = useState()

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }

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
      () => http.get('/api/category', config),
      (response) => {
        setCategories(response.data)
      },
    )
  }, [])

  useEffect(() => {
    getProductsApiCall(
      () => http.get('/api/waste/getProducts', config),
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
      lastSaved.map((product) => ({ ...product, checked: true })),
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
      () => http.post('/api/waste/dropProducts', toSend, config),
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
    if (!showPop) return ''
    return <ThankYou setShowPop={setShowPop} amount={checkedAmount} />
  }

  return (
    <Page backgroundGrey>
      <BinWrapper>
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
        <ProductMenu
          categories={categories}
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
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
