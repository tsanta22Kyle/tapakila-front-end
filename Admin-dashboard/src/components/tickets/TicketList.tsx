import React from "react";
import {
  List,
  useListContext,
  TextField,
  DateField,
  DeleteButton,
  BooleanField,
  NumberField,
  ReferenceField,
  useRecordContext,
  EditButton,
  TopToolbar,
  CreateButton,
  Button,
} from "react-admin";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  useMediaQuery,
  Theme,
  useTheme,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Add, Label } from "@mui/icons-material";
import { useNavigate } from "react-router";
import "./style.css";
const TicketCard: React.FC<{ record: any }> = ({ record }) => {
  if (!record) return null;
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  return (
    <Card
    onClick={()=>{
      navigate('/tickets/'+record.id+'/show')
    }}
      sx={{
        my: 1,
        mx: "auto",
        maxWidth: 800,
        borderRadius: 2,
        boxShadow: 2,
        cursor: "pointer",
        bgcolor: isDark ? "#19202F" : "",

      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="space-between"
        >
          {/* Partie gauche */}
          <Stack spacing={1} flex={1}>
            <Typography variant="h6" component="div">
              <ReferenceField
                reference="events"
                source="eventId"
                record={record}
                link={false}
              >
                <TextField source="title" record={record} />
              </ReferenceField>
            </Typography>
            <Typography variant="body2">
              Catégorie : <TextField source="category" record={record} />
            </Typography>
            <Typography variant="body2">
              Prix :{" "}
              <NumberField
                source="price"
                record={record}
                options={{ style: "currency", currency: "EUR" }}
              />
            </Typography>
            <Typography variant="body2">
              Quantité : <NumberField source="quantity" record={record} />
            </Typography>
          </Stack>

          {/* Partie droite */}
          <Stack spacing={1} flex={1}>
            <Typography variant="body2">
              En vente :{" "}
              <BooleanField
                source="availability"
                record={record}
                TrueIcon={CheckCircleIcon}
                FalseIcon={CancelIcon}
              />
            </Typography>
            <Typography variant="body2">
              Date : <DateField source="date" record={record} />
            </Typography>
            <Box mt={1}>
              <DeleteButton record={record} />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const TicketGrid: React.FC = () => {
  const { data, isLoading } = useListContext();
  if (isLoading) return <div>Chargement...</div>;
  const theme = useTheme();
  const isDark = theme.palette.mode == "dark"
  return (
    <Box sx={{
      bgcolor : isDark?"#0D1821":"",
       border : "1px solid #0D1821"
    }}>
      {data.map((record) => (
        <TicketCard key={record.id} record={record} />
      ))}
    </Box>
  );
};

export const TicketList: React.FC = () => {
      const theme = useTheme();
      const isDark = theme.palette.mode == "dark"
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <List perPage={10} sx={{
      bgcolor : isDark?"#0D1821":"white",
     
    }} actions={<TicketActions />}>
      <TicketGrid />
    </List>
  );
};

const TicketActions = () => (
  <TopToolbar>
    <CreateButton
      sx={{
        bgcolor: "#0D1821",
        mt: 2,
        p: 2,
        color: "white",
      }}
      label="ajouter un ticket"
    ></CreateButton>
  </TopToolbar>
);
