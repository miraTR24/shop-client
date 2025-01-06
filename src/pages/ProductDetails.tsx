import { Paper, Typography, Box } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActionButtons } from '../components';
import { useAppContext, useToastContext } from '../context';
import { ProductService } from '../services';
import { FormattedProduct, Product } from '../types';
import { formatterLocalizedProduct, priceFormatter } from '../utils';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setLoading, locale } = useAppContext();
    const { setToast } = useToastContext();
    const [product, setProduct] = useState<Product | null>(null);
    const [formattedProduct, setFormattedProduct] = useState<FormattedProduct | null>();

    const getProduct = (productId: string) => {
        ProductService.getProduct(productId).then((res) => {
            setProduct(res.data);
        });
    };

    useEffect(() => {
        id && getProduct(id);
    }, [id]);

    useEffect(() => {
        product && setFormattedProduct(formatterLocalizedProduct(product, locale));
    }, [locale, product]);

    const handleDelete = () => {
        setLoading(true);
        id &&
            ProductService.deleteProduct(id)
                .then(() => {
                    navigate('/product');
                    setToast({ severity: 'success', message: 'Le produit a bien été supprimé' });
                })
                .catch(() => {
                    setToast({ severity: 'error', message: 'Une erreur est survenue lors de la suppression' });
                })
                .finally(() => {
                    setLoading(false);
                });
    };

    const handleEdit = () => {
        navigate(`/product/edit/${id}`);
    };

    if (!formattedProduct) return <></>;

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
                {formattedProduct.name}
            </Typography>

            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Prix : {priceFormatter(formattedProduct.price)}
            </Typography>

            {formattedProduct.description && (
                <Typography  color="text.secondary" sx={{ mt: 1.5,fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Description : {formattedProduct.description}
                </Typography>
            )}

            <Typography sx={{ fontSize: {mt: 1.5, xs: '0.9rem', sm: '1rem' } }}>
                Boutique :{' '}
                {formattedProduct.shop?.name ? (
                    <Link to={`/shop/${formattedProduct.shop?.id}`} style={{ color: '#607d8b' }}>
                        {formattedProduct.shop?.name}
                    </Link>
                ) : (
                    "N'appartient à aucune boutique"
                )}
            </Typography>

            <Typography sx={{ mt: 1.5, fontStyle: 'italic' ,fontSize: { xs: '0.9rem', sm: '1rem' } }} >
                Catégories : {''}
                {formattedProduct.categories.length === 0
                    ? 'Aucune'
                    : formattedProduct.categories.map((cat, index) => (
                          <Fragment key={cat.id}>
                              <Link to={`/category/${cat.id}`} style={{ color: '#607d8b' }}>
                                  {cat.name}
                              </Link>
                              <span>{index === formattedProduct.categories.length - 1 ? '' : ', '}</span>
                          </Fragment>
                      ))}
            </Typography>
        </Paper>
    );
};

export default ProductDetails;
