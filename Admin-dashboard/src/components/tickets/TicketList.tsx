import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  DeleteButton,
  ImageField,
  BooleanField,
  NumberField
} from 'react-admin';
// import { StatusField } from '';

export const TicketList: React.FC = () => (
    <List>
    <Datagrid>
      <TextField source='title' />
      <TextField source='category' />
      <NumberField source='price' />
      <NumberField source='quantity' />
      <BooleanField source='availability' ></BooleanField>
      <DateField source='date'></DateField>
    </Datagrid>
  </List>
);