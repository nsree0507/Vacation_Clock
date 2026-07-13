import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { AboutSection } from '@/components/home/about-section'
import { MissionSection } from '@/components/home/mission-section'
import { DestinationsSection } from '@/components/home/destinations-section'
import { ServicesSection } from '@/components/home/services-section'
import { TravelByInterestSection } from '@/components/home/travel-by-interest-section'
import { TrendingPackagesSection } from '@/components/home/trending-packages-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { GallerySection } from '@/components/home/gallery-section'
import { PlanVacationSection } from '@/components/home/plan-vacation-section'
import IndiaMap from "../components/IndiaMap";

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const element = document.querySelector(hash)
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    }
  }, [hash])

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MissionSection />
      <DestinationsSection />
      <ServicesSection />
      <TravelByInterestSection />
      <PlanVacationSection />
      <IndiaMap />
      <TrendingPackagesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <GallerySection />
      <Footer />
    </main>
  )
}
