import Cancel from "@mui/icons-material/Cancel";
import CheckCircle from "@mui/icons-material/CheckCircle";
import React from "react";
import "./style.css";
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
  NumberField,
  useRecordContext,
  ReferenceField,
} from "react-admin";
import { styled } from "@mui/material";
// import { StatusField } from '';

export const TicketList: React.FC = () => (
  <List>
    <Datagrid  className="wrapper" >
      <ReferenceField reference="events" source="eventId" link={false}>
      <TextField source="title"  />
        
      </ReferenceField>
      <TextField source="category" />
      <NumberField source="price" />
      <NumberField source="quantity" />
      <BooleanField
        source="availability"
        label="En vente"
        TrueIcon={CheckCircle}
        FalseIcon={Cancel}
      />
      <DateField source="date"></DateField>
      <DeleteButton></DeleteButton>
    </Datagrid>
  </List>
);
