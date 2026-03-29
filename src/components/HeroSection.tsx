import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown, Leaf, Heart, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Red Light Therapy Device" className="w-full h-full object-cover scale-105" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="font-body text-muted-foreground font-light tracking-[0.4em] uppercase text-[10px] sm:text-[11px] mb-6">
            Naturally Therapeutic · Precision Engineered
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-8xl font-medium leading-[0.9] mb-8"
        >
          <span className="text-gradient-hero">Heal Deeper.</span>
          <br />
          <span className="text-gradient-warm italic font-light">Recover Faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-body text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8 font-light leading-relaxed"
        >
          Professional-grade red light therapy for deep tissue healing, skin rejuvenation, and full-body wellness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="rounded-full px-12 py-7 text-sm font-body font-normal tracking-widest uppercase bg-espresso hover:bg-espresso/90 text-white shadow-lg shadow-espresso/15"
          >
            Explore Collection <ArrowDown className="ml-3 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            { icon: Shield, label: "FDA Cleared" },
            { icon: Leaf, label: "Pain Relief" },
            { icon: Heart, label: "Skin Rejuvenation" },
            { icon: Sparkles, label: "Full Spectrum" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-terracotta" />
              <span className="font-body text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-muted-foreground font-light">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};