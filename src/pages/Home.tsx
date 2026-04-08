import Seo from "../components/Seo";
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
import VideoSection from "../components/home/VideoSection";

export default function Home() {
    return (
        <div className="fme-page-vignette text-fme-white">
            <Seo
                title="FME – La Marca del Barrio | Medellín"
                description="Ropa que sale del barrio con nombre propio. Colecciones FME diseñadas en Medellín: cortes reales, telas y siluetas para el ritmo real, no el de campaña."
                canonical="/"
                keywords="FME, ropa Medellín, marca barrio, streetwear Colombia, colecciones FME"
            />
            <Hero />
            <HomeStatsSection />
            <BentoCards />
            <ParallaxSection />
            <HomePinnedStrip />
            <HomeEditorialSection />
            <ManifestoSection />
            <VideoSection
                headline={"HECHO\nACÁ."}
                sub="Medellín · FME · 2025"
                poster="/images/barrio/sesion-fme-06.webp"
            />
            <HomeJourneySection />
            <HomeNewsletterSection />
            <StoreCTA />
        </div>
    );
}
