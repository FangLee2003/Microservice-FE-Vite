import {useState} from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {products} from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import useBookApi from "../../../hooks/useBookApi";

// ----------------------------------------------------------------------

export default function ProductsView() {
    const {get} = useBookApi();
    const data = get.useQuery();

    if (data.isLoading) {
        console.log('Loading data...');
    } else if (data.isError) {
        console.error('An error occurred:', data.error);
    } else if (data.isSuccess) {
        console.log('Data:', data);
    } else {
        console.log('Data is uninitialized or fetching.');
    }

    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <Container>
            <Typography variant="h4" sx={{mb: 5}}>
                Products
            </Typography>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{mb: 5}}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{my: 1}}>
                    <ProductFilters
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                    />

                    <ProductSort/>
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid key={product.id} xs={12} sm={6} md={3}>
                        <ProductCard product={product}/>
                    </Grid>
                ))}
            </Grid>

            <ProductCartWidget/>
        </Container>
    );
}
