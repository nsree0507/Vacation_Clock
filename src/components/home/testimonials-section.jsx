import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: 'Vacation Clock planned our Kerala honeymoon flawlessly. The houseboat experience was magical, and every detail was taken care of. Truly a five-star service!',
    author: 'Ananya Sharma',
    location: 'Mumbai, India',
    initials: 'AS',
    rating: 5,
  },
  {
    id: 2,
    quote: 'The Ladakh adventure package exceeded all expectations. From the biking routes to the local guides, everything was professionally curated. Highly recommended!',
    author: 'Rohan Mehta',
    location: 'Bangalore, India',
    initials: 'RM',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Traveling with elderly parents is challenging, but the caretaker service made our Rajasthan trip so comfortable. My parents had the time of their lives.',
    author: 'Priya & Family',
    location: 'Delhi, India',
    initials: 'PF',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-4 lg:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">What Traveler&apos;s Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real stories from real travelers who discovered India with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border/40 rounded-[1rem] p-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)]"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal text-white flex items-center justify-center font-semibold text-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
