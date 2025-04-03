import { title } from "process"
import { Edit, SimpleForm, TextInput, required, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, BooleanInput, ReferenceInput, SelectInput, NumberInput } from "react-admin"

export const TicketEdit = ()=>{
    return(
        <Edit>
        <SimpleForm>
            <NumberInput source="quantity" label="quantité"></NumberInput>
            <NumberInput source="price" label="prix"></NumberInput>
            <SelectInput source="category" choices={[
                "VIP","EARLY BIRD","STANDARD"
            ]} validate={[required()]}></SelectInput>
            <ReferenceInput reference="events" source="event_id">
                <SelectInput optionText={"title"} optionValue="id" label="l'évènement correspondant"validate={[required()]} ></SelectInput>
            </ReferenceInput>
            <BooleanInput source="availablility" label="disponibilité" defaultValue={true}></BooleanInput>
        </SimpleForm>
    </Edit>
    )
}