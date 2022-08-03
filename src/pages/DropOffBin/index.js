import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import ProductMenu from '../../components/ProductMenu'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import { BinWrapper } from '../../components/Bin'
import DropOffItems from '../../components/DropOffItems'
import classes from './DropOffBin.module.scss'
import DropButton from '../../components/DropButton'
import ThankYou from '../../components/PopUps/ThankYou'

export default function DropOffBin() {
  const [currentCategory, setCurrentCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [checkedAmount, setCheckedAmount] = useState(0)
  const [showPop, setShowPop] = useState(false)
  const [blockBtn, setBlockBtn] = useState(false)
  const user = useSelector((state) => state.user)

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }
  useEffect(() => {
    http
      .get('/api/category', config)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line
      })
  }, [])

  useEffect(() => {
    http
      .get('/api/waste/getProducts', config)
      .then((response) => {
        setProducts(
          response.data.map((product) => ({ ...product, checked: false })),
        )
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line
      })
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
    }
    http
      .post('/api/waste/dropProducts', toSend, config)
      .then(() => {
        setCheckedAmount(
          products.filter((product) => product.checked === true).length,
        )
        setBlockBtn(false)
        setShowPop(true)
        setProducts((lastSaved) =>
          lastSaved.filter((product) => product.checked === false),
        )
      })
      .catch((error) => {
        console.log(error) // eslint-disable-line
        setBlockBtn(false)
      })
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
