import { Admin, Resource } from "react-admin";
import { dataProvider } from "./providers/dataProvider";
import EventIcon from "@mui/icons-material/Event";
import { EventList } from "./components/events/EventList";
import { EventCreate } from "./components/events/EventCreate";
import { EventForm } from "./components/events/EventForm";

const App = () => (
  <Admin dataProvider={dataProvider}>
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
