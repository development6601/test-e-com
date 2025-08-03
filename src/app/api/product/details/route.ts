import { NextRequest, NextResponse } from 'next/server';

import { _productList } from 'src/_mock/_product';

// ----------------------------------------------------------------------

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('productId');

        if (!productId) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Find product in mock data
        const product = _productList.find((item) => item.id === productId);

        if (product) {
            return NextResponse.json({
                product,
            });
        }

        // Fallback to Product.json if product not found in mock data
        try {
            const fs = await import('fs');
            const path = await import('path');

            const productJsonPath = path.join(process.cwd(), 'Product.json');
            const productData = fs.readFileSync(productJsonPath, 'utf8');
            const products = JSON.parse(productData);

            const fallbackProduct = products.find((item: any) => item.id === productId);

            if (fallbackProduct) {
                return NextResponse.json({
                    product: fallbackProduct,
                });
            }

            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        } catch (fallbackError) {
            console.error('Fallback to Product.json failed:', fallbackError);

            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Product details API error:', error);

        return NextResponse.json(
            { error: 'Failed to fetch product details' },
            { status: 500 }
        );
    }
} 