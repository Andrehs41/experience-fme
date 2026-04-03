import ManifestoSection from "../components/home/ManifestoSection";
import StoreCTA from "../components/home/StoreCTA";
import HomeStatsSection from "../components/home/HomeStatsSection";
import HomeEditorialSection from "../components/home/HomeEditorialSection";
import HomeJourneySection from "../components/home/HomeJourneySection";
import HomeNewsletterSection from "../components/home/HomeNewsletterSection";
import HomePinnedStrip from "../components/home/HomePinnedStrip";
import { ParallaxSection } from "../components/home/ParallaxSection";
import { Hero } from "../components/home/Hero";
import BentoCards from "../components/home/BentoCards";

export default function Home() {
    return (
        <div className="fme-page-vignette text-fme-white">
            <Hero />
            <HomeStatsSection />
            <BentoCards />
            <ParallaxSection />
            <HomePinnedStrip />
            <HomeEditorialSection />
            <ManifestoSection />
            <HomeJourneySection />
            <HomeNewsletterSection />
            <StoreCTA />
        </div>
    );
}