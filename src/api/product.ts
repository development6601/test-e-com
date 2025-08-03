import useSWR from 'swr';
import { useMemo } from 'react';

import { apiFetcher, endpoints } from 'src/utils/axios';

import { IProductItem } from 'src/types/product';

// ----------------------------------------------------------------------

export function useGetProducts() {
  const URL = endpoints.product.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, apiFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 3,
    onError: (err) => {
      console.error('useGetProducts error:', err);
    },
    onSuccess: (data) => {
      console.log('useGetProducts success:', data);
    }
  });

  const memoizedValue = useMemo(
    () => ({
      products: (data?.products as IProductItem[]) || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.products?.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// export function useGetProduct(productId: string) {
//   const URL = productId ? [endpoints.product.details, { params: { productId } }] : '';

//   const { data, isLoading, error, isValidating } = useSWR(URL, apiFetcher, {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//     errorRetryCount: 3,
//     onError: (err) => {
//       console.error('useGetProduct error:', err);
//     },
//     onSuccess: (data) => {
//       console.log('useGetProduct success:', data);
//     }
//   });

//   const memoizedValue = useMemo(
//     () => ({
//       product: data?.product as IProductItem,
//       productLoading: isLoading,
//       productError: error,
//       productValidating: isValidating,
//     }),
//     [data?.product, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const URL = query ? [endpoints.product.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, apiFetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 3,
    onError: (err) => {
      console.error('useSearchProducts error:', err);
    },
    onSuccess: (data) => {
      console.log('useSearchProducts success:', data);
    }
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IProductItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results?.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
