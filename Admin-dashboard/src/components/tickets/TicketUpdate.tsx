import { title } from "process"
import { Edit, SimpleForm, TextInput, required, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, BooleanInput, ReferenceInput, SelectInput, NumberInput } from "react-admin"

export const TicketEdit = ()=>{
    return(
        <Edit
        transform={(data) => ({
            ...data,
            event: undefined, 
            eventId: data.eventId || data.event?.id 
          })}>
        <SimpleForm>
            <NumberInput source="quantity" label="quantité"></NumberInput>
            <NumberInput source="price" label="prix"></NumberInput>
            <SelectInput source="category" choices={[
                "VIP","EARLY BIRD","STANDARD"
            ]} validate={[required()]}></SelectInput>
             <ReferenceInput 
      reference="events" 
      source="eventId" 
    >
      <SelectInput 
        optionText="title"
        optionValue="id"
        label="Événement correspondant"
        validate={[required()]}
      />
    </ReferenceInput>
            <BooleanInput source="availablility" label="disponibilité" defaultValue={true}></BooleanInput>
        </SimpleForm>
    </Edit>
    )
}