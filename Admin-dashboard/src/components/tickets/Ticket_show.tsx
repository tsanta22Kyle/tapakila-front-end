import { ReferenceField, Show, SimpleShowLayout, TextField } from "react-admin";

export const ticketShow = () => {
  return (
    <Show>
      <SimpleShowLayout>

        <ReferenceField reference={"events"} source={"eventId"} label={"évènement"}>
        <TextField source="title" />
            
        </ReferenceField>
        <TextField source="category" />
      </SimpleShowLayout>
    </Show>
  );
};
