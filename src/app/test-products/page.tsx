'use client';

import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import { useGetProducts } from 'src/api/product';

// ----------------------------------------------------------------------

export default function TestProductsPage() {
    const { products, productsLoading, productsError, productsEmpty } = useGetProducts();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Product API Test
            </Typography>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        API Status
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Loading: {productsLoading ? 'Yes' : 'No'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Error: {productsError ? productsError.message : 'None'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Empty: {productsEmpty ? 'Yes' : 'No'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Products Count: {products?.length || 0}
                    </Typography>
                </CardContent>
            </Card>

            {productsLoading && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <CircularProgress />
                        <Typography>Loading products...</Typography>
                    </CardContent>
                </Card>
            )}

            {productsError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Error loading products: {productsError.message}
                </Alert>
            )}

            {productsEmpty && !productsLoading && (
                <Alert severity="info" sx={{ mb: 3 }}>
                    No products found
                </Alert>
            )}

            {products && products.length > 0 && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Products ({products.length})
                        </Typography>

                        {products.slice(0, 5).map((product, index) => (
                            <Card key={product.id} sx={{ mb: 2, p: 2 }}>
                                <Typography variant="subtitle1">
                                    {index + 1}. {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {product.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ID: {product.id}
                                </Typography>
                            </Card>
                        ))}

                        {products.length > 5 && (
                            <Typography variant="body2" color="text.secondary">
                                ... and {products.length - 5} more products
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            )}
        </Container>
    );
} 