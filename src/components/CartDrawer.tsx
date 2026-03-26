import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";

export const CartDrawer = () => {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
          <ShoppingCart className="h-5 w-5 text-foreground" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-body font-bold">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border/30">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-xl">Your Cart</SheetTitle>
          <SheetDescription className="font-body">
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-body text-sm">Nothing here yet</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3 p-3 rounded-xl card-premium">
                      <div className="w-14 h-14 bg-secondary/30 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-sm truncate text-foreground">{item.product.node.title}</h4>
                        <p className="text-primary font-body font-semibold text-sm mt-0.5">${parseFloat(item.price.amount).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.variantId)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-2.5 w-2.5" />
                          </Button>
                          <span className="w-6 text-center text-xs font-body font-medium text-foreground">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-2.5 w-2.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-5 border-t border-border/30">
                <div className="flex justify-between items-center">
                  <span className="font-display text-base">Total</span>
                  <span className="font-display text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full rounded-full py-6 font-body font-medium tracking-wide glow-red" size="lg" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" />Secure Checkout</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
