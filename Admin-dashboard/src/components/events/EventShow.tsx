import { Show, SimpleShowLayout, TextField, DateField, ImageField } from 'react-admin';

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <DateField source="date" label="Date" />
      <TextField source="location" label="Lieu" />
      <TextField source="status" label="Statut" />
      <ImageField source="image" label="Image" />
    </SimpleShowLayout>
  </Show>
);