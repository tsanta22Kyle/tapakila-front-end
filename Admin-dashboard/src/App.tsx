import { Admin, Resource, AuthProvider } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import EventIcon from "@mui/icons-material/Event";
import { EventList } from "./components/events/EventList";
import { EventCreate } from "./components/events/EventCreate";
import { EventForm } from "./components/events/EventForm";
import { authProvider } from "./providers/authProvider";
import MyLoginPage from "./MyLoginPage";

const App = () => (
  <Admin 
  dataProvider={dataProvider}
  authProvider={authProvider}  // Add auth provider
  loginPage={MyLoginPage}     // Optional custom login page
>
  <Resource
    name="events"
    list={EventList}
    create={EventCreate}
    edit={EventForm}
    icon={EventIcon}
  />
</Admin>
);

export default App;
