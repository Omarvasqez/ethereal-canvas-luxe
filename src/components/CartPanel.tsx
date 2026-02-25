import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartPanel = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-foreground/10 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-ivory/95 backdrop-blur-xl shadow-soft"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gold-light/20">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <h3 className="font-display text-sm tracking-luxe uppercase text-foreground/80">
                    Bolsa ({totalItems})
                  </h3>
                </div>
                <button
                  onClick={closeCart}
                  className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-8 py-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground/30" strokeWidth={1} />
                    <p className="font-body text-sm text-muted-foreground/60">
                      Tu bolsa está vacía
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.variant}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex gap-4"
                      >
                        {/* Image placeholder */}
                        <div className="w-20 h-20 bg-champagne rounded-sm flex-shrink-0 overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-sm tracking-wide text-foreground/90">
                            {item.title}
                          </h4>
                          <p className="font-body text-[11px] text-muted-foreground/70 mt-0.5">
                            {item.subtitle}
                          </p>
                          <p className="font-body text-[10px] tracking-luxe uppercase text-gold/70 mt-1">
                            {item.variant}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center border border-border rounded-sm hover:border-gold/40 transition-colors"
                              >
                                <Minus className="w-3 h-3" strokeWidth={1.5} />
                              </button>
                              <span className="font-body text-xs w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center border border-border rounded-sm hover:border-gold/40 transition-colors"
                              >
                                <Plus className="w-3 h-3" strokeWidth={1.5} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-body text-sm text-foreground/80">
                                €{(item.price * item.quantity).toLocaleString()}
                              </span>
                              <button
                                onClick={() => removeItem(item.id, item.variant)}
                                className="text-muted-foreground/40 hover:text-foreground/60 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-8 py-6 border-t border-gold-light/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-[11px] tracking-luxe uppercase text-muted-foreground">
                      Total
                    </span>
                    <span className="font-display text-lg tracking-wide text-foreground/90">
                      €{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button className="w-full py-3.5 bg-foreground text-primary-foreground font-body text-[11px] tracking-ultra uppercase hover:bg-foreground/90 transition-colors duration-500">
                    Finalizar compra
                  </button>

                  <p className="font-body text-[10px] text-center text-muted-foreground/50">
                    Envío gratuito · Devolución 30 días
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
