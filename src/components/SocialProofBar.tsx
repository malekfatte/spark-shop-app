import { motion } from "framer-motion";
import { Users, Star, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Professionals Trust Us" },
  { icon: Star, value: "4.9/5", label: "Customer Rating" },
  { icon: Award, value: "100+", label: "Patents Held" },
  { icon: TrendingUp, value: "50+", label: "Countries Served" },
];

export const SocialProofBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="py-8"
  >
    <div className="container mx-auto px-5">
      <div className="section-divider mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="text-center">
            <div className="h-10 w-10 rounded-full bg-warm-light flex items-center justify-center mx-auto mb-3">
              <Icon className="h-4 w-4 text-warm" />
            </div>
            <p className="font-display font-semibold text-2xl text-foreground leading-none mb-1">{value}</p>
            <p className="font-body text-[10px] text-muted-foreground tracking-[0.15em] uppercase font-light">{label}</p>
          </div>
        ))}
      </div>
      <div className="section-divider mt-8" />
    </div>
  </motion.div>
);