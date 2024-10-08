import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
  useNotify,
  ImageInput,
  ImageField,
  SelectInput,
  AutocompleteArrayInput,
  FormDataConsumer,
  BooleanInput,
  required,
  useRecordContext,
} from "react-admin";
import { Button, Grid } from "@mui/material";
import FileUpload from "@mui/icons-material/FileUpload";
import RichTextEditor from "../../../RichTextEditor";
import http from "../../../../utils/http";
import { onError } from "../../adminUtils";
import classes from "./CouponEdit.module.scss";
import AlertDialog from "../../../AlertDialog/AlertDialog";
import { useWatch } from "react-hook-form";

const EanCodes = () => {
  const notify = useNotify();
  const record = useRecordContext();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState(null);
  const [availableEanCodeCount, setAvailableEanCodeCount] = useState(0);
  const [usedEanCodeCount, setUsedEanCodeCount] = useState(0);

  useEffect(() => {
    setAvailableEanCodeCount(record.available_ean_codes_count);
    setUsedEanCodeCount(record.used_ean_codes_count);
  }, []);

  const updateCounters = () => {
    http
      .get(`/api/admin/coupon/${record.id}`)
      .then((response) => {
        setAvailableEanCodeCount(response.data.available_ean_codes_count);
        setUsedEanCodeCount(response.data.used_ean_codes_count);
      })
      .catch((error) => {
        notify(error?.response?.data?.message || "Error");
      });
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    http
      .get(`/api/admin/eanCode/makeUsed?couponId=${record.id}`)
      .then((response) => {
        updateCounters();
      })
      .catch((error) => {
        notify(error?.response?.data?.message || "Error");
      });
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleUploadEanCodes = () => {
    const url = `/api/upload/eanCodes/${record.id}`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    http
      .post(url, formData, config)
      .then((response) => {
        setUploadedFileURL(response.data.fileUrl);
        notify(`Rows imported: ${response.data.importedRowsCount}`);
        updateCounters();
      })
      .catch((error) => {
        notify(error?.response?.data?.message || "Error");
      });
    setFile(null);
    setUploadedFileURL(null);
  };
  return (<>
    <div className={classes.eanCodeUploadBlock}>
      <h3>Ean codes:</h3>
      <hr/>
      <Grid container spacing={3}>
        <Grid size={4} item>
          <p>Available codes: {availableEanCodeCount}</p>
          <p>Used codes: {usedEanCodeCount}</p>
          <AlertDialog
            open={open}
            handleClose={handleClose}
            title="Set all Ean code to used"
            description="Are you sure? this cannot be undone"
            agreeButtonText="Yes"
            disagreeButtonText="Cancel"
            onAgree={handleAgree}
            onDisagree={handleDisagree}
          />
        </Grid>
        <Grid size={4} item>
          <h3>Attach file with ean codes:</h3>

          <label className={classes.fileUpload}>
            <input type="file" accept=".xlsx" onChange={handleChange}/>
            Choose file
          </label>

          <Button
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
              maxWidth: "100px",
              marginTop: "25px",
              marginBottom: "35px",
            }}
            variant="contained"
            onClick={handleUploadEanCodes}
            disabled={!file || !!uploadedFileURL}
            type="button"
          >
            <FileUpload/> Upload ean codes
          </Button>
        </Grid>
        <Grid size={4} item>
          <Button variant="contained" onClick={handleClickOpen}>Make all used</Button>
        </Grid>

      </Grid>
    </div>
  </>);
};

export default function CouponEdit() {
  const notify = useNotify();
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    http
      .get("/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        notify(error?.response?.data?.message || "Error");
      });
  }, []);

  useEffect(() => {
    http
      .get("/api/map-items/public")
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        notify(error?.response?.data?.message || "Error");
      });

  }, []);

  const formatCategories = (categoriesToChange, retailer) =>
    categoriesToChange
      ?.filter((category) => category.retailerId === retailer)
      .map((category) => ({
        id: category.id,
        name: category.title,
      }));

  const formatStores = (storesToChange, retailer) =>
    storesToChange
      ?.filter((store) => store.retailerId === retailer)
      .map((store) => ({
        id: store.id,
        name: store.address,
      }));

  const validateCouponEdit = (values) => {
    const errors = {};
    if (!values.requiredAmount) {
      errors.requiredAmount = "Required amount is required";
    } else if (values.requiredAmount < 0) {
      errors.requiredAmount = "Required amount should be positive number";
    }

    if (!values.discount) {
      errors.discount = "Discount is required";
    }
    const discountCurrencyRegex = /^[$€%.]$/;
    if (!discountCurrencyRegex.test(values.discountCurrency)) {
      errors.discountCurrency =
        "Invalid character. Only $, €, %, and dot are allowed.";
    }
    return errors;
  };

  return (
    <>
      <Edit
        sx={{
          "& .MuiPaper-root, MuiPaper-elevation, RaEdit-card": {
            overflow: "visible",
          },
        }}
        mutationMode="pessimistic"
        mutationOptions={{ onError: (error) => onError(error, notify) }}
      >
        <SimpleForm validate={validateCouponEdit}>
          <FormComponent
            categories={categories}
            notify={notify}
            validateCouponEdit={validateCouponEdit}
            formatCategories={formatCategories}
            formatStores={formatStores}
            stores={stores}
          />
          <EanCodes/>
        </SimpleForm>
      </Edit>
    </>
  );
}

function FormComponent({ categories, formatCategories, formatStores, stores }) {
  const isValidForOfferPeriod = useWatch({ name: "isValidForOfferPeriod" });

  return (
    <>
      <TextInput name="name" source="name" fullWidth/>
      <RichTextEditor source="description"/>
      <NumberInput name="requiredAmount" source="requiredAmount" fullWidth/>
      <NumberInput name="discount" source="discount" fullWidth/>
      <TextInput name="discountCurrency" source="discountCurrency" fullWidth/>
      <NumberInput
        name="minimumPurchaseAmount"
        source="minimumPurchaseAmount"
        fullWidth
      />
      <BooleanInput source="singleEanCodeSupport"/>
      <ImageInput
        accept="image/*"
        name="retailerLogo"
        source="retailerLogo"
        fullWidth
        format={formatLogo}
      >
        <ImageField source="src" title="title"/>
      </ImageInput>
      <DateInput name="startDate" source="startDate" fullWidth/>
      <DateInput name="endDate" source="endDate" fullWidth/>
      <FormDataConsumer>
        {({ formData }) => (
          <>
            <SelectInput
              validate={required()}
              choices={formatCategories(categories, formData?.retailerId)}
              source="categoryId"
              name="categoryId"
            />
            <AutocompleteArrayInput
              validate={required()}
              choices={formatStores(stores, formData?.retailerId)}
              source="storeIds"
              name="storeIds"
            />
          </>
        )}
      </FormDataConsumer>
      <ImageInput
        accept="image/*"
        name="brandLogo"
        source="brandLogo"
        fullWidth
        format={formatLogo}
      >
        <ImageField source="src" title="title"/>
      </ImageInput>
      <BooleanInput source="isValidForOfferPeriod"/>
      <NumberInput
        min={1}
        max={31}
        name="availableDays"
        source="availableDays"
        disabled={isValidForOfferPeriod}
      />
      <SelectInput
        validate={required()}
        choices={[
          { id: "ACTIVE", name: "ACTIVE" },
          { id: "INACTIVE", name: "INACTIVE" },
        ]}
        source="status"
        name="status"
      />
      <TextInput label="Sponsor brand" name="brand" source="brand" fullWidth/>
      <ImageInput
        accept="image/*"
        name="eanCodePicURL"
        source="eanCodePicURL"
        fullWidth
        format={formatLogo}
      >
        <ImageField source="src" title="title"/>
      </ImageInput>
    </>
  );
}

function formatLogo(value) {
  if (!value || typeof value === "string") {
    return { url: value };
  }
  return value;
}

FormComponent.propTypes = {
  categories: PropTypes.array,
  formatCategories: PropTypes.func,
  formatStores: PropTypes.func,
  stores: PropTypes.array,
};
