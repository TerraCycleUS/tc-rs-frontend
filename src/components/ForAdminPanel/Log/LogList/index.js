import React from "react";
import {
  Datagrid,
  List,
  TextField,
  DateField,
  RichTextField,
  NumberInput,
  DateInput,
  SelectInput,
} from "react-admin";
import BulkActionButtons from "../../BulkActionButtons";
import { formatForApi } from "../../adminUtils";

const LOG_ACTIONS = [
  { id: "CREATE", name: "CREATE" },
  { id: "UPDATE", name: "UPDATE" },
  { id: "DELETE", name: "DELETE" },
];

const LOG_ENTITIES = [
  { id: "Retailer", name: "Retailer" },
  { id: "Page", name: "Page" },
  { id: "User", name: "User" },
  { id: "Coupon", name: "Coupon" },
];

const logFilters = [
  <NumberInput
    autoFocus
    label="User ID"
    name="userId"
    key="userId"
    source="userId"
  />,
  <DateInput
    parse={(value) => formatForApi(value)}
    label="Date from"
    name="dateFrom"
    key="dateFrom"
    source="dateFrom"
  />,
  <DateInput
    parse={(value) => formatForApi(value)}
    label="Date end"
    name="dateEnd"
    key="dateEnd"
    source="dateEnd"
  />,
  <SelectInput
    label="Action type"
    name="actionType"
    key="actionType"
    choices={LOG_ACTIONS}
    source="actionType"
  />,
  <SelectInput
    label="Entity name"
    name="entityName"
    key="entityName"
    choices={LOG_ENTITIES}
    source="entityName"
  />,
];

export default function LogList() {
  return (
    <List filters={logFilters}>
      <Datagrid bulkActionButtons={<BulkActionButtons />}>
        <TextField source="id" />
        <TextField source="actionType" />
        <TextField source="entityName" />
        <TextField source="entityId" />
        <RichTextField source="description" />
        <TextField source="userId" />
        <DateField showTime source="createdAt" />
      </Datagrid>
    </List>
  );
}
