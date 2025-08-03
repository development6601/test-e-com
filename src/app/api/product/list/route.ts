import { NextResponse } from 'next/server';

import { _productList } from 'src/_mock/_product';

// ----------------------------------------------------------------------

export async function GET() {
    console.log('Product list API called');

    try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if mock data is available
        if (!_productList || _productList.length === 0) {
            console.error('Mock data is empty or undefined');
            throw new Error('Mock data not available');
        }

        console.log('Mock data length:', _productList.length);
        console.log('First product:', _productList[0]?.name);

        // Return mock data
        return NextResponse.json({
            products: _productList,
        });
    } catch (error) {
        console.error('Product list API error:', error);

        // Fallback to Product.json if API fails
        try {
            const fs = await import('fs');
            const path = await import('path');

            const productJsonPath = path.join(process.cwd(), 'Product.json');
            const productData = fs.readFileSync(productJsonPath, 'utf8');
            const products = JSON.parse(productData);

            console.log('Fallback data length:', products.length);

            return NextResponse.json({
                products,
            });
        } catch (fallbackError) {
            console.error('Fallback to Product.json failed:', fallbackError);

            // Return empty array as last resort
            return NextResponse.json({
                products: [],
            });
        }
    }
} 