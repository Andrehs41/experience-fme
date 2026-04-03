import ShowcaseImmersive from "../components/showcase/ShowcaseImmersive";

export default function Showcase() {
    return (
        <div className="relative min-h-dvh fme-page-vignette-deep">
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
