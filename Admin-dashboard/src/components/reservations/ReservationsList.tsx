import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  ImageField,
  ReferenceField,
} from "react-admin";

export const ReservationList: React.FC = () => (
  <List>
    <Datagrid>
      <TextField source="title" label="Titre" />
      <TextField source="categoryName" label="Event Category" />
      <DateField source="date" label="Date" />
      {/* <TextField source="place" label="Lieu" /> */}
      {/* <StatusField source="status" label="Statut" /> */}
      <ImageField source="img" label="Image" />
      {/* <EditButton /> */}
      {/* <ShowButton /> */}
      {/* <DeleteButton /> */}
    </Datagrid>
  </List>
);
