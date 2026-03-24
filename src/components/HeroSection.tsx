import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Red Light Therapy Device" className="w-full h-full object-cover scale-110" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="relative z-10 container mx-auto px-5 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-body text-primary font-medium tracking-[0.35em] uppercase text-[10px] sm:text-xs mb-6">
            Professional Red Light Therapy
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] mb-8"
        >
          <span className="text-gradient-hero">Heal Deeper.</span>
          <br />
          <span className="text-gradient-red italic">Recover Faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base mb-10 leading-relaxed font-body font-light"
        >
          FDA-approved red & near-infrared therapy panels engineered for pain relief, skin rejuvenation, and peak cellular performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="rounded-full px-10 py-6 text-sm font-body font-medium tracking-wide glow-red"
          >
            Shop Collection <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 flex items-center justify-center gap-8 text-muted-foreground"
        >
          {["FDA Cleared", "100+ Patents", "ISO Certified"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="font-body text-[10px] sm:text-xs tracking-wider uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
