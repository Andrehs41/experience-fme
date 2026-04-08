import Seo from "../components/Seo";
import ShowcaseImmersive from "../components/showcase/ShowcaseImmersive";

export default function Showcase() {
    return (
        <div className="relative min-h-dvh fme-page-vignette-deep">
            <Seo
                title="Showcase FW26 – FME | Editorial Medellín"
                description="Editorial cinematográfica FW26. Las piezas de FME en su contexto real: calle, barrio y actitud. Scroll y descubrí cada look."
                canonical="/showcase"
                ogImage="/images/barrio/sesion-fme-01.webp"
                keywords="editorial FME, lookbook FW26, moda Medellín, showcase FME"
            />
            <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[var(--border-gold-15)] to-transparent opacity-80"
                aria-hidden
            />
            <div className="relative z-[3]">
                <ShowcaseImmersive />
            </div>
        </div>
    );
}
