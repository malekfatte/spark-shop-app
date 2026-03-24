import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from '@/lib/shopify';

export function useProducts(first = 50) {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['shopify-products', first],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first });
      return data?.data?.products?.edges || [];
    },
  });
}
