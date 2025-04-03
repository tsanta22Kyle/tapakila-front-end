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
        <EmailField source="email" />
        {permissions.includes("admin") && (
          <SelectField
            source="role"
            choices={[
              { id: "user", name: "User" },
              { id: "admin", name: "Admin" },
              { id: "organizer", name: "Organizer" },
            ]}
          />
        )}
        {permissions.includes("admin") && <EditButton />}
      </Datagrid>
    </List>
  );
};
