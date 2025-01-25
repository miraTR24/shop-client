import { Box, Fab, Grid, Pagination, Typography, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components';
import { useAppContext } from '../context';
import { ProductService } from '../services';
import { Product } from '../types';

const Products = () => {
    const navigate = useNavigate();
    const { setLoading } = useAppContext();
    const [products, setProducts] = useState<Product[] | null>(null);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [pageSelected, setPageSelected] = useState<number>(0);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const getProducts = () => {
        setLoading(true);
        ProductService.getProducts(pageSelected, 9)
            .then((res) => {
                setProducts(res.data.content);
                setCount(res.data.totalPages);
                setPage(res.data.pageable.pageNumber + 1);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getProducts();
    }, [pageSelected]);

    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageSelected(value - 1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: 2 }}>
            {/* Titre */}
            <Typography variant={isSmallScreen ? 'h4' : 'h2'} textAlign="center">
                Les produits
            </Typography>

            {/* Bouton Ajouter */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    justifyContent: isSmallScreen ? 'center' : 'flex-end',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="add"
                    onClick={() => navigate('/product/create')}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    Ajouter un produit
                </Fab>
            </Box>

            {/* Produits */}
            <Grid
                container
                spacing={isSmallScreen ? 2 : 3}
                sx={{
                    padding: isSmallScreen ? '0 5%' : isMediumScreen ? '0 10%' : '0',
                }}
            >
                {products?.map((product) => (
                    <Grid
                        item
                        key={product.id}
                        xs={12} // Full width on small screens
                        sm={6} // Two columns on medium screens
                        md={4} // Three columns on large screens
                        display="flex"
                        justifyContent="center"
                    >
                        <ProductCard product={product} displayShop={true} />
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {products?.length !== 0 ? (
                <Pagination
                    count={count}
                    page={page}
                    siblingCount={1}
                    onChange={handleChangePagination}
                    sx={{
                        mt: 3,
                        '& .MuiPagination-ul': {
                            justifyContent: 'center',
                        },
                    }}
                />
            ) : (
                <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
                    Aucun produit correspondant
                </Typography>
            )}
        </Box>
    );
};

export default Products;
