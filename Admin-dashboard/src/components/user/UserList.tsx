// src/components/users/UserList.tsx
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SelectField,
  EditButton,
  usePermissions,
} from "react-admin";

export const UserList = () => {
  const { permissions } = usePermissions();

  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="fullName" />
        <TextField source="role" />
        <EmailField source="email" />
        {permissions === "admin" && (
          <SelectField
            source="role"
            choices={[
              { id: "user", name: "User" },
              { id: "admin", name: "Admin" },
            ]}
          />
        )}
        {permissions === "admin" && <EditButton />}
      </Datagrid>
    </List>
  );
};
