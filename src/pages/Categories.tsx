import { Box, Fab, Grid, Pagination, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '../components';
import { useAppContext } from '../context';
import { CategoryService } from '../services';
import { Category } from '../types';

const Categories = () => {
    const navigate = useNavigate();
    const { setLoading } = useAppContext();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [pageSelected, setPageSelected] = useState<number>(0);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const getCategories = () => {
        setLoading(true);
        CategoryService.getCategories(pageSelected, 9)
            .then((res) => {
                setCategories(res.data.content);
                setCount(res.data.totalPages);
                setPage(res.data.pageable.pageNumber + 1);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getCategories();
    }, [pageSelected]);

    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageSelected(value - 1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <Typography variant="h2" textAlign="center">
                Les catégories
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}
            >
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="add"
                    onClick={() => navigate('/category/create')}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    Ajouter une catégorie
                </Fab>
            </Box>

            {/* Categories */}
            <Grid
                container
                spacing={2}
                sx={{
                    padding: isSmallScreen ? '0 5%' : isMediumScreen ? '0 10%' : '0',
                }}
            >
                {categories?.map((category) => (
                    <Grid
                        item
                        key={category.id}
                        xs={12} // Full width on small screens
                        sm={6} // Two columns on medium screens
                        md={4} // Three columns on large screens
                    >
                        <CategoryCard category={category} />
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {categories?.length !== 0 ? (
                <Pagination
                    count={count}
                    page={page}
                    siblingCount={1}
                    onChange={handleChangePagination}
                    sx={{ marginTop: 3 }}
                />
            ) : (
                <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
                    Aucune catégorie correspondante
                </Typography>
            )}
        </Box>
    );
};

export default Categories;
