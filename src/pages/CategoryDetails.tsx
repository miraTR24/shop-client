import { Paper, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext, useToastContext } from '../context';
import { CategoryService } from '../services';
import { Category } from '../types';
import { ActionButtons } from '../components';

const CategoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setLoading } = useAppContext();
    const { setToast } = useToastContext();
    const [category, setCategory] = useState<Category | null>(null);

    const getCategory = (categoryId: string) => {
        CategoryService.getCategory(categoryId).then((res) => {
            setCategory(res.data);
        });
    };

    useEffect(() => {
        id && getCategory(id);
    }, [id]);

    const handleDelete = () => {
        setLoading(true);
        id &&
            CategoryService.deleteCategory(id)
                .then(() => {
                    navigate('/category');
                    setToast({ severity: 'success', message: 'La catégorie a bien été supprimée' });
                })
                .catch(() => {
                    setToast({ severity: 'error', message: 'Une erreur est survenue lors de la suppression' });
                })
                .finally(() => {
                    setLoading(false);
                });
    };

    const handleEdit = () => {
        navigate(`/category/edit/${id}`);
    };

    if (!category) return <></>;

    return (
        <Paper
            elevation={1}
            sx={{
                position: 'relative',
                padding: { xs: 2, sm: 4 },
                maxWidth: '600px',
                margin: '0 auto',
            }}
        >
            <Box sx={{ marginBottom: { xs: 6, sm: 3 } }}> {/* Added margin bottom */}
                <ActionButtons handleDelete={handleDelete} handleEdit={handleEdit} />
            </Box>

            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    marginBottom: { xs: 2, sm: 3 },
                }}
            >
                {category.name}
            </Typography>
        </Paper>
    );
};

export default CategoryDetails;
