import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import SwitchLanguage from './SwitchLanguage';

type Props = {
    children: JSX.Element;
};

const navItems = [
    { label: 'Boutiques', path: '/' },
    { label: 'Produits', path: '/product' },
    { label: 'Catégories', path: '/category' },
];

const Layout = ({ children }: Props) => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderDrawerContent = (
        <List>
            {navItems.map((item) => (
                <ListItem
                    key={item.label}
                    button
                    onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                    }}
                >
                    <ListItemText primary={item.label} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <div>
            <AppBar component="nav" className='header'>
                <Toolbar>
                    {/* Bouton pour mobile */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Titre et navigation desktop */}
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Gestion de boutiques
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                sx={{ color: '#fff' }}
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Langue ou autres actions */}
                    <SwitchLanguage />
                </Toolbar>
            </AppBar>

            {/* Drawer pour mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Améliore les performances sur les appareils mobiles
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {renderDrawerContent}
            </Drawer>

            {/* Loader et contenu principal */}
            <Loader />
            <Box sx={{ mt: 10 }}>{children}</Box>
        </div>
    );
};

export default Layout;
