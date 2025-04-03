import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  usePermissions,
} from "react-admin";

export const UserEdit = () => {
  const { permissions } = usePermissions();
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="fullName" validate={required()} />
        <TextInput source="email" validate={required()} />
        <SelectInput
          source="role"
          choices={[
            { id: "user", name: "User" },
            { id: "admin", name: "Admin" },
            { id: "organizer", name: "Organizer" },
          ]}
          validate={required()}
          disabled={!permissions.includes("admin")}
        />
      </SimpleForm>
    </Edit>
  );
};
