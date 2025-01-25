

import { Box, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionButtons, ShopProducts } from '../components';
import { ShopService } from '../services';
import { Shop } from '../types';
import { useAppContext, useToastContext } from '../context';
import { pluralize } from '../utils';

const DAY: Record<number, string> = {
    1: 'Lundi',
    2: 'Mardi',
    3: 'Mercredi',
    4: 'Jeudi',
    5: 'Vendredi',
    6: 'Samedi',
    7: 'Dimanche',
};

const ShopDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setLoading } = useAppContext();
    const { setToast } = useToastContext();
    const [shop, setShop] = useState<Shop | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const getShop = (shopId: string) => {
        ShopService.getShop(shopId).then((res) => {
            // Sort openingHours
            res.data.openingHours = res.data.openingHours.sort((a, b) => a.day - b.day);
            setShop(res.data);
        });
    };

    useEffect(() => {
        id && getShop(id);
    }, [id]);

    const displayHours = (hours: string): string => {
        return moment(hours, 'HH:mm').format('HH:mm');
    };

    const handleDelete = () => {
        setLoading(true);
        id &&
            ShopService.deleteShop(id)
                .then(() => {
                    navigate('/');
                    setToast({ severity: 'success', message: 'La boutique a bien été supprimée' });
                })
                .catch(() => {
                    setToast({ severity: 'error', message: 'Une erreur est survenue lors de la suppression' });
                })
                .finally(() => {
                    setLoading(false);
                });
    };

    const handleEdit = () => {
        navigate(`/shop/edit/${id}`);
    };

    if (!shop) return <></>;

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                padding: { xs: 2, sm: 4 },
                margin: '0 auto',
                maxWidth: '100%',
                width: { xs: '100%', sm: '90%', md: '80%', lg: '90%'},
            }}
        >
            <Box sx={{ marginBottom: { xs: 2, sm: 3 } }}>
                <ActionButtons handleDelete={handleDelete} handleEdit={handleEdit} />
            </Box>

            <Typography
                variant={isMobile ? 'h4' : 'h3'}
                sx={{
                    textAlign: 'center',
                    marginBottom: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
            >
                {shop.name}
            </Typography>

            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Cette boutique comporte {shop.nbProducts} {pluralize('produit', shop.nbProducts)}
            </Typography>
            <Typography sx={{ my: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                {shop.inVacations ? 'En congé actuellement' : "N'est pas en congé actuellement"}
            </Typography>
            <Typography color="text.secondary" sx={{ my: 1, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Boutique créée le : {moment(shop.createdAt).format('DD/MM/YYYY')}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    my: 4,
                }}
            >
                <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 2, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                    Horaires d&apos;ouverture :
                </Typography>
                {shop.openingHours.map((openingHour) => (
                    <Box
                        key={openingHour.id}
                        sx={{
                            width: '100%',
                            maxWidth: '500px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mb: 1,
                        }}
                    >
                        <Typography sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                            {DAY[openingHour.day]}
                        </Typography>
                        <Typography sx={{ mb: 1.5, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                            {displayHours(openingHour?.openAt)} - {displayHours(openingHour?.closeAt)}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ textAlign: 'center', mb: 2, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                Les produits :
            </Typography>
            {id && <ShopProducts shopId={id} />}
        </Paper>
    );
};

export default ShopDetails;

