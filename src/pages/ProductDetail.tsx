import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Loader2, Minus, Plus, Shield } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.productByHandle;
    },
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground font-body">Product not found</p>
        <Link to="/"><Button variant="outline" className="rounded-full font-body">Back to Store</Button></Link>
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const images = product.images.edges;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: `${product.title} × ${quantity}`, position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="pt-16">
        <div className="container mx-auto px-5 py-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-body transition-colors mb-8">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Collection
          </Link>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="aspect-square rounded-2xl overflow-hidden card-premium">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/40 to-secondary/10">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-primary/30" />
                    </div>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        i === selectedImage ? 'border-primary glow-red-subtle' : 'border-border/30 hover:border-border'
                      }`}
                    >
                      <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="font-body text-primary font-medium tracking-[0.2em] uppercase text-[10px] mb-2">Soléa</p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">{product.title}</h1>
                <p className="text-navy font-display text-3xl font-bold mt-3">
                  ${parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                  <span className="text-muted-foreground text-xs font-body font-normal ml-2">{selectedVariant?.price.currencyCode}</span>
                </p>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed font-body font-light">{product.description}</p>

              {/* Variant selector */}
              {product.options?.length > 0 && product.variants.edges.length > 1 && (
                <div className="space-y-4">
                  {product.options.map((option: { name: string; values: string[] }) => (
                    <div key={option.name}>
                      <label className="text-[10px] font-body font-medium text-muted-foreground uppercase tracking-[0.2em]">{option.name}</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {option.values.map((value: string) => {
                          const variantIdx = product.variants.edges.findIndex(
                            (v: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
                              v.node.selectedOptions.some((o: { name: string; value: string }) => o.name === option.name && o.value === value)
                          );
                          const isSelected = variantIdx === selectedVariantIndex;
                          return (
                            <button
                              key={value}
                              onClick={() => variantIdx >= 0 && setSelectedVariantIndex(variantIdx)}
                              className={`px-4 py-2 text-xs font-body rounded-full border transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/30 text-muted-foreground'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="text-[10px] font-body font-medium text-muted-foreground uppercase tracking-[0.2em]">Quantity</label>
                <div className="flex items-center gap-3 mt-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-body font-semibold w-8 text-center text-foreground">{quantity}</span>
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-full" onClick={() => setQuantity(q => q + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full rounded-full py-6 font-body font-medium tracking-wide glow-red"
                disabled={isCartLoading || !selectedVariant?.availableForSale}
              >
                {isCartLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart — ${(parseFloat(selectedVariant?.price.amount || '0') * quantity).toFixed(2)}
                  </>
                )}
              </Button>

              {!selectedVariant?.availableForSale && (
                <p className="text-destructive text-xs text-center font-body">Currently out of stock</p>
              )}

              {/* Trust badges */}
              <div className="flex items-center gap-2 pt-2">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground text-[10px] font-body tracking-wider uppercase">FDA Cleared · 2-Year Warranty · Free Shipping</span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
};

export default ProductDetail;
