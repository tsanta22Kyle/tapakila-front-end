import {
    AppBar,
    useGetIdentity,
    useLogout,
    useSidebarState
} from 'react-admin';
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import React from 'react';

const CustomAppBar = (props) => {
    const { data: identity } = useGetIdentity();
    const logout = useLogout();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    // const open1 = open;
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [open] = useSidebarState();
    return (
        <AppBar
            {...props}
            sx={{
                backgroundColor: '#fff',
                color: '#000',
                boxShadow: 'none',
                height: '64px',
                paddingX: 3,
                display: 'flex',
                justifyContent: 'center',
                zIndex: 1200, // pour être au-dessus du main content
                width: open?`calc(100% - 240px)`:`calc(100% - 55px)`,
                marginLeft: '250px', // pour coller à droite
                borderBottom: '1px solid #eee',
                transition: "width .3s ease"
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                <Typography variant="body2" color="textSecondary">Hello {identity?.fullName}</Typography>

                <Box display="flex" alignItems="center" gap={1}>
                    {/* <Typography variant="body2" color="primary">
                        {identity?.fullName || 'User'}
                    </Typography> */}

                    {/* <IconButton onClick={handleClick}>
                        <Avatar src={identity?.avatar || 'https://i.pravatar.cc/300'} />
                    </IconButton> */}

                    <Menu
                        anchorEl={anchorEl}
                        open={open1}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={() => logout()}>Se déconnecter</MenuItem>
                    </Menu>
                </Box>
            </Box>
        </AppBar>
    );
};

export default CustomAppBar;
