import { Layout } from 'react-admin';
import { AppBar, Toolbar, Typography } from '@mui/material';

export const AppLayout = (props: any) => (
  <Layout
    {...props}
    appBar={() => (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administration des Événements
          </Typography>
        </Toolbar>
      </AppBar>
    )}
  />
);