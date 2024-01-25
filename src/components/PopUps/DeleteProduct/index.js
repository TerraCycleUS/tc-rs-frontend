import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import Text, { H2 } from "../../Text";

import Button from "../../Button";
import http from "../../../utils/http";
import useApiCall from "../../../utils/useApiCall";
import classes from "./DeleteProduct.module.scss";
import popClasses from "../GenericPop/GenericPop.module.scss";

export default function DeleteProduct({
  setShow,
  setProducts,
  productToDelete,
}) {
  const [wasClicked, setWasClicked] = useState(false);

  function filterProducts(actualProducts) {
    return actualProducts.filter((item) => item.id !== productToDelete);
  }

  const successCb = () => {
    setProducts(filterProducts);
    setShow(false);
  };

  const apiCall = useApiCall();

  function deleteProduct() {
    setWasClicked(true);
    apiCall(() => http.delete(`/api/waste/${productToDelete}`), successCb);
  }

  return (
    <div className={popClasses.popWrapper}>
      <div className={classNames(popClasses.popContainer, classes.wrapper)}>
        <H2 className={classes.title}>
          <FormattedMessage
            id="deleteProduct:DeleteProduct"
            defaultMessage="Delete Product"
          />
        </H2>
        <Text className={classes.text}>
          <FormattedMessage
            id="deleteProduct:AreYouSure"
            defaultMessage="Are you sure you want to delete this Product?"
          />
        </Text>
        <Button
          className={classes.deleteBtn}
          disabled={wasClicked}
          onClick={() => deleteProduct()}
        >
          <FormattedMessage id="deleteProduct:Delete" defaultMessage="Delete" />
        </Button>
        <Button className="cancel-btn" inverted onClick={() => setShow(false)}>
          <FormattedMessage id="deleteProduct:Cancel" defaultMessage="Cancel" />
        </Button>
      </div>
    </div>
  );
}

DeleteProduct.propTypes = {
  setShow: PropTypes.func,
  setProducts: PropTypes.func,
  productToDelete: PropTypes.number,
};
