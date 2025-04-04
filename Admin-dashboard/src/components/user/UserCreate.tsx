import {
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  PasswordInput,
  Create,
} from "react-admin";

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="fullName" validate={required()} />
      <TextInput source="email" validate={required()} />
      <PasswordInput source="password" validate={required()} />
      <SelectInput
        source="role"
        choices={[
          { id: "user", name: "User" },
          { id: "admin", name: "Admin" },
          { id: "organizer", name: "Organizer" },
        ]}
        validate={required()}
      />
    </SimpleForm>
  </Create>
);
