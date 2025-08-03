import { forwardRef } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

interface ProductCardProps {
    product: IProductItem;
    onClick?: () => void;
}

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
    ({ product, onClick }, ref) => {
        return (
            <Card
                ref={ref}
                sx={{
                    p: 2,
                    width: 200,
                    cursor: onClick ? 'pointer' : 'default',
                    '&:hover': onClick ? {
                        boxShadow: (theme) => theme.customShadows.z24,
                    } : {},
                }}
                onClick={onClick}
            >
                <Stack spacing={2}>
                    <Avatar
                        src={product.coverUrl}
                        variant="rounded"
                        sx={{ width: '100%', height: 120 }}
                    />

                    <Stack spacing={1}>
                        <Typography variant="subtitle2" noWrap>
                            {product.name}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            {product.category}
                        </Typography>

                        <Typography variant="subtitle1" color="primary">
                            ${product.price}
                        </Typography>

                        {product.priceSale && (
                            <Typography variant="caption" color="error" sx={{ textDecoration: 'line-through' }}>
                                ${product.priceSale}
                            </Typography>
                        )}
                    </Stack>

                    {onClick && (
                        <Button size="small" variant="outlined">
                            View Details
                        </Button>
                    )}
                </Stack>
            </Card>
        );
    }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard; 