import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

export async function getFallbackProducts(): Promise<IProductItem[]> {
    try {
        // In a real application, this would be a server-side function
        // For now, we'll return an empty array as the API routes handle the fallback
        return [];
    } catch (error) {
        console.error('Failed to load fallback products:', error);
        return [];
    }
}

export async function getFallbackProduct(productId: string): Promise<IProductItem | null> {
    try {
        // In a real application, this would be a server-side function
        // For now, we'll return null as the API routes handle the fallback
        return null;
    } catch (error) {
        console.error('Failed to load fallback product:', error);
        return null;
    }
}

export async function searchFallbackProducts(query: string): Promise<IProductItem[]> {
    try {
        // In a real application, this would be a server-side function
        // For now, we'll return an empty array as the API routes handle the fallback
        return [];
    } catch (error) {
        console.error('Failed to search fallback products:', error);
        return [];
    }
} 