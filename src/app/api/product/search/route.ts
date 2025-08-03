import { NextRequest, NextResponse } from 'next/server';

import { _productSearch } from 'src/_mock/_product';

// ----------------------------------------------------------------------

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        if (!query) {
            return NextResponse.json(
                { error: 'Search query is required' },
                { status: 400 }
            );
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Search in mock data
        const searchResults = _productSearch.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        );

        if (searchResults.length > 0) {
            return NextResponse.json({
                results: searchResults,
            });
        }

        // Fallback to Product.json if no results in mock data
        try {
            const fs = await import('fs');
            const path = await import('path');

            const productJsonPath = path.join(process.cwd(), 'Product.json');
            const productData = fs.readFileSync(productJsonPath, 'utf8');
            const products = JSON.parse(productData);

            const fallbackResults = products.filter((product: any) =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
            );

            return NextResponse.json({
                results: fallbackResults,
            });
        } catch (fallbackError) {
            console.error('Fallback to Product.json failed:', fallbackError);

            return NextResponse.json({
                results: [],
            });
        }
    } catch (error) {
        console.error('Product search API error:', error);

        return NextResponse.json(
            { error: 'Failed to search products' },
            { status: 500 }
        );
    }
} 