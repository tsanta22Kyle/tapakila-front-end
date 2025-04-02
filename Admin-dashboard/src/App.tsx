import { Admin, Resource } from "react-admin";
import EventIcon from "@mui/icons-material/Event";
import { EventList } from "./components/events/EventList";
import { EventCreate } from "./components/events/EventCreate";
import { EventForm } from "./components/events/EventForm";
import { eventDataProviders } from "./providers/eventDataProvider";

// const dataProvider = async (type: string, resource: string, params: any) => {
//   // console.log('Type:', type); // Cela vous montrera la valeur réelle de `type`.
//   switch (resource) {
//     case 'users':
//       return eventDataProviders[type](params);
//     default:
//       throw new Error(`Unsupported resource: ${resource}`);
//   }
// };
import { TicketList } from "./components/tickets/TicketList";
import { TicketCreate } from "./components/tickets/TicketCreate";
import { AppDataprovider } from "./providers/App_DataProvider";
import { ticketShow } from "./components/tickets/Ticket_show";

const App = () => (
  <Admin dataProvider={AppDataprovider}>
    <Resource
      name="events"
      list={EventList}
      create={EventCreate}
      edit={EventForm}
      icon={EventIcon}
    />
    <Resource
      name="tickets"
      list={TicketList}
      create={TicketCreate}
      edit={EventForm}
      icon={EventIcon}
      show={ticketShow}
    />
  </Admin>
);

export default App;
