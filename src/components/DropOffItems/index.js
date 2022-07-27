import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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
import { ReactComponent as Tick } from '../../assets/icons/tick.svg'
import classes from './DropOffItems.module.scss'
export default function DropOffItems({
  currentCategory,
  setShow,
  show,
  products,
  setProducts,
  checkBoxes,
  setCheckBoxes,
}) {
  if (!products?.length) return <NoItemsWrapper />
  const pictureRoute = `${process.env.REACT_APP_SERVER_API_URL}/api/waste/photo`
  const filteredItems = products?.filter(
    (product) =>
      product.categoryTitle === currentCategory || currentCategory === 'All',
  )

  function checkProduct(id) {
    const newCheckBoxes = checkBoxes.map((item) => {
      if (item.productId === id) return { ...item, checked: !item.checked }
      return item
    })
    setCheckBoxes(newCheckBoxes)
  }

  function checkIfActive(id) {
    if (!checkBoxes.find((item) => item.productId === id)?.checked) return ''
    return 'active'
  }

  return (
    <>
      {filteredItems?.map(
        ({ id, picture, brandTitle, categoryId, categoryTitle }) => (
          <CheckProduct onClick={() => checkProduct(id)} key={id}>
            <ProductContainer
              className={classNames('drop-off', checkIfActive(id))}
            >
              <ProductImage
                className={classNames('drop-off', checkIfActive(id))}
                alt=""
                src={`${pictureRoute}/${picture}`}
              />
              <Tick
                className={classNames(classes.tick, classes[checkIfActive(id)])}
              />
              <ProductDescription className="drop-off">
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
  checkBoxes: PropTypes.array,
  setCheckBoxes: PropTypes.func,
}
