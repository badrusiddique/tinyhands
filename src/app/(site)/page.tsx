import Hero from '@/components/home/Hero'
import FeatureBadges from '@/components/home/FeatureBadges'
import HowItWorks from '@/components/home/HowItWorks'
import VisitorCounter from '@/components/home/VisitorCounter'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeatureBadges />
      <HowItWorks />
      <VisitorCounter />
    </>
  )
}
