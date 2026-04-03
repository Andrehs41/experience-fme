import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { NAV_LINKS } from "../data/navlinksData";

interface FooterProps {
    variant: "home" | "barrio" | "minimal" | "colecciones" | "comunidad" | "multimarca";
}

const SOCIAL_LINKS = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Spotify", href: "https://open.spotify.com" },
    { label: "TikTok", href: "https://tiktok.com" },
] as const;

const LEGAL_LINKS = [
    { label: "Privacidad", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Legal", href: "#" },
] as const;

type StyleKey = FooterProps["variant"];

const STYLES: Record<
    StyleKey,
    {
        bg: string;
        text: string;
        borderTop: string;
        brand: string;
        tag: string;
        navLink: string;
        social: string;
        legal: string;
        msg: string;
        meta: string;
        showGradient: boolean;
    }
> = {
    home: {
        bg: "bg-fme-black",
        text: "text-fme-white",
        borderTop: "border-[var(--border-gold-10)]",
        brand: "text-fme-gold",
        tag: "text-fme-cream/90",
        navLink: "text-fme-cream-dim hover:text-fme-gold",
        social: "text-fme-white/70 hover:text-fme-gold",
        legal: "text-fme-white/55 hover:text-fme-cream",
        msg: "text-fme-cream",
        meta: "text-fme-white/45",
        showGradient: true,
    },
    barrio: {
        bg: "bg-fme-gold",
        text: "text-fme-black",
        borderTop: "border-fme-black/15",
        brand: "text-fme-black",
        tag: "text-fme-black/75",
        navLink: "text-fme-black/65 hover:text-fme-black",
        social: "text-fme-black/65 hover:text-fme-black",
        legal: "text-fme-black/55 hover:text-fme-black",
        msg: "text-fme-black",
        meta: "text-fme-black/50",
        showGradient: false,
    },
    minimal: {
        bg: "bg-fme-white",
        text: "text-fme-black",
        borderTop: "border-[var(--border-cream-15)]",
        brand: "text-fme-black",
        tag: "text-fme-cream-dim",
        navLink: "text-fme-cream-dim hover:text-fme-black",
        social: "text-fme-black/60 hover:text-fme-gold",
        legal: "text-fme-cream-dim hover:text-fme-black",
        msg: "text-fme-black",
        meta: "text-fme-black/45",
        showGradient: false,
    },
    colecciones: {
        bg: "bg-fme-surface-deep",
        text: "text-fme-white",
        borderTop: "border-[var(--border-gold-08)]",
        brand: "text-fme-gold",
        tag: "text-fme-cream/85",
        navLink: "text-fme-cream-dim hover:text-fme-gold",
        social: "text-fme-white/70 hover:text-fme-gold",
        legal: "text-fme-white/50 hover:text-fme-cream",
        msg: "text-fme-cream",
        meta: "text-fme-white/40",
        showGradient: true,
    },
    comunidad: {
        bg: "bg-fme-white",
        text: "text-fme-black",
        borderTop: "border-fme-black/10",
        brand: "text-fme-black",
        tag: "text-fme-cream-dim",
        navLink: "text-fme-cream-dim hover:text-fme-gold",
        social: "text-fme-black/60 hover:text-fme-gold",
        legal: "text-fme-cream-dim hover:text-fme-black",
        msg: "text-fme-black",
        meta: "text-fme-black/45",
        showGradient: false,
    },
    multimarca: {
        bg: "bg-fme-surface-warm",
        text: "text-fme-cream",
        borderTop: "border-[var(--border-gold-10)]",
        brand: "text-fme-white",
        tag: "text-fme-cream-dim",
        navLink: "text-fme-cream-dim hover:text-fme-gold",
        social: "text-fme-cream/80 hover:text-fme-white",
        legal: "text-fme-cream-dim hover:text-fme-cream",
        msg: "text-fme-cream",
        meta: "text-fme-cream-dim",
        showGradient: true,
    },
};

const MESSAGES: Record<StyleKey, { tag: string; msg: string }> = {
    home: { tag: "MARCA · MEDELLÍN", msg: "Marca de ropa desde Medellín. Tienda oficial en storefme.com." },
    barrio: { tag: "CRÓNICA", msg: "Lo que mostramos acá es lo que pasa afuera del set." },
    minimal: { tag: "FME", msg: "Menos ruido, mismo criterio." },
    colecciones: { tag: "LOOKBOOK", msg: "Archivo visual de siluetas y escenas — el precio está en la tienda." },
    comunidad: { tag: "GENTE REAL", msg: "Fotos de quienes visten FME en la calle, no en casting." },
    multimarca: { tag: "FME STORE", msg: "Línea propia + marcas elegidas. Un solo checkout." },
};

export default function Footer({ variant }: FooterProps) {
    const footerRef = useRef<HTMLElement>(null);
    const s = STYLES[variant];
    const copy = MESSAGES[variant];

    useGSAP(() => {
        gsap.from(".fme-footer-reveal", {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.07,
            ease: "expo.out",
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 91%",
            },
        });
    }, { scope: footerRef });

    return (
        <footer
            ref={footerRef}
            className={`relative overflow-hidden border-t ${s.borderTop} px-5 py-16 transition-colors duration-700 sm:px-8 sm:py-20 md:px-10 md:py-24 ${s.bg} ${s.text}`}
        >
            {s.showGradient && (
                <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgb(var(--gold-rgb)/0.07),transparent_65%)] opacity-90"
                    aria-hidden
                />
            )}

            <div className="footer-content relative z-10 mx-auto max-w-[1400px]">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 lg:gap-y-16">
                    {/* Marca */}
                    <div className="fme-footer-reveal lg:col-span-4">
                        <Link
                            to="/"
                            className={`fme-focus-ring group inline-block rounded-sm ${s.brand}`}
                        >
                            <span className="fme-font-display block text-[clamp(3.5rem,14vw,8rem)] font-black italic leading-none tracking-tighter transition-transform duration-500 group-hover:translate-x-1">
                                FME
                            </span>
                        </Link>
                        <div className="mt-5 space-y-2">
                            <p className={`text-[11px] font-bold uppercase tracking-[0.45em] ${s.tag}`}>
                                {copy.tag}
                            </p>
                            <p className={`text-[10px] uppercase tracking-[0.28em] italic ${s.meta}`}>
                                Diseño y producción con sede en Medellín
                            </p>
                        </div>
                    </div>

                    {/* Explorar */}
                    <nav className="fme-footer-reveal lg:col-span-2" aria-label="Pie — enlaces">
                        <p className={`mb-5 text-[9px] uppercase tracking-[0.35em] ${s.meta}`}>Explorar</p>
                        <ul className="flex flex-col gap-3">
                            {NAV_LINKS.map(({ label, path }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={`fme-focus-ring text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 ${s.navLink}`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Social + Legal */}
                    <div className="fme-footer-reveal grid grid-cols-2 gap-10 sm:gap-16 lg:col-span-3">
                        <div>
                            <p className={`mb-5 text-[9px] uppercase tracking-[0.35em] ${s.meta}`}>Social</p>
                            <ul className="flex flex-col gap-3">
                                {SOCIAL_LINKS.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`fme-focus-ring text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 ${s.social}`}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className={`mb-5 text-[9px] uppercase tracking-[0.35em] ${s.meta}`}>Info</p>
                            <ul className="flex flex-col gap-3">
                                {LEGAL_LINKS.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className={`fme-focus-ring text-[10px] uppercase tracking-[0.28em] transition-colors duration-300 ${s.legal}`}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Mensaje */}
                    <div className="fme-footer-reveal flex flex-col justify-between gap-8 lg:col-span-3 lg:text-right">
                        <p className={`text-sm font-bold leading-snug tracking-tight sm:text-base ${s.msg}`}>
                            {copy.msg}
                        </p>
                        <div className={`space-y-2 lg:ml-auto lg:text-right ${s.meta}`}>
                            <p className="font-mono text-[10px] tracking-tighter opacity-80">
                                [ 06.0441° N, 75.5643° W ]
                            </p>
                            <p className="text-[9px] font-bold uppercase tracking-[0.22em] opacity-90">
                                © 2026 Medellín, Colombia
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tienda oficial */}
                <div
                    className={`fme-footer-reveal mt-14 flex flex-col items-center gap-4 border-t pt-10 sm:mt-16 sm:flex-row sm:justify-between ${s.borderTop}`}
                >
                    <a
                        href="https://storefme.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`fme-focus-ring fme-font-display text-[10px] uppercase tracking-[0.38em] transition-colors duration-300 ${
                            variant === "barrio"
                                ? "text-fme-black/75 hover:text-fme-black"
                                : "text-fme-gold hover:text-fme-cream"
                        }`}
                    >
                        storefme.com →
                    </a>
                    <p className={`text-[9px] uppercase tracking-[0.3em] ${s.meta}`}>Tienda oficial FME</p>
                </div>
            </div>
        </footer>
    );
}
