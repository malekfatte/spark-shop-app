import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const doctorTestimonials = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Sports Medicine Physician",
    quote: "I've recommended Soléa panels to over 200 patients for post-surgical recovery. The results in tissue healing and pain reduction are consistently remarkable.",
    rating: 5,
  },
  {
    name: "Dr. James Chen",
    title: "Dermatologist, MD",
    quote: "The wavelength precision of these devices sets them apart. My patients see visible improvements in skin texture and collagen production within 4–6 weeks.",
    rating: 5,
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Physical Therapist, DPT",
    quote: "Red light therapy from Soléa has become an essential part of my practice. Patients recover faster and report significantly less chronic pain.",
    rating: 5,
  },
];

const userTestimonials = [
  {
    name: "Michael T.",
    location: "Austin, TX",
    quote: "After 3 weeks of daily sessions, my knee pain from running is almost gone. I wish I'd found this years ago.",
    rating: 5,
  },
  {
    name: "Jessica L.",
    location: "Miami, FL",
    quote: "The full-body panel is incredible. My skin looks healthier, I sleep better, and my recovery after workouts has improved dramatically.",
    rating: 5,
  },
  {
    name: "David K.",
    location: "Denver, CO",
    quote: "As a competitive cyclist, recovery is everything. This device cut my downtime in half. Worth every penny.",
    rating: 5,
  },
  {
    name: "Anna W.",
    location: "Portland, OR",
    quote: "I bought the face mask for acne scarring. After 6 weeks, my dermatologist noticed the improvement before I even mentioned it.",
    rating: 5,
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

export const TestimonialsSection = () => (
  <section className="py-12 sm:py-16 relative border-t border-border/20">
    <div className="absolute inset-0 bg-noise" />
    <div className="container mx-auto px-4 sm:px-5 relative">
      {/* Doctor Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="font-body text-navy font-medium tracking-[0.3em] uppercase text-[10px] mb-3">Expert Endorsed</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          Trusted by Healthcare Professionals
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mb-14">
        {doctorTestimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-premium rounded-xl p-5 sm:p-6 flex flex-col"
          >
            <Quote className="h-5 w-5 text-navy/20 mb-3" />
            <p className="text-foreground text-sm font-body leading-relaxed flex-1 mb-4">"{t.quote}"</p>
            <div className="border-t border-border/30 pt-3 flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-[10px] font-body">{t.title}</p>
              </div>
              <StarRating count={t.rating} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* User Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="font-body text-navy font-medium tracking-[0.3em] uppercase text-[10px] mb-3">Real Results</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          What Our Customers Say
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {userTestimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card-premium rounded-xl p-4 sm:p-5 flex flex-col"
          >
            <StarRating count={t.rating} />
            <p className="text-foreground text-xs sm:text-sm font-body leading-relaxed flex-1 mt-3 mb-3">"{t.quote}"</p>
            <div className="border-t border-border/30 pt-2">
              <p className="font-display font-semibold text-xs text-foreground">{t.name}</p>
              <p className="text-muted-foreground text-[10px] font-body">{t.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
