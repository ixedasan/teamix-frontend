import { CtaSection } from './layout/CtaSection'
import { FeaturesSection } from './layout/FeaturesSection'
import { HeroSection } from './layout/HeroSection'
import { HowItWorksSection } from './layout/HowItWorksSection'
import { LandingFooter } from './layout/LandingFooter'
import { LandingHeader } from './layout/LandingHeader'
import { PricingSection } from './layout/PricingSection'
import { TestimonialsSection } from './layout/TestimonialsSection'

export function LandingRoot() {
	return (
		<div className="flex min-h-screen flex-col">
			<LandingHeader />
			<main className="flex-1">
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<TestimonialsSection />
				<PricingSection />
				<CtaSection />
			</main>
			<LandingFooter />
		</div>
	)
}
