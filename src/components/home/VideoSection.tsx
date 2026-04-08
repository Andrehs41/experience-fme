// src/components/home/VideoSection.tsx
// Sección de video de fondo entre ManifestoSection y HomeJourneySection.
// Coloca el archivo en /public/videos/fme-reel.mp4 (y .webm para mejor compresión).
// Mientras no haya video, muestra el poster con overlay editorial.
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

interface VideoSectionProps {
    /** Ruta desde /public. Ej: "/videos/fme-reel.mp4" */
    src?: string;
    /** Fuente webm alternativa (mejor compresión). */
    srcWebm?: string;
    /** Imagen poster mientras carga el video o si no hay src. */
    poster?: string;
    /** Texto principal sobre el video. */
    headline?: string;
    /** Subtítulo. */
    sub?: string;
}

export default function VideoSection({
    src = "/videos/fme-reel.mp4",
    srcWebm = "/videos/fme-reel.webm",
    poster = "/images/barrio/sesion-fme-06.webp",
    headline = "HECHO\nACÁ.",
    sub = "Medellín · FME · 2025",
}: VideoSectionProps) {
    const containerRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoError, setVideoError] = useState(false);

    // Intenta cargar el video silenciosamente
    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;
        const onError = () => setVideoError(true);
        vid.addEventListener("error", onError);
        return () => vid.removeEventListener("error", onError);
    }, []);

    useGSAP(() => {
        gsap.fromTo(".vs-content", { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: containerRef });

    const lines = headline.split("\n");

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ minHeight: "clamp(320px, 60vh, 720px)" }}
        >
            {/* Video o poster de fondo */}
            {!videoError ? (
                <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover"
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    onError={() => setVideoError(true)}
                >
                    {srcWebm && <source src={srcWebm} type="video/webm" />}
                    <source src={src} type="video/mp4" />
                </video>
            ) : (
                /* Fallback: poster estático cuando no hay archivo de video */
                <img
                    src={poster}
                    alt="FME — sesión editorial"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-fme-black via-fme-black/40 to-fme-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-fme-black/30 to-transparent" />
            {/* Grain */}
            <div
                className="pointer-events-none absolute inset-0 fme-noise-soft opacity-40"
                aria-hidden
            />

            {/* Contenido */}
            <div className="vs-content relative z-10 flex h-full flex-col justify-end px-6 pb-12 pt-20 sm:px-10 sm:pb-16 md:px-16 md:pb-20"
                style={{ minHeight: "inherit" }}>
                <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-fme-gold sm:w-12" />
                    <span className="text-[9px] uppercase tracking-[0.4em] text-fme-gold">
                        {sub}
                    </span>
                </div>
                <h2
                    className="fme-font-display text-fme-cream"
                    style={{
                        fontSize: "clamp(3rem, 10vw, 8rem)",
                        lineHeight: 0.88,
                        letterSpacing: "-.01em",
                        whiteSpace: "pre-line",
                    }}
                >
                    {lines.map((line, i) =>
                        i % 2 === 1 ? (
                            <span key={i} className="block text-transparent [-webkit-text-stroke:1px_var(--gold)]">
                                {line}
                            </span>
                        ) : (
                            <span key={i} className="block">{line}</span>
                        )
                    )}
                </h2>
            </div>
        </section>
    );
}
