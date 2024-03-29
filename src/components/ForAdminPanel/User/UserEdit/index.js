import React from "react";
import {
  Edit,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";

export default function UserEdit() {
  const notify = useNotify();

  const onError = (error) => {
    notify(`${error.body.errors}`);
  };

  return (
    <Edit mutationMode="pessimistic" mutationOptions={{ onError }}>
      <SimpleForm>
        <TextInput
          source="name"
          name="name"
          format={(value) => value || ""}
          parse={(input) => (input === "" ? null : input)}
          fullWidth
        />
        <TextInput
          source="email"
          name="email"
          format={(value) => value || ""}
          parse={(input) => (input === "" ? null : input)}
          fullWidth
        />
        <TextInput
          source="zipcode"
          name="zipcode"
          format={(value) => value || ""}
          parse={(input) => (input === "" ? null : input)}
          fullWidth
        />
        <SelectInput
          validate={required()}
          source="lang"
          name="lang"
          fullWidth
          choices={[
            { id: "en", name: "en" },
            { id: "fr", name: "fr" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
}
