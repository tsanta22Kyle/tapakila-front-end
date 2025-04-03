import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  PasswordInput,
} from "react-admin";

export const UserCreate = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
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
  </Edit>
);
