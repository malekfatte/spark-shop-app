import { Link } from "react-router-dom";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ArrowRight } from "lucide-react";
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link to={`/product/${node.handle}`} className="group block">
        <div className="card-premium card-premium-hover rounded-2xl overflow-hidden">
          <div className="aspect-[4/5] bg-secondary/20 overflow-hidden relative">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/40 to-secondary/10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary/40" />
                </div>
              </div>
            )}
            {/* Price badge */}
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md rounded-full px-3 py-1.5">
              <span className="font-display font-bold text-sm text-foreground">
                ${parseFloat(price.amount).toFixed(0)}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-display font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-300">
              {node.title}
            </h3>
            <p className="text-muted-foreground text-xs mt-2 line-clamp-2 font-body font-light leading-relaxed">
              {node.description}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
              <span className="font-body text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary/70 transition-colors">
                View Details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={isLoading || !firstVariant?.availableForSale}
                className="rounded-full h-9 px-4 text-xs font-body"
              >
                {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <><ShoppingCart className="h-3 w-3 mr-1.5" />Add</>}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
