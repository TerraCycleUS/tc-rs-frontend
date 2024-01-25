import React from "react";
import { Datagrid, List, TextField, RichTextField } from "react-admin";
import BulkActionButtons from "../../BulkActionButtons";

export default function PageList() {
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
        <TextField source="title" />
        <RichTextField source="body" />
      </Datagrid>
    </List>
  );
}
