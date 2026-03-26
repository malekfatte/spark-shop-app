import { Link } from "react-router-dom";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

import { Plus, Loader2, ArrowRight } from "lucide-react";
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
      className="h-full"
    >
      <Link to={`/product/${node.handle}`} className="group block h-full">
        <div className="card-premium card-premium-hover rounded-2xl overflow-hidden h-full flex flex-col">
          <div className="aspect-[4/5] overflow-hidden relative flex-shrink-0 bg-secondary/30">
            {image ? (
              <img
                src={image.url}
                alt={image.altText || node.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4 mix-blend-multiply"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/40 to-secondary/10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-primary/40" />
                </div>
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {node.title}
              </h3>
              <span className="font-display font-bold text-lg text-navy whitespace-nowrap">
                ${parseFloat(price.amount).toFixed(0)}
              </span>
            </div>
            <p className="text-muted-foreground text-xs line-clamp-2 font-body font-light leading-relaxed flex-1">
              {node.description}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
              <span className="font-body text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary/70 transition-colors">
                View Details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
              <button
                onClick={handleAddToCart}
                disabled={isLoading || !firstVariant?.availableForSale}
                className="rounded-full h-9 w-9 flex items-center justify-center bg-primary/60 hover:bg-primary/80 text-primary-foreground transition-all duration-300 disabled:opacity-40 shadow-sm hover:shadow-md hover:scale-105"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
