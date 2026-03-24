import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { StoreHeader } from "@/components/StoreHeader";
import { StoreFooter } from "@/components/StoreFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Loader2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-muted-foreground">Product not found</p>
        <Link to="/"><Button variant="outline">Back to Store</Button></Link>
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
    toast.success("Added to cart", { description: `${product.title} × ${quantity}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main className="pt-14">
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border/50">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingCart className="h-12 w-12" />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        i === selectedImage ? 'border-primary' : 'border-border/50'
                      }`}
                    >
                      <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold">{product.title}</h1>
                <p className="text-primary font-heading text-2xl font-bold mt-2">
                  ${parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                  <span className="text-muted-foreground text-sm font-normal ml-1">{selectedVariant?.price.currencyCode}</span>
                </p>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

              {/* Variant selector */}
              {product.options?.length > 0 && product.variants.edges.length > 1 && (
                <div className="space-y-3">
                  {product.options.map((option: { name: string; values: string[] }) => (
                    <div key={option.name}>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{option.name}</label>
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
                              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                                isSelected
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/50'
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
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quantity</label>
                <div className="flex items-center gap-3 mt-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-heading font-semibold w-8 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full glow-red rounded-full"
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
                <p className="text-destructive text-sm text-center">Currently out of stock</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
};

export default ProductDetail;
