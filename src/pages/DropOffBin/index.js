import React, { useEffect, useState } from 'react'
import { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import createAnimationStyles from '../../components/PageTransition/createAnimationStyles'
import animations from '../../components/PageTransition/animations'
import ProductMenu from '../../components/ProductMenu'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import { BinWrapper } from '../../components/Bin'
import DropOffItems from '../../components/DropOffItems'
import classes from './DropOffBin.module.scss'
import DropButton from '../../components/DropButton'

export default function DropOffBin() {
  const [currentCategory, setCurrentCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState()
  const [checkboxes, setCheckBoxes] = useState([])
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
        console.log(error)
      })
  }, [])

  useEffect(() => {
    http
      .get('/api/waste/getProducts', config)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    initiateCheckboxes()
  }, [products])

  function initiateCheckboxes() {
    if (!products) return
    setCheckBoxes(
      products.map((product) => ({ productId: product.id, checked: false })),
    )
  }

  function selectAll() {
    if (!checkboxes) return
    const newCheckboxes = checkboxes.map((product) => ({
      ...product,
      checked: true,
    }))
    setCheckBoxes(newCheckboxes)
  }

  function drop() {
    console.log('dropped')
  }

  return (
    <Page
      backButton
      backgroundGrey
      title={
        <div className={classes.locationWrapper}>
          <p className={classes.locationName}>Location Name</p>
          <p className={classes.locationAddress}>
            Location address placeholder
          </p>
        </div>
      }
      css={css`
        &.anim-enter-active .page-content {
          ${createAnimationStyles(animations.moveFromBottom)}
        }

        &.anim-exit + .add-product {
          display: none;
        }
      `}
    >
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
          checkBoxes={checkboxes}
          setCheckBoxes={setCheckBoxes}
        />
        <DropButton drop={() => drop()} />
      </BinWrapper>
    </Page>
  )
}
