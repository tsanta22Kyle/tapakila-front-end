import React from "react";
import { Create, SimpleForm } from "react-admin";
import { EventForm } from "./EventForm";

export const EventCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <EventForm />
    </SimpleForm>
  </Create>
);
