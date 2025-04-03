import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  ImageField
} from "react-admin"
import { StatusField } from './StatusField';

export const EventList: React.FC = () => (
  <List>
    <Datagrid>
      <TextField source="title" label="Titre" />
      <DateField source="date" label="Date" />
      <TextField source="place" label="Lieu" />
      {/* <StatusField source="status" label="Statut" /> */}
      <ImageField source="img" label="Image" />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
