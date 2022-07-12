import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Page from '../../Layouts/Page'
import ProductMenu from '../../components/ProductMenu'
import Text from '../../components/Text'
import { ReactComponent as TrashBin } from '../../assets/icons/trash-bin.svg'
import { ReactComponent as AddProduct } from '../../assets/icons/add-product.svg'
import { ReactComponent as GroomingIcon } from '../../assets/icons/grooming.svg'
import { ReactComponent as CosmeticsSkincareIcon } from '../../assets/icons/cosmetics-skincare.svg'
import { ReactComponent as OralCareIcon } from '../../assets/icons/oral-care.svg'
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete-product.svg'
import SwipingItem from '../../components/SwipingItem'
import DeleteProduct from '../../components/PopUps/DeleteProduct'
import createAnimationStyles from '../../components/PageTransition/createAnimationStyles'
import animations from '../../components/PageTransition/animations'
import http from '../../utils/http'

function getCategoryIcon(category) {
  switch (category) {
    case 'Oral care':
      return <OralCareIcon />

    case 'Grooming':
      return <GroomingIcon />

    case 'Cosmetics & skincare':
      return <CosmeticsSkincareIcon />

    default:
      return null
  }
}

export default function RecyclingBin() {
  const [items, setItems] = useState()
  const [show, setShow] = useState(false)
  const [productToDelete, setProductToDelete] = useState('')
  const [currentCategory, setCurrentCategory] = useState('All')
  const [categories, setCategories] = useState()
  const [products, setProducts] = useState()
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
    http
      .get('/api/waste/getProducts', config)
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function openPop(id) {
    setProductToDelete(id)
    setShow(true)
  }

  return (
    <>
      <Page
        footer
        backgroundGrey
        pdTop25
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
        <Wrapper>
          <ProductMenu
            categories={categories}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
          />
          <ItemsWrapper
            items={items}
            currentCategory={currentCategory}
            openPop={openPop}
            productToDelete={productToDelete}
            setShow={setShow}
            setItems={setItems}
            show={show}
            products={products}
          />
        </Wrapper>
      </Page>
      <ScanItemLink to="../scan-item" className="add-product">
        <AddProduct className="add-product" />
      </ScanItemLink>
    </>
  )
}

function ItemsWrapper({
  items,
  currentCategory,
  openPop,
  productToDelete,
  setShow,
  setItems,
  show,
  products,
}) {
  if (!items.length) return <NoItemsWrapper />

  const filteredItems = products?.filter(
    (product) =>
      product.category === currentCategory || currentCategory === 'All',
  )

  return (
    <>
      {filteredItems?.map(({ id, picture, brandId, name, categoryId }) => (
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
            <ProductImage alt="" src={picture} />
            <ProductDescription>
              <ProductName>{name}</ProductName>
              <ProductBrand>{brandId}</ProductBrand>
            </ProductDescription>
            <CategoryContainer>
              {getCategoryIcon(categoryId)}
              <CategoryName>{categoryId}</CategoryName>
            </CategoryContainer>
          </ProductContainer>
        </SwipingItem>
      ))}
      {show && (
        <DeleteProduct
          productToDelete={productToDelete}
          items={items}
          setItems={setItems}
          setShow={setShow}
        />
      )}
    </>
  )
}

function NoItemsWrapper() {
  return (
    <NoItems>
      <CircleBinIcon>
        <TrashBin className="bin-icon" />
      </CircleBinIcon>
      <Text className="empty-text">
        <FormattedMessage
          id="recyclingBin:CollectProducts"
          defaultMessage="Collect products for your virtual recycling bin"
        />
      </Text>
    </NoItems>
  )
}

ItemsWrapper.propTypes = {
  items: PropTypes.array,
  currentCategory: PropTypes.string,
  openPop: PropTypes.func,
  productToDelete: PropTypes.string,
  setShow: PropTypes.func,
  setItems: PropTypes.func,
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

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-text {
    width: 300px;
    text-align: center;
  }
`

export const ProductContainer = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.terraWhite};
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`
export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 12px;
  flex-grow: 1;
`

export const ProductName = styled.h6`
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 0;
  color: ${({ theme }) => theme.textPrimary};
`

export const ProductBrand = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${({ theme }) => theme.textPrimary};
`

export const ProductImage = styled.img`
  width: 80px;
  object-fit: cover;
  border-radius: 15px 0px 0px 15px;
`

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-right: 15px;
  width: 52px;
`

export const CategoryName = styled.p`
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  color: ${({ theme }) => theme.main};
  max-width: 56px;
`

export const NoItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

export const CircleBinIcon = styled.div`
  position: relative;
  margin-bottom: 50px;
  z-index: 2;
  display: flex;
  justify-content: center;
  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -20px;
    display: block;
    width: 137px;
    height: 137px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.terraWhite};
  }

  .bin-icon {
    z-index: 3;
  }
`

export const ScanItemLink = styled(Link)`
  position: fixed;
  width: 50px;
  height: 50px;
  left: calc(100vw - 60px);
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
