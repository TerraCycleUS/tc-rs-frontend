import React from "react";
import { Datagrid, FunctionField, List, TextField } from "react-admin";

import BulkActionButtons from "../../BulkActionButtons";

export default function CategoryList() {
  return (
    <List>
      <Datagrid bulkActionButtons={<BulkActionButtons />}>
        <TextField source="id" />
        <TextField source="title" />
        <FunctionField
          source="retailerId"
          render={(record) => record?.retailers?.map(r => r.name).join(', ')}
        />
      </Datagrid>
    </List>
  );
}
