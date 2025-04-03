import { Admin, Resource } from "react-admin";
import EventIcon from "@mui/icons-material/Event";
import { EventList } from "./components/events/EventList";
import { EventCreate } from "./components/events/EventCreate";
import { EventForm } from "./components/events/EventForm";
import { eventDataProviders } from "./providers/eventDataProvider";
import { UserList } from "./components/user/UserList";
import { UserEdit } from "./components/user/UserEdit";

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
import { TicketEdit } from "./components/tickets/TicketUpdate";
import { authProvider } from "./providers/authProvider";
import MyLoginPage from "./MyLoginPage";

const App = () => (
  <Admin dataProvider={AppDataprovider}
  authProvider={authProvider}  
  loginPage={MyLoginPage} 
         >
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
      edit={TicketEdit}
      icon={EventIcon}
      show={ticketShow}
      
    />
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
    
    />
  </Admin>
);

export default App;
