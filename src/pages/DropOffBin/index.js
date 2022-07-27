import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { css } from 'styled-components'
import { useSelector } from 'react-redux'
import createAnimationStyles from '../../components/PageTransition/createAnimationStyles'
import animations from '../../components/PageTransition/animations'
import ProductMenu from '../../components/ProductMenu'
import Page from '../../Layouts/Page'
import http from '../../utils/http'
import { BinWrapper } from '../../components/Bin'
import DropOffItems from '../../components/DropOffItems'

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
    console.log(checkboxes)
  }, [products])

  function initiateCheckboxes() {
    if (!products) return
    setCheckBoxes(
      products.map((product) => ({ productId: product.id, checked: false })),
    )
  }

  return (
    <Page
      backgroundGrey
      title={
        <FormattedMessage
          id="recyclingBin:Title"
          defaultMessage="Recycling bin"
        />
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
      </BinWrapper>
    </Page>
  )
}
