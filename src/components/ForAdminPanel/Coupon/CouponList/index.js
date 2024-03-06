import React, { useEffect, useState } from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  RichTextField,
  ImageField,
  FunctionField,
  ReferenceField,
  useNotify,
} from "react-admin";
import BulkActionButtons from "../../BulkActionButtons";
import http from "../../../../utils/http";

export default function CouponList() {
  const [stores, setStores] = useState([]);
  const notify = useNotify();

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

  function findStores(storeIds) {
    return stores
      ?.filter((store) => storeIds?.some((id) => store.id === id))
      ?.map((store) => store.address)
      ?.join(",\n");
  }

  return (
    <List>
      <Datagrid
        sx={{
          "& span": {
            overflow: "hidden",
            maxHeight: "200px",
            display: "inline-block",
          },
        }}
        bulkActionButtons={<BulkActionButtons />}
        rowClick="edit"
      >
        <TextField source="id" />
        <TextField source="name" />
        <RichTextField source="description" />
        <NumberField source="requiredAmount" />
        <FunctionField
          source="discount"
          render={(record) => `${record.discount}${record.discountCurrency}`}
        />
        <FunctionField
          source="minimumPurchaseAmount"
          render={(record) => `${record.minimumPurchaseAmount}€`}
        />
        <ImageField source="brandLogo" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <ImageField source="backgroundImage" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <ReferenceField
          source="retailerId"
          reference="retailer"
          emptyText="Unknown"
          link={false}
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="categoryId"
          reference="category"
          emptyText="Unknown"
          link={false}
        >
          <TextField source="title" />
        </ReferenceField>
        <FunctionField
          source="storeIds"
          render={(record) => findStores(record.storeIds)}
        />
        <NumberField source="availableDays" />
        <TextField source="status" />
        <ImageField source="eanCodePicURL" />
        <TextField source="brand" />
      </Datagrid>
    </List>
  );
}
