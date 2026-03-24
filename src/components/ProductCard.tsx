import { Link } from "react-router-dom";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: node.title });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="rounded-xl overflow-hidden bg-card border border-border/50 transition-all duration-300 hover:border-primary/30 hover:glow-red">
        <div className="aspect-square bg-secondary/30 overflow-hidden">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-8 w-8" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading font-semibold text-sm truncate">{node.title}</h3>
          <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{node.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-heading font-bold text-primary text-lg">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant?.availableForSale}
              className="rounded-full h-8 px-3 text-xs"
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <><ShoppingCart className="h-3 w-3 mr-1" />Add</>}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
