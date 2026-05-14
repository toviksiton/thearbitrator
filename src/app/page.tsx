import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Features } from '@/components/landing/Features'
import { FAQ } from '@/components/landing/FAQ'
import { TrustSection } from '@/components/landing/TrustSection'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <TrustSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
