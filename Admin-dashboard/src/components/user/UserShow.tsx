import {
    Show,
    SimpleShowLayout,
    TextField,
    EmailField,
    DateField,
    FunctionField,
    useRecordContext,
  } from "react-admin";
  import { Chip } from '@mui/material';
  
  interface Organizer {
    name: string;
  }
  
  interface UserRecord {
    id: string;
    fullName?: string;
    name?: string;
    email: string;
    role: 'user' | 'admin' | 'organizer';
    organizer?: Organizer;
    createdAt: string;
    updatedAt: string;
  }
  
  const OrganizerField = () => {
    const record = useRecordContext<UserRecord>();
    return record?.organizer?.name ? (
      <TextField source="organizer.name" label="Organisateur" />
    ) : null;
  };
  
  export const UserShow = () => {
    return (
      <Show>
        <SimpleShowLayout>
          <FunctionField<UserRecord>
            label="Utilisateur"
            render={(record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {record.fullName || record.name}
                </span>
                <Chip 
                  label={record.role} 
                  color={
                    record.role === 'admin' ? 'primary' : 
                    record.role === 'organizer' ? 'secondary' : 'default'
                  } 
                  size="small"
                />
              </div>
            )}
          />
  
          <TextField source="id" label="ID" />
          <TextField source="fullName" label="Nom complet" />
          <EmailField source="email" label="Email" />
          <TextField source="role" label="Rôle" />
          
          <OrganizerField />
          
          <DateField source="createdAt" label="Date de création" showTime />
          <DateField source="updatedAt" label="Dernière mise à jour" showTime />
        </SimpleShowLayout>
      </Show>
    );
  };