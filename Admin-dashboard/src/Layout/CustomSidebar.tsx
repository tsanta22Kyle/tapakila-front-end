import {
  Menu,
  MenuItemLink,
  useSidebarState,
  useResourceDefinitions,
} from "react-admin";
import {
  Dashboard,
  Event,
  ConfirmationNumber,
  PeopleAlt,
  AddCircle,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Badge,
  ListItemIcon,
  IconButton,
  styled,
} from "@mui/material";
import { useResourceCount } from "./resourceHandler";
import { useNavigate } from "react-router";

// Custom styled wrapper
const SidebarWrapper = styled(Box)(({ theme }) => {
  const [open] = useSidebarState();
  return {
    backgroundColor: "#0D1821",
    color: "white",
    height: "100vh",
    padding: theme.spacing(2),
    
    width: open ? 240 : 55,
    transition: "width 0.3s ease",

    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
    overflowY: "auto",
    zIndex: 1100,
    display: "flex",
    flexDirection: "column",
    // justifyContent : "start",
    alignItems : "center"
  };
});


const StyledMenuItem = styled(MenuItemLink)(({ theme }) => {
    const [open] = useSidebarState();
    
    
    return({
  borderRadius: "12px",
  marginBottom: theme.spacing(1),
  backgroundColor: "#161B22",
  "&:hover": {
    backgroundColor: "#415c82",
  },
  color: "white",
  ".RaMenuItemLink-icon": {
    color: "white",
  },
  "&.RaMenuItemLink-active": {
    backgroundColor: "#415c82",
    // borderLeft: '4px solid #3fb950',
  },
})});
const StyledMenu = styled(Menu)(({theme})=>{
    const [open] = useSidebarState();
return(
    {
        // background : "black",
        width : open?"100%":55,
        margin : 0

    }
)


})

const CustomSidebar = (props) => {
  const navigate = useNavigate();
  const [open] = useSidebarState();
  const resources = useResourceDefinitions();
  const { count: eventCount, loading } = useResourceCount("events");

  return (
    <SidebarWrapper>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#fff", textAlign: "center" ,opacity : open?1:0}}
      >
        Menu
      </Typography>

      <StyledMenu {...props} dense >
        <StyledMenuItem
          to="/"
          primaryText="Dashboard"
          leftIcon={<Dashboard />}
        />

        {/* Tasks avec badge et bouton + */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}
        >
          <StyledMenuItem
            to="/events"
            primaryText="events"
            leftIcon={<Event />}
          />
          <Badge badgeContent={eventCount} color="primary" />
          <IconButton
            onClick={() => {
              navigate("/events/create");
            }}
            size="small"
            sx={{ color: "white" }}
          >
            <AddCircle fontSize="small" />
          </IconButton>
        </Box>

        <StyledMenuItem
          to="/tickets"
          primaryText="Tickets"
          leftIcon={<ConfirmationNumber />}
        />
        <StyledMenuItem
          to="/users"
          primaryText="Users"
          leftIcon={<PeopleAlt />}
        />
      </StyledMenu>
    </SidebarWrapper>
  );
};

export default CustomSidebar;
