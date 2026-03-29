import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";

const resultFineLines = "/result-fine-lines.jpg";
const resultMuscleRecovery = "/result-muscle-recovery.jpg";
const resultJointPain = "/result-joint-pain.jpg";
const resultSkinRejuvenation = "/result-skin-rejuvenation.jpg";

interface Result {
  title: string;
  area: string;
  duration: string;
  description: string;
  gradient: string;
  image: string;
}

const results: Result[] = [
  {
    title: "Reduced Fine Lines",
    area: "Face & Neck",
    duration: "8 weeks",
    description: "Visible reduction in fine lines and improved skin texture through consistent 660nm red light sessions.",
    gradient: "from-accent/10 to-accent/5",
    image: resultFineLines,
  },
  {
    title: "Muscle Recovery",
    area: "Back & Shoulders",
    duration: "4 weeks",
    description: "Faster post-workout recovery and reduced muscle soreness using 850nm near-infrared therapy.",
    gradient: "from-secondary to-muted",
    image: resultMuscleRecovery,
  },
  {
    title: "Joint Pain Relief",
    area: "Knees & Hands",
    duration: "6 weeks",
    description: "Significant reduction in joint stiffness and inflammation with dual-wavelength panel sessions.",
    gradient: "from-muted to-secondary",
    image: resultJointPain,
  },
  {
    title: "Skin Rejuvenation",
    area: "Full Body",
    duration: "12 weeks",
    description: "Improved collagen density, even skin tone, and enhanced overall radiance with full-body treatment.",
    gradient: "from-accent/5 to-accent/10",
    image: resultSkinRejuvenation,
  },
];

const ResultCard = ({ result, index }: { result: Result; index: number }) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="card-premium rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowAfter(!showAfter)}
          className={`relative w-full aspect-[4/3] bg-gradient-to-br ${result.gradient} transition-all duration-700 overflow-hidden`}
        >
          <img
            src={result.image}
            alt={result.title}
            loading="lazy"
            width={672}
            height={512}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              showAfter ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          />

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
              showAfter ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center mb-3 border border-border">
              <span className="font-display text-xs text-muted-foreground uppercase tracking-wider">Before</span>
            </div>
            <p className="text-[10px] font-body text-muted-foreground/70 tracking-wider uppercase">Tap to reveal</p>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
              showAfter ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-foreground/80 backdrop-blur-sm flex items-center justify-center mb-3 border border-background/20">
              <Sparkles className="h-5 w-5 text-background" />
            </div>
            <span className="font-display text-sm text-foreground drop-shadow-md">After {result.duration}</span>
            <p className="text-[10px] font-body text-background/70 tracking-wider uppercase mt-1 drop-shadow-sm">Tap to reset</p>
          </div>

          <div className="absolute top-3 right-3">
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-body font-medium tracking-wider uppercase backdrop-blur-sm border transition-colors duration-500 ${
                showAfter
                  ? "bg-foreground/80 text-background border-background/20"
                  : "bg-background/60 text-muted-foreground border-border"
              }`}
            >
              {showAfter ? "After" : "Before"}
            </span>
          </div>
        </button>

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-base text-foreground">{result.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="text-[10px] font-body">{result.duration}</span>
            </div>
          </div>
          <p className="text-[10px] font-body text-accent font-medium uppercase tracking-[0.15em] mb-2">{result.area}</p>
          <p className="text-xs font-body text-muted-foreground leading-relaxed">{result.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const BeforeAfterSection = () => (
  <section className="py-20 relative">
    <div className="container mx-auto px-5 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <p className="font-body text-muted-foreground font-light tracking-[0.3em] uppercase text-[10px] mb-3">
          Real Results
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-3">
          Proven Outcomes
        </h2>
        <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
          Consistent red light therapy delivers visible, measurable results. Tap each card to see the transformation.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {results.map((result, i) => (
          <ResultCard key={i} result={result} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8 text-[10px] font-body text-muted-foreground/60 tracking-wider uppercase"
      >
        Results may vary · Based on clinical studies with consistent use
      </motion.p>
    </div>
  </section>
);
