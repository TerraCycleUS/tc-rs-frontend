import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import SortingPanel from '../../components/SortingPanel'
import { ReactComponent as AddProduct } from '../../assets/icons/add-product.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-product.svg'
import SwipingItem from '../../components/SwipingItem'
import DeleteProduct from '../../components/PopUps/DeleteProduct'
import http from '../../utils/http'
import {
  NoItemsWrapper,
  BinWrapper,
  CategoryContainer,
  CategoryName,
  getCategoryIcon,
  ProductBrand,
  ProductCategory,
  ProductContainer,
  ProductDescription,
  ProductImage,
} from '../../components/Bin'
import useApiCall from '../../utils/useApiCall'

export default function RecyclingBin() {
  const [show, setShow] = useState(false)
  const [productToDelete, setProductToDelete] = useState()
  const [currentCategory, setCurrentCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState()
  const user = useSelector((state) => state.user)
  const getCategoryApiCall = useApiCall()
  const getProductsApiCall = useApiCall()

  const config = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
    },
  }
  useEffect(() => {
    getCategoryApiCall(
      () => http.get('/api/category', config),
      (response) => {
        setCategories(response.data)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  useEffect(() => {
    getProductsApiCall(
      () => http.get('/api/waste/getProducts', config),
      (response) => {
        setProducts(response.data)
      },
      null,
      null,
      { message: false },
    )
  }, [])

  function openPop(id) {
    setProductToDelete(id)
    setShow(true)
  }

  function getNextRoute() {
    if (!user) return '/sign-in'
    return '../scan-item'
  }

  return (
    <Page footer backgroundGrey pdTop25 className="with-animation">
      <BinWrapper>
        <SortingPanel
          types={categories}
          currentType={currentCategory}
          setCurrentType={setCurrentCategory}
        />
        <ItemsWrapper
          currentCategory={currentCategory}
          openPop={openPop}
          productToDelete={productToDelete}
          setShow={setShow}
          setProducts={setProducts}
          show={show}
          products={products}
        />
      </BinWrapper>
      <ScanItemLink to={getNextRoute()} className="add-product">
        <AddProduct className="add-product" />
      </ScanItemLink>
    </Page>
  )
}

function ItemsWrapper({
  currentCategory,
  openPop,
  productToDelete,
  setShow,
  show,
  products,
  setProducts,
}) {
  if (!products?.length) return <NoItemsWrapper />
  const pictureRoute = `${process.env.REACT_APP_SERVER_API_URL}/api/waste/photo`
  const filteredItems = products?.filter(
    (product) =>
      product.categoryId === currentCategory || currentCategory === 'All',
  )
  return (
    <>
      {filteredItems?.map(
        ({ id, picture, brandTitle, categoryId, categoryTitle }) => (
          <SwipingItem
            key={id}
            actionButtons={[
              {
                content: (
                  <DeleteProductContainer>
                    <DeleteIcon />
                    <DeleteText>
                      <FormattedMessage
                        id="recyclingBin:Delete"
                        defaultMessage="Delete"
                      />
                    </DeleteText>
                  </DeleteProductContainer>
                ),
                key: 'delete',
                onClick: () => openPop(id),
              },
            ]}
            actionButtonMinWidth={80}
            height={80}
          >
            <ProductContainer>
              <ProductImage alt="" src={`${pictureRoute}/${picture}`} />
              <ProductDescription>
                <ProductBrand>{brandTitle}</ProductBrand>
                <ProductCategory>{categoryTitle}</ProductCategory>
              </ProductDescription>
              <CategoryContainer>
                {getCategoryIcon(categoryId)}
                <CategoryName>{categoryTitle}</CategoryName>
              </CategoryContainer>
            </ProductContainer>
          </SwipingItem>
        ),
      )}
      {show && (
        <DeleteProduct
          productToDelete={productToDelete}
          setProducts={setProducts}
          setShow={setShow}
        />
      )}
    </>
  )
}

ItemsWrapper.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  openPop: PropTypes.func,
  productToDelete: PropTypes.number,
  setShow: PropTypes.func,
  setProducts: PropTypes.func,
  show: PropTypes.bool,
  products: PropTypes.array,
}

export const DeleteProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.delete};
  border-radius: 0 15px 15px 0;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: ${({ theme }) => theme.terraGrey};
`

export const DeleteText = styled.p`
  margin-top: 16px;
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
  color: ${({ theme }) => theme.terraWhite};
`

export const ScanItemLink = styled(Link)`
  position: fixed;
  width: 50px;
  height: 50px;
  left: calc(100% - 60px);
  top: calc(100% - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.terraGreen};
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.17);
  border-radius: 100%;

  .add-product {
    flex-shrink: 0;
  }
`
