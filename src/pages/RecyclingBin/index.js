import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import uniqBy from "lodash.uniqby";

import Page from "../../Layouts/Page";
import SortingPanel from "../../components/SortingPanel";
import { ReactComponent as AddProduct } from "../../assets/icons/add-product.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete-product.svg";
import SwipingItem from "../../components/SwipingItem";
import DeleteProduct from "../../components/PopUps/DeleteProduct";
import http from "../../utils/http";
import classes from "./RecyclingBin.module.scss";
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
} from "../../components/Bin";
import useApiCall from "../../utils/useApiCall";
import { MONOPRIX_ID } from "../../utils/const";

export default function RecyclingBin() {
  const [show, setShow] = useState(false);
  const [productToDelete, setProductToDelete] = useState();
  const [currentCategory, setCurrentCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState();
  const user = useSelector((state) => state.user);
  const getCategoryApiCall = useApiCall();
  const getProductsApiCall = useApiCall();

  useEffect(() => {
    getCategoryApiCall(
      () => http.get("/api/category"),
      (response) => {
        const tempCategories = response.data;
        setCategories(uniqBy(tempCategories, "title"));
      },
      null,
      null,
      { message: false }
    );
  }, []);

  useEffect(() => {
    getProductsApiCall(
      () => http.get("/api/waste/getProducts"),
      (response) => {
        setProducts(response.data);
      },
      null,
      null,
      { message: false }
    );
  }, []);

  function openPop(id) {
    setProductToDelete(id);
    setShow(true);
  }

  function getNextRoute() {
    if (!user) return "/sign-in";
    // In this case for now we should open screen with opened camera.
    // But in future with another retailer
    // we need add posability to scan EAN code or take a photo.
    // return './scan-item'
    return "./take-photo";
  }

  return (
    <Page footer backgroundGrey pdTop25 className="with-animation">
      <BinWrapper>
        <p
          className={classNames(
            "my-text-error my-color-textPrimary text-center",
            classes.topDescription
          )}
        >
          {currentCategory === "All" ? (
            <FormattedMessage
              id="recyclingBin:TopDescription"
              defaultMessage="Choose Category"
            />
          ) : (
            <FormattedMessage
              id="recyclingBin:AllBrands"
              defaultMessage="All brands accepted"
            />
          )}
        </p>
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
      <Link
        data-testid="addItem-link"
        to={getNextRoute()}
        className={classes.scanItemLink}
      >
        <AddProduct className="add-product" />
      </Link>
      {/* this functionality is commented out until Monoprix will be returned */}
      {/* or when user will be able to choose retailer for recycling bin */}
      {/* {showTutorial && <BinTutorial closePop={() => setShowTutorial(false)} />} */}
    </Page>
  );
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
  if (!products?.length) return <NoItemsWrapper />;
  const pictureRoute = `${process.env.REACT_APP_SERVER_API_URL}/api/waste/photo`;
  const filteredItems = products?.filter(
    (product) =>
      product.categoryId === currentCategory || currentCategory === "All"
  );
  return (
    <>
      {filteredItems?.map(
        ({ id, picture, brandTitle, categoryId, categoryTitle }) => (
          <SwipingItem
            key={id}
            actionButtons={[
              {
                content: (
                  <div className={classes.deleteProductContainer}>
                    <DeleteIcon />
                    <p className={classes.deleteText}>
                      <FormattedMessage
                        id="recyclingBin:Delete"
                        defaultMessage="Delete"
                      />
                    </p>
                  </div>
                ),
                key: "delete",
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
                {getCategoryIcon(
                  categoryId,
                  classes.categoryIcon,
                  null,
                  MONOPRIX_ID
                )}
                <CategoryName>{categoryTitle}</CategoryName>
              </CategoryContainer>
            </ProductContainer>
          </SwipingItem>
        )
      )}
      {show && (
        <DeleteProduct
          productToDelete={productToDelete}
          setProducts={setProducts}
          setShow={setShow}
        />
      )}
    </>
  );
}

ItemsWrapper.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  openPop: PropTypes.func,
  productToDelete: PropTypes.number,
  setShow: PropTypes.func,
  setProducts: PropTypes.func,
  show: PropTypes.bool,
  products: PropTypes.array,
};
