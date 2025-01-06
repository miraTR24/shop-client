import { CategoryService, ProductService } from '../services';
import { useEffect, useState } from 'react';
import { Category, Product, ResponseArray } from '../types';
import { Box, FormControl, Grid, Pagination, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { useAppContext } from '../context';
import SelectPaginate from './SelectPaginate';

type Props = {
    shopId: string;
};

const ShopProducts = ({ shopId }: Props) => {
    const { setLoading } = useAppContext();
    const [products, setProducts] = useState<Product[] | null>(null);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [pageSelected, setPageSelected] = useState<number>(0);
    const [filter, setFilter] = useState<Category | null>(null);

    const getProducts = () => {
        setLoading(true);
        let promisedProducts: Promise<ResponseArray<Product>>;

        if (filter && filter.name !== 'Toutes les catégories') {
            promisedProducts = ProductService.getProductsbyShopAndCategory(shopId, filter.id, pageSelected, 6);
        } else {
            promisedProducts = ProductService.getProductsbyShop(shopId, pageSelected, 6);
        }

        promisedProducts
            .then((res) => {
                setProducts(res.data.content);
                setCount(res.data.totalPages);
                setPage(res.data.pageable.pageNumber + 1);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        getProducts();
    }, [shopId, pageSelected, filter]);

    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageSelected(value - 1);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            {/* Filters */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: 'wrap', // Make filter responsive on small screens
                }}
            >
                <FormControl sx={{ minWidth: 220, width: '100%', maxWidth: 300 }}>
                    <SelectPaginate
                        value={filter}
                        onChange={setFilter}
                        placeholder="Catégorie"
                        refetch={CategoryService.getCategories}
                        defaultLabel="Toutes les catégories"
                    />
                </FormControl>
            </Box>

            {/* Product Grid */}
            <Grid container alignItems="center" rowSpacing={3} columnSpacing={3}>
                {products?.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}> {/* Adjust grid to take full width on xs */}
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {products?.length !== 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 3 }}>
                    <Pagination
                        count={count}
                        page={page}
                        siblingCount={1}
                        onChange={handleChangePagination}
                        variant="outlined"
                    />
                </Box>
            ) : (
                <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
                    Aucun produit correspondant
                </Typography>
            )}
        </Box>
    );
};

export default ShopProducts;
