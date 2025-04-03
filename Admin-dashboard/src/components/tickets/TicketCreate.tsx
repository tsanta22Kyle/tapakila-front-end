import { AutocompleteInput, Create, DateInput, NumberInput, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

export const TicketCreate : React.FC = ()=>(
    <Create>
    <SimpleForm>
        <ReferenceInput 
        source="eventId" 
        reference="events" 
        label="Événement"
        >
        <SelectInput
          optionText="title"  
          optionValue="id"    
            // filterToQuery={searchText => ({ title: searchText })} 
          validate={[required()]}
        label="select an event "
        />
      </ReferenceInput>
        <NumberInput source="quantity"></NumberInput>
        <NumberInput source="limit"></NumberInput>

        <DateInput label="ticket date" source="date" defaultValue={new Date()} />
       
        <SelectInput label="catégorie" source="category" validate={[required()]} choices={[
            "VIP","EARLY BIRD","STANDARD"
        ]} />

        <NumberInput source="price"></NumberInput>

    </SimpleForm>
</Create>
)