import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from '@/lib/shopify';

export function useProducts(first = 50) {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['shopify-products', first],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first });
      const edges: ShopifyProduct[] = data?.data?.products?.edges || [];
      
      // Prioritize wearables (masks, mats, bags, belts, wraps, bulbs) before panels
      const wearableKeywords = ['mask', 'cap', 'mat', 'bag', 'belt', 'wrap', 'bulb', 'go2', 'sleeping'];
      const isWearable = (title: string) => 
        wearableKeywords.some(k => title.toLowerCase().includes(k));
      
      return [
        ...edges.filter(e => isWearable(e.node.title)),
        ...edges.filter(e => !isWearable(e.node.title)),
      ];
    },
  });
}
