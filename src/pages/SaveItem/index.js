import React, { useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";
import Page from "../../Layouts/Page";
import Text from "../../components/Text";
import Button from "../../components/Button";
import StyledSelect from "../../components/StyledSelect";
import http from "../../utils/http";
import TextField from "../../components/TextField";
import CameraView from "../../components/CameraView";
import useApiCall from "../../utils/useApiCall";
import classes from "./SaveItem.module.scss";
import uniqBy from "lodash.uniqby";
import useCategories from "../../utils/useCategories";

export default function SaveItem() {
  const location = useLocation();
  const navigate = useNavigate();
  const values = location.state;
  const [brands, setBrands] = useState();
  const [currentCategory, setCurrentCategory] = useState(
    values?.currentCategory
  );
  const [currentBrand, setCurrentBrand] = useState(values?.currentBrand);
  const [withBrandReset, setWithBrandReset] = useState(!values?.currentBrand);
  const fromScanner = values?.fromScanner;
  const [photo, setPhoto] = useState();
  const [otherBrandValue, setOtherBrandValue] = useState(
    values?.otherBrandValue || ""
  );
  const [wasClicked, setWasClicked] = useState(false);
  const user = useSelector((state) => state.user);
  const { categories: originalCategories } = useCategories();
  const { formatMessage } = useIntl();
  const getBrandsApiCall = useApiCall();
  const categories = useMemo(
    () => uniqBy(originalCategories, "title"),
    [originalCategories]
  );
  const categoryNBrandChosen = currentCategory && currentBrand;

  const other = formatMessage({
    id: "saveItem:Other",
    defaultMessage: "Other",
  });
  const otherBrand = { id: -1, name: other };

  const sendFileConfig = {
    headers: {
      Authorization: `Bearer ${user?.authorization}`,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    if (currentCategory) {
      getBrandsApiCall(
        () => http.get(`/api/category/${currentCategory?.value}/brands`),
        (response) => {
          const originalData = response.data;
          originalData.push(otherBrand);
          setBrands(originalData);
        }
      );
    }
  }, [currentCategory]);

  function checkForm() {
    if (isNotOtherBrand())
      return !(photo && currentCategory && currentBrand && !wasClicked);
    return !(
      photo &&
      currentCategory &&
      currentBrand &&
      otherBrandValue &&
      !wasClicked
    );
  }

  function PhotoChange(picture) {
    setWasClicked(false);
    setPhoto(picture);
  }

  function CategoryChange(category) {
    setWasClicked(false);
    setCurrentCategory(category);
    if (withBrandReset) {
      setCurrentBrand(null);
    }
  }

  function BrandChange(brand) {
    setWasClicked(false);
    setCurrentBrand(brand);
    setWithBrandReset(true);
  }

  function OtherBrandChange(otherValue) {
    setWasClicked(false);
    setOtherBrandValue(otherValue);
  }

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
  };

  const apiCall = useApiCall();

  const successCb = () => {
    navigate("/recycling-bin");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setWasClicked(true);
    const binaryImage = await urlToFile(photo, "product.jpeg", "image/jpeg");
    const formData = new FormData();
    formData.append("file", binaryImage);

    let brandName;
    let brandId;
    if (isNotOtherBrand()) {
      brandId = currentBrand.value;
    } else {
      brandName = otherBrandValue;
    }

    const data = {
      picture: "",
      brandId,
      categoryId: currentCategory.value,
      brandName,
    };
    apiCall(
      () =>
        http
          .post("/api/upload/product", formData, sendFileConfig)
          .then((response) => {
            data.picture = response.data.name;
            return http.post("/api/waste/addProduct", data);
          }),
      successCb
    );
  };

  function isNotOtherBrand() {
    return currentBrand?.value !== -1;
  }

  function renderOtherBrandInput() {
    if (isNotOtherBrand()) return "";
    return (
      <TextField
        className={classes.otherInput}
        id="other-brand"
        input={{
          placeholder: formatMessage({
            id: "saveItem:OtherPlaceholder",
            defaultMessage: "Please enter the brand",
          }),
          onChange: (e) => OtherBrandChange(e.target.value),
          value: otherBrandValue,
        }}
      />
    );
  }

  let description = {
    id: "saveItem:Description",
    defaultMessage: "Please choose the category and brand of your item below:",
  };

  if (fromScanner) {
    if (values.currentBrand && values.categories?.length) {
      description = {
        id: "saveItem:DescriptionIdSuccess",
        defaultMessage:
          "Automatic product identification done. Please find the details of your item below:",
      };
    } else {
      description = {
        id: "saveItem:DescriptionIdFail",
        defaultMessage:
          "We couldn’t identify your item! Please manually fill out the fields below:",
      };
    }
  }

  return (
    <Page>
      <form className={classes.wrapperForm} onSubmit={onSubmit}>
        <CameraView
          imageSrc={values}
          setPhoto={PhotoChange}
          goTo="../take-photo"
          valuesToSave={{ currentCategory, currentBrand, otherBrandValue }}
        />
        <Text
          className={classnames(
            classes.description,
            categoryNBrandChosen && classes.invisible
          )}
        >
          {formatMessage(description)}
        </Text>
        <StyledSelect
          options={categories?.map(({ id, title }) => ({
            value: id,
            label: title,
          }))}
          onChange={(category) => CategoryChange(category)}
          placeholder={
            <FormattedMessage
              id="saveItem:Category"
              defaultMessage="Category"
            />
          }
          value={currentCategory}
          noOptionsMessage={() =>
            formatMessage({
              id: "saveItem:SelectAmountCategories",
              defaultMessage: "Please select among available categories",
            })
          }
        />
        <StyledSelect
          options={brands?.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          onChange={(brand) => BrandChange(brand)}
          placeholder={
            <FormattedMessage id="saveItem:Brand" defaultMessage="Brand" />
          }
          value={currentBrand}
          noOptionsMessage={() =>
            formatMessage({
              id: "saveItem:SelectCategoryFirst",
              defaultMessage: "Please select category first",
            })
          }
        />
        {renderOtherBrandInput()}
        <Button disabled={checkForm()} className={classes.saveBtn}>
          <FormattedMessage id="saveItem:Save" defaultMessage="Save" />
        </Button>
      </form>
    </Page>
  );
}
