import React, { useEffect, useState, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import queryString from "query-string";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import SortingPanel from "../../components/SortingPanel";
import Page from "../../Layouts/Page";
import http from "../../utils/http";
import { BinWrapper } from "../../components/Bin";
import DropOffItems from "../../components/DropOffItems";
import classes from "./DropOffBin.module.scss";
import ThankYou from "../../components/PopUps/ThankYou";
import useApiCall from "../../utils/useApiCall";
import ConfirmDrop from "../../components/PopUps/ConfirmDrop";
import uniqBy from "lodash.uniqby";
import { splitProductsByWasteAcceptance } from "./dropOffUtils";
import NoProducts from "./NoProducts";
import UnacceptedItems from "./UnacceptedItems";
import useCategories from "../../utils/useCategories";
import ButtonActions from "../RecyclingBin/ButtonActions";

export default function DropOffBin() {
  const [currentCategory, setCurrentCategory] = useState("All");
  const location = useLocation();
  const params = queryString.parse(location.search);
  const { categories: originalCategories } = useCategories();
  const availableCategoryIds = originalCategories
    .filter(({ retailerId }) => retailerId === +params.retailerId)
    .map(({ id }) => id);
  const [products, setProducts] = useState([]);
  const [checkedAmount, setCheckedAmount] = useState(0);
  const [showPop, setShowPop] = useState(false);
  const [blockBtn, setBlockBtn] = useState(true);
  const getProductsApiCall = useApiCall();
  const dropApiCall = useApiCall();
  const navigate = useNavigate();
  const [locationId, setLocationId] = useState();
  const [qrCode, setQrCode] = useState();
  const retailerId = params?.retailerId;
  const [showConfirm, setShowConfirm] = React.useState(false);

  useEffect(() => {
    if (products?.filter((product) => product.checked === true).length > 0) {
      setBlockBtn(false);
    } else {
      setBlockBtn(true);
    }
  }, [products]);

  const categories = useMemo(
    () => uniqBy(originalCategories, "title"),
    [originalCategories]
  );

  useEffect(() => {
    if (Object.keys(params).length === 0) navigate("/map");
    setLocationId(params?.id);
    setQrCode(params?.qrCode);

    getProductsApiCall(
      () => http.get("/api/waste/getProducts"),
      (response) => {
        setProducts(
          response.data.map((product) => ({ ...product, checked: false }))
        );
      }
    );
  }, []);

  const [acceptedProducts, notAcceptedProducts, acceptedProductsIds] =
    useMemo(() => {
      const acceptedProductsIds = {};
      const [acceptedProducts, notAcceptedProducts] =
        splitProductsByWasteAcceptance(products, availableCategoryIds);
      acceptedProducts.forEach(({ id }) => (acceptedProductsIds[id] = true));
      return [acceptedProducts, notAcceptedProducts, acceptedProductsIds];
    }, [products, availableCategoryIds]);

  const categoryAccepted =
    currentCategory === "All" || availableCategoryIds.includes(currentCategory);

  function selectAll() {
    if (!products.length) return;
    setProducts((lastSaved) =>
      lastSaved.map((product) => ({
        ...product,
        checked:
          acceptedProductsIds[product.id] &&
          (product.categoryId === currentCategory || currentCategory === "All"),
      }))
    );
  }

  function resetFilter() {
    setCurrentCategory("All");
  }

  function drop() {
    if (blockBtn) return;
    if (!products) {
      setShowConfirm(false);
      return;
    }
    setBlockBtn(true);
    const toSend = {
      ids: products
        .filter((product) => product.checked === true)
        .map((product) => product.id)
        .join(","),
      locationId,
      retailerId,
      verificationCode: qrCode,
    };
    dropApiCall(
      () => http.post("/api/waste/dropProducts", toSend),
      () => {
        setCheckedAmount(
          products.filter((product) => product.checked === true).length
        );
        setBlockBtn(false);
        setShowPop(true);
        setShowConfirm(false);
        setProducts((lastSaved) =>
          lastSaved.filter((product) => product.checked === false)
        );
        localStorage.setItem("firstDropOff", 1);
      }
    );
  }

  function addItem() {
    navigate("../take-photo");
  }

  function renderPop() {
    if (!showPop) return null;
    return <ThankYou setShowPop={setShowPop} amount={checkedAmount} />;
  }

  return (
    <Page backgroundGrey innerClassName={classes.page} footer>
      <BinWrapper>
        <p
          className={classNames(
            "my-text",
            "text-center",
            "my-color-textPrimary",
            classes.description
          )}
        >
          <FormattedMessage
            id="dropOffBin:Description"
            defaultMessage="Select the items you want to drop off in the in-store kiosk"
          />
        </p>
        <div className={classes.listAll}>
          <p className={classes.text}>
            <FormattedMessage
              id="dropOffBin:List"
              defaultMessage="List of items"
            />
          </p>
          <button className={classes.button} type="button" onClick={selectAll}>
            <FormattedMessage
              id="dropOffBin:Select"
              defaultMessage="Select all"
            />
          </button>
        </div>
        <SortingPanel
          types={categories}
          currentType={currentCategory}
          setCurrentType={setCurrentCategory}
        />
        {!categoryAccepted ? (
          <NoProducts onReset={resetFilter} />
        ) : (
          <>
            <DropOffItems
              currentCategory={currentCategory}
              setProducts={setProducts}
              products={acceptedProducts}
            />
            {currentCategory === "All" ? (
              <UnacceptedItems
                currentCategory={currentCategory}
                products={notAcceptedProducts}
              />
            ) : null}
          </>
        )}
        <ButtonActions
          dropOffBtnDisabled={blockBtn}
          onDropOffClick={() => setShowConfirm(true)}
          onAddClick={addItem}
        />
        {renderPop()}
        {showConfirm ? (
          <ConfirmDrop
            onClick={drop}
            onClose={() => setShowConfirm(false)}
            location={params.address}
            storeName={params.location}
          />
        ) : null}
      </BinWrapper>
    </Page>
  );
}
