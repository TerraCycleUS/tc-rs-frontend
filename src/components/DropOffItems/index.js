import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
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
} from "../Bin";
import CheckProduct from "../CheckProduct";
import { ReactComponent as Tick } from "../../assets/icons/tick.svg";
import classes from "./DropOffItems.module.scss";
import binClasses from "../Bin/Bin.module.scss";

export default function DropOffItems({
  currentCategory,
  products,
  setProducts,
  unacceptedItems = false,
}) {
  const pictureRoute = `${process.env.REACT_APP_SERVER_API_URL}/api/waste/photo`;
  const filteredItems = products?.filter(
    (product) =>
      product.categoryId === currentCategory || currentCategory === "All"
  );
  if (!filteredItems?.length && !unacceptedItems) return <NoItemsWrapper />;

  function checkProduct(id) {
    setProducts((previous) =>
      previous.map((item) => {
        if (item.id === id) return { ...item, checked: !item.checked };
        return item;
      })
    );
  }

  function checkIfActive(checked) {
    if (!checked) return "";
    return "active";
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {filteredItems?.map(
        ({ id, picture, brandTitle, categoryId, categoryTitle, checked }) => (
          <CheckProduct
            onClick={() => checkProduct(id)}
            key={id}
            disabled={unacceptedItems}
          >
            <ProductContainer
              className={classNames(
                binClasses.productContainer,
                binClasses.dropOff,
                binClasses[checkIfActive(checked)]
              )}
            >
              <ProductImage
                className={classNames(
                  binClasses.dropOff,
                  binClasses[checkIfActive(checked)]
                )}
                alt=""
                src={`${pictureRoute}/${picture}`}
              />
              <Tick
                className={classNames(
                  classes.tick,
                  classes[checkIfActive(checked)]
                )}
              />
              <ProductDescription className={binClasses.dropOff}>
                <ProductBrand>{brandTitle}</ProductBrand>
                <ProductCategory>{categoryTitle}</ProductCategory>
              </ProductDescription>
              <CategoryContainer>
                {getCategoryIcon(categoryId)}
                <CategoryName>{categoryTitle}</CategoryName>
              </CategoryContainer>
            </ProductContainer>
          </CheckProduct>
        )
      )}
    </>
  );
}

DropOffItems.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setProducts: PropTypes.func,
  products: PropTypes.array,
  unacceptedItems: PropTypes.bool,
};
