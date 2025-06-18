import React from "react";
import {
  List,
  TextField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
  useListContext,
} from "react-admin";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export const EventList = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <List >
      <EventCards />
    </List>
  );
};

const EventCards = () => {
  const { data } = useListContext();

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
      gap={3}
      p={2}
    >
      {data?.map((record) => (
        <Card
          key={record.id}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            boxShadow: 3,
            overflow: "hidden",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: 6,
            },
          }}
        >
         <CardMedia
  component="img"
  height="160"
  image={record.img}
  alt={record.title}
  sx={{
    objectFit: "contain", // ou "contain" selon ton besoin
    width: "100%",
  }}
/>

          <CardContent>
            <Typography variant="h6" noWrap>
              {record.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Lieu : {record.place}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date : {new Date(record.date).toLocaleDateString()}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
            <ShowButton record={record} />
            <EditButton record={record} />
            <DeleteButton record={record} />
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};
