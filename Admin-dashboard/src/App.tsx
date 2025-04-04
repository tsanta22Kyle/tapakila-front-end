import { Admin, LoginWithEmail, Resource } from "react-admin";
import EventIcon from "@mui/icons-material/Event";
import { EventList } from "./components/events/EventList";
import { EventCreate } from "./components/events/EventCreate";

import { EventShow } from "./components/events/EventShow";

import { UserList } from "./components/user/UserList";
import { UserEdit } from "./components/user/UserEdit";

import { TicketList } from "./components/tickets/TicketList";
import { TicketCreate } from "./components/tickets/TicketCreate";
import { AppDataprovider } from "./providers/App_DataProvider";
import { ticketShow } from "./components/tickets/Ticket_show";
import { TicketEdit } from "./components/tickets/TicketUpdate";
import { authProvider } from "./providers/authProvider";
import { UserCreate } from "./components/user/UserCreate";
import { EventEdit } from "./components/events/EventEdit";
import { ReservationList } from "./components/reservations/ReservationsList";
import { UserShow } from "./components/user/UserShow";

const App = () => (
  <Admin
    dataProvider={AppDataprovider}
    authProvider={authProvider} // Add auth provider
    loginPage={LoginWithEmail}
  >
    <Resource
      name="events"
      list={EventList}
      create={EventCreate}
      edit={EventEdit}
      icon={EventIcon}
      show={EventShow}
    />
    <Resource
      name="tickets"
      list={TicketList}
      create={TicketCreate}
      edit={TicketEdit}
      icon={EventIcon}
      show={ticketShow}
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      show={UserShow}
    />
    <Resource
      name="reservations"
      list={ReservationList}
    />
  </Admin>
);

export default App;
