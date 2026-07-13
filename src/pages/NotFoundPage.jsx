import { Link } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal text-sm uppercase tracking-[0.3em] mb-4">404 Error</p>
          <h1 className="text-6xl lg:text-7xl font-serif text-foreground mb-6">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            The page you are looking for does not exist or may have been moved. Return to the homepage to continue exploring.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-8 py-4 text-white font-semibold hover:bg-teal-dark transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
