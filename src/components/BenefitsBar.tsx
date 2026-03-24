import { Zap, Shield, Heart, Sun } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: Zap, title: "Pain Relief", desc: "Reduce inflammation & accelerate recovery" },
  { icon: Heart, title: "Skin Rejuvenation", desc: "Boost collagen production naturally" },
  { icon: Shield, title: "Clinically Proven", desc: "FDA, CE, ROHS, FCC, ISO certified" },
  { icon: Sun, title: "Full Spectrum", desc: "380nm–1070nm customizable wavelengths" },
];

export const BenefitsBar = () => (
  <section className="py-16 sm:py-20 border-y border-border/30 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" />
    <div className="container mx-auto px-5 relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <b.icon className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-sm text-foreground">{b.title}</h3>
            <p className="text-muted-foreground text-xs mt-1.5 font-body font-light leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
