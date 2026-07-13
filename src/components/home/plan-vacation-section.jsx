import { motion } from 'framer-motion'

export function PlanVacationSection() {
  return (
    <section className="pt-4 lg:pt-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-6xl font-serif text-teal mb-4">Plan Your Vacation</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            For many people organising a trip is headache. Register to be able to jointly determine vacation destinations and dates
          </p>
        </motion.div>

      </div>
    </section>
  )
}
