import { Edit, SimpleForm, TextInput, SelectInput, required } from "react-admin";

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={required()} />
      <SelectInput
        source="role"
        choices={[
          { id: "user", name: "User" },
          { id: "admin", name: "Admin" },
        ]}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);