import React from "react";
import {
  Datagrid,
  List,
  TextField,
  EmailField,
  DateField,
  SelectInput,
  TextInput,
  minLength,
  email,
  DateInput,
} from "react-admin";
import BulkActionButtons from "../../BulkActionButtons";
import { formatForApi } from "../../adminUtils";

const userFilters = [
  <TextInput
    autoFocus
    label="Name"
    name="name"
    key="name"
    source="name"
    validate={minLength(3, "Name length must be at least 3 characters long")}
  />,
  <TextInput
    autoFocus
    label="Email"
    name="email"
    key="email"
    source="email"
    type="email"
    validate={email("Must bve a valid email")}
  />,
  <SelectInput
    label="Role"
    name="role"
    key="role"
    choices={[
      { id: "USER", name: "USER" },
      { id: "ADMIN", name: "ADMIN" },
    ]}
    source="role"
    defaultValue="USER"
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
];

export default function UserList() {
  return (
    <List filters={userFilters} filterDefaultValues={{ role: "USER" }}>
      <Datagrid bulkActionButtons={<BulkActionButtons />} rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="zipcode" />
        <TextField source="status" />
        <TextField source="lang" />
        <TextField source="role" />
        <DateField showTime source="lastLogin" />
        <DateField showTime source="lastLogout" />
        <TextField source="isTwoFaEnabled" />
      </Datagrid>
    </List>
  );
}
