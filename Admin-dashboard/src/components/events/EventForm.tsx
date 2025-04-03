import React from "react";
import {
  TextInput,
  DateInput,
  SelectInput,
  required,
  ImageField,
  useGetIdentity,
} from "react-admin";

export const EventForm: React.FC = () => {
  const { identity } = useGetIdentity();
  return (
    <>
      <TextInput
        source="title"
        label="Titre"
        fullWidth
        validate={[required()]}
      />
      <TextInput
        source="description"
        label="Description"
        multiline
        fullWidth
        validate={[required()]}
      />
      <DateInput
        source="date"
        label="Date et heure"
        fullWidth
        validate={[required()]}
      />
      <TextInput
        source="place"
        label="Lieu"
        fullWidth
        validate={[required()]}
      />
      <TextInput
        source="userId"
        label="User identifier"
        fullWidth
        validate={[required()]}
        defaultValue={identity?.id}
        disabled
      />
      <SelectInput
        source="eventCategoryId"
        label="Event category"
        choices={[
          {
            id: 1,
            name: `Sports`,
          },
          {
            id: 2,
            name: `Loisirs`,
          },
          {
            id: 3,
            name: `Arts`,
          },
          {
            id: 4,
            name: `Literature`,
          },
          {
            id: 5,
            name: `Patrimoine`,
          },
          {
            id: 6,
            name: `Foires`,
          },
          {
            id: 7,
            name: `Séminaires`,
          },
          {
            id: 8,
            name: `Concert`,
          },
          {
            id: 9,
            name: `Spéctacles`,
          },
        ]}
        validate={[required()]}
      />
      <TextInput
        type="url"
        source="img"
        label="Url of the image"
        fullWidth
        validate={[required()]}
      />
    </>
  );
};
