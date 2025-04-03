import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ImageField,
} from "react-admin";

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" label="Titre" />
      <TextField source="description" label="Description" />
      <TextField source="eventCategoryId" label="Event Category Indentifier" />
      <DateField source="date" label="Date" />
      <TextField source="place" label="Lieu" />
      <TextField source="category.name" label="Event category" />
      <TextField source="tickets.length" label="Available tickets per category" />
      {/* <TextField source="tickets.category" label="Ticket name" /> */}
      {/* <TextField source="tickets.price" label="Ticket price" /> */}
      {/* <TextField source="status" label="Statut" /> */}
      <ImageField source="img" label="Image" />
    </SimpleShowLayout>
  </Show>
);
