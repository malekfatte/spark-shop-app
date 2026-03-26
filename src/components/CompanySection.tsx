import { Users, Globe, Lightbulb, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Lightbulb, value: "100+", label: "Patents Filed" },
  { icon: Globe, value: "50+", label: "Countries Served" },
  { icon: Users, value: "500K+", label: "Customers Worldwide" },
  { icon: Clock, value: "10+", label: "Years of R&D" },
];

export const CompanySection = () => (
  <section className="py-12 sm:py-16 relative border-t border-border/20 bg-navy/[0.03]">
    <div className="absolute inset-0 bg-noise" />
    <div className="container mx-auto px-4 sm:px-5 relative">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-navy font-medium tracking-[0.3em] uppercase text-[10px] mb-3">About Soléa</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Pioneering Light Therapy Since 2014
          </h2>
          <div className="space-y-3 text-muted-foreground text-xs sm:text-sm font-body font-light leading-relaxed">
            <p>
              Soléa Technologies was founded with a single mission: to make professional-grade red light therapy accessible to everyone. Our devices are engineered in collaboration with leading photobiomodulation researchers and manufactured under strict medical-device standards.
            </p>
            <p>
              Every panel undergoes rigorous third-party testing for irradiance output, wavelength accuracy, and EMF safety — ensuring you receive clinically effective doses with every session.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-premium rounded-xl p-4 sm:p-5 text-center"
            >
              <stat.icon className="h-5 w-5 text-navy mx-auto mb-2" />
              <p className="font-display text-xl sm:text-2xl font-bold text-navy">{stat.value}</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs font-body mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);
