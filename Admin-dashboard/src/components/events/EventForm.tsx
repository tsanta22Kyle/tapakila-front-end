import React from 'react';
import {
  TextInput,
  DateInput,
  SelectInput,
  ImageInput,
  required,
  ImageField
} from 'react-admin';

export const EventForm: React.FC = () => (
  <>
    <TextInput source="title" label="Titre" fullWidth validate={[required()]} />
    <TextInput source="description" label="Description" multiline fullWidth validate={[required()]} />
    <DateInput source="date" label="Date et heure" fullWidth validate={[required()]} />
    <TextInput source="location" label="Lieu" fullWidth validate={[required()]} />
    <SelectInput
      source="status"
      label="Statut"
      choices={[
        { id: 'draft', name: 'Brouillon' },
        { id: 'published', name: 'Publié' },
        { id: 'cancelled', name: 'Annulé' },
      ]}
      validate={[required()]}
    />
  <ImageInput 
  source="image" 
  label="Image" 
  accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}
>
  <ImageField source="src" title="title" />
</ImageInput>
  </>
);