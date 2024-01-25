import React, { useEffect, useState } from "react";
import { Datagrid, FunctionField, List, TextField } from "react-admin";
import http from "../../../../utils/http";
import useApiCall from "../../../../utils/useApiCall";
import { findRetailer } from "../../adminUtils";
import BulkActionButtons from "../../BulkActionButtons";

export default function CategoryList() {
  const [retailers, setRetailers] = useState([]);
  const getRetailersApiCall = useApiCall();

  useEffect(() => {
    getRetailersApiCall(
      () => http.get("/api/retailer"),
      (response) => {
        setRetailers(
          response.data.map((retailer) => ({
            id: retailer.id,
            name: retailer.name,
          }))
        );
      },
      null,
      null,
      { message: false }
    );
  }, []);

  return (
    <List>
      <Datagrid bulkActionButtons={<BulkActionButtons />}>
        <TextField source="id" />
        <TextField source="title" />
        <FunctionField
          source="retailerId"
          render={(record) => findRetailer(record.retailerId, retailers)}
        />
      </Datagrid>
    </List>
  );
}
