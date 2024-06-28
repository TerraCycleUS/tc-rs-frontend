import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import uniqBy from "lodash.uniqby";

import Page from "../../Layouts/Page";
import SortingPanel from "../../components/SortingPanel";
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
import getCategoryDescription from "./recyclingBinUtils";
import useCategories from "../../utils/useCategories";
import ButtonActions from "./ButtonActions";

export default function RecyclingBin() {
  const [show, setShow] = useState(false);
  const [productToDelete, setProductToDelete] = useState();
  const [currentCategory, setCurrentCategory] = useState("All");
  const user = useSelector((state) => state.user);
  const { categories: originalCategories } = useCategories();
  const [products, setProducts] = useState();
  const getProductsApiCall = useApiCall();
  const navigate = useNavigate();

  const categories = useMemo(
    () => uniqBy(originalCategories, "title"),
    [originalCategories]
  );

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
    return "./take-photo";
  }

  function addItem() {
    navigate(getNextRoute());
  }

  function dropOff() {
    navigate("/map");
  }

  return (
    <Page
      footer
      backgroundGrey
      pdTop25
      className={classNames("with-animation")}
    >
      <BinWrapper>
        <p
          className={classNames(
            "my-text-error my-color-textPrimary text-center",
            classes.topDescription
          )}
        >
          <FormattedMessage {...getCategoryDescription(currentCategory)} />
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
      <ButtonActions
        onDropOffClick={dropOff}
        dropOffBtnDisabled={!products?.length}
        onAddClick={addItem}
      />
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
  const pictureRoute = `${process.env.REACT_APP_SERVER_API_URL}/api/waste/photo`;
  const filteredItems = products?.filter(
    (product) =>
      product.categoryId === currentCategory || currentCategory === "All"
  );
  if (!filteredItems?.length) return <NoItemsWrapper />;
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
