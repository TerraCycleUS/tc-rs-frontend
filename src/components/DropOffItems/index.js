import React from 'react'
import PropTypes from 'prop-types'
import {
  CategoryContainer,
  CategoryName,
  getCategoryIcon,
  NoItemsWrapper,
  ProductBrand,
  ProductCategory,
  ProductContainer,
  ProductDescription,
  ProductImage,
} from '../Bin'
import CheckProduct from '../CheckProduct'
import ThankYou from '../PopUps/ThankYou'

export default function DropOffItems({
  currentCategory,
  setShow,
  show,
  products,
  setProducts,
}) {
  if (!products?.length) return <NoItemsWrapper />
  const pictureRoute = `${process.env.REACT_APP_SERVER_API_URL}/api/waste/photo`
  const filteredItems = products?.filter(
    (product) =>
      product.categoryTitle === currentCategory || currentCategory === 'All',
  )

  return (
    <>
      {filteredItems?.map(
        ({ id, picture, brandTitle, categoryId, categoryTitle }) => (
          <CheckProduct key={id}>
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
          </CheckProduct>
        ),
      )}
      {show && <ThankYou setProducts={setProducts} setShow={setShow} />}
    </>
  )
}

DropOffItems.propTypes = {
  currentCategory: PropTypes.string,
  setShow: PropTypes.func,
  setProducts: PropTypes.func,
  show: PropTypes.bool,
  products: PropTypes.array,
}
