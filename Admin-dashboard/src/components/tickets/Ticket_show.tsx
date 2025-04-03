import { DateField, NumberField, ReferenceField, Show, SimpleShowLayout, TextField } from "react-admin";

export const ticketShow = () => {
  return (
    <Show>
      <SimpleShowLayout>

        <ReferenceField reference={"events"} source={"eventId"} label={"évènement"} link={false}>
        <TextField source="title" />
        </ReferenceField>
        <TextField source="category" label="catégorie" />
        <NumberField source="quantity" label = "quantité disponible"></NumberField>
        <NumberField source="limit" label = "limite par utilisateur"></NumberField>

        <DateField source="date"></DateField>
      </SimpleShowLayout>
    </Show>
  );
};
