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
    className="py-6 border-y border-border/30 mb-2"
  >
    <div className="container mx-auto px-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3 justify-center">
            <div className="h-9 w-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
              <Icon className="h-4 w-4 text-navy" />
            </div>
            <div>
              <p className="font-display font-bold text-base text-foreground leading-none">{value}</p>
              <p className="font-body text-[10px] text-muted-foreground tracking-wider uppercase mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);
