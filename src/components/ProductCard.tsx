import { Link } from "react-router-dom";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
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
    toast.success("Added to cart", { description: node.title, position: "top-center" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full"
    >
      <Link to={`/product/${node.handle}`} className="group block h-full">
        <div className="h-full flex flex-col">
          {/* Image — clean, edge-to-edge, rounded */}
          <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-card">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/40 to-secondary/10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary/40" />
                </div>
              </div>
            )}
            {/* Quick add overlay on hover */}
            <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isLoading || !firstVariant?.availableForSale}
                className="w-full rounded-full h-9 text-xs font-body backdrop-blur-sm"
              >
                {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <><ShoppingCart className="h-3 w-3 mr-1.5" />Add to Cart</>}
              </Button>
            </div>
          </div>

          {/* Info — clean like Heilys: name + price */}
          <div className="pt-3 pb-1 flex flex-col gap-0.5">
            <h3 className="font-display font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {node.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base text-foreground">
                ${parseFloat(price.amount).toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
