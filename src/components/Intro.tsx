// src/components/Intro.tsx
import { useRef, useEffect } from "react";
import { gsap } from "../lib/gsap";

interface Props {
    onComplete: () => void;
}

export default function Intro({ onComplete }: Props) {
    const overlay = useRef<HTMLDivElement>(null);
    const fmeText = useRef<HTMLSpanElement>(null);
    const slogan = useRef<HTMLParagraphElement>(null);
    const curtain = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);
    const lineTop = useRef<HTMLDivElement>(null);
    const lineBot = useRef<HTMLDivElement>(null);
    const sideL = useRef<HTMLSpanElement>(null);
    const sideR = useRef<HTMLSpanElement>(null);
    const year = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const els = [overlay, fmeText, slogan, curtain, progress,
            lineTop, lineBot, sideL, sideR, year];
        if (els.some(r => !r.current)) return;

        let tl: gsap.core.Timeline | null = null;

        const run = () => {
            if (tl) return; 

            // ── Estado inicial ──────────────────────────────────────
            // La cortina empieza INVISIBLE — el fondo negro del overlay
            // ya cubre la pantalla. La cortina solo se necesita para
            // el efecto de "subir" al final.
            gsap.set(curtain.current!, { scaleY: 0, transformOrigin: "bottom" });

            // Elementos de contenido: visibles en posición pero con opacity 0
            gsap.set(fmeText.current!, { opacity: 0, scale: 0.12 });
            gsap.set(slogan.current!, { opacity: 0 });
            gsap.set(progress.current!, { scaleX: 0, transformOrigin: "left" });
            gsap.set([lineTop.current!, lineBot.current!], {
                scaleX: 0, transformOrigin: "center",
            });
            gsap.set([sideL.current!, sideR.current!, year.current!], {
                opacity: 0,
            });

            tl = gsap.timeline({ defaults: { ease: "power3.out" } })

                // Líneas horizontales se abren
                .to([lineTop.current!, lineBot.current!], {
                    scaleX: 1, duration: 0.8, ease: "power2.inOut",
                }, 0.3)

                // Textos laterales aparecen
                .to([year.current!, sideL.current!, sideR.current!], {
                    opacity: 1, duration: 0.5,
                }, 0.5)

                // Barra de progreso corre
                .to(progress.current!, {
                    scaleX: 1, duration: 2.2, ease: "power1.inOut",
                }, 0.4)

                // FME aparece (aún pequeño — scale 0.12)
                .to(fmeText.current!, { opacity: 1, duration: 0.4 }, 0.6)

                // FME crece al tamaño real
                .to(fmeText.current!, {
                    scale: 1, duration: 1.6, ease: "expo.out",
                }, 0.6)

                // Slogan entra
                .to(slogan.current!, { opacity: 1, duration: 0.6 }, 1.6)

                // FME explota llenando pantalla
                .to(fmeText.current!, {
                    scale: 5.5, opacity: 0, duration: 1.1, ease: "expo.in",
                }, 2.8)

                // Detalles se van
                .to([slogan.current!, year.current!, sideL.current!, sideR.current!], {
                    opacity: 0, duration: 0.4,
                }, 2.9)
                .to([lineTop.current!, lineBot.current!], {
                    scaleX: 0, duration: 0.4,
                }, 2.9)

                // Cortina sube (de abajo hacia arriba) cubriendo la pantalla
                .to(curtain.current!, {
                    scaleY: 1, transformOrigin: "bottom",
                    duration: 0.7, ease: "expo.in",
                }, 3.1)

                // Avisar al padre — el home puede mostrar su contenido
                .call(onComplete, undefined, 3.7)

                // Ahora la cortina BAJA revelando el home
                .to(curtain.current!, {
                    scaleY: 0, transformOrigin: "top",
                    duration: 0.9, ease: "expo.out",
                }, 3.8)

                // Sacar el overlay del DOM
                .set(overlay.current!, { display: "none" }, 4.8);
        };

        // Arrancar — con safety timer por si fonts.ready tarda
        let fontsReady = false;
        const safetyTimer = setTimeout(() => {
            if (!fontsReady) run();
        }, 300);

        document.fonts.ready.then(() => {
            fontsReady = true;
            clearTimeout(safetyTimer);
            run();
        }).catch(() => {
            clearTimeout(safetyTimer);
            run();
        });

        return () => {
            clearTimeout(safetyTimer);
            tl?.kill();
            tl = null;
        };

    }, []);

    return (
        <div
            ref={overlay}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0a0a0a",
                overflow: "hidden",
            }}
        >
            {/* ── Líneas decorativas ── */}
            <div ref={lineTop} style={{
                position: "absolute", top: "15%", left: 0, right: 0,
                height: "1px", background: "rgba(232,224,208,0.35)",
                zIndex: 2,
            }} />
            <div ref={lineBot} style={{
                position: "absolute", bottom: "15%", left: 0, right: 0,
                height: "1px", background: "rgba(232,224,208,0.35)",
                zIndex: 2,
            }} />

            {/* ── Textos laterales ── */}
            <span ref={year} style={{
                position: "absolute", top: "calc(15% - 24px)", right: "40px",
                fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase",
                color: "#e8e0d0", fontFamily: "var(--font-display, sans-serif)",
                zIndex: 2,
            }}>
                Est. 2018
            </span>
            <span ref={sideL} style={{
                position: "absolute", left: "40px", bottom: "35%",
                fontSize: "11px", letterSpacing: ".25em", textTransform: "uppercase",
                color: "#e8e0d0", fontFamily: "var(--font-display, sans-serif)",
                writingMode: "vertical-rl", transform: "rotate(180deg)",
                zIndex: 2,
            }}>
                Hecho en Medellín
            </span>
            <span ref={sideR} style={{
                position: "absolute", right: "40px", bottom: "20%",
                fontSize: "11px", letterSpacing: ".25em", textTransform: "uppercase",
                color: "#e8e0d0", fontFamily: "var(--font-display, sans-serif)",
                zIndex: 2,
            }}>
                storefme.com
            </span>

            <span
                ref={fmeText}
                style={{
                    position: "relative",
                    zIndex: 3,
                    fontFamily: "var(--font-display, sans-serif)",
                    fontSize: "clamp(80px, 22vw, 220px)",
                    color: "#e8e0d0",
                    lineHeight: 1,
                    letterSpacing: "-.01em",
                    userSelect: "none",
                    willChange: "transform, opacity",
                    display: "block",
                }}
            >
                FME
            </span>

            {/* ── Slogan ── */}
            <p ref={slogan} style={{
                position: "relative",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontSize: "11px",
                letterSpacing: ".45em",
                textTransform: "uppercase",
                color: "#c9a84c",
                marginTop: "16px",
                fontFamily: "var(--font-display, sans-serif)",
            }}>
                <span style={{ width: "40px", height: "1px", background: "#c9a84c", display: "block", flexShrink: 0 }} />
                Ropa con barrio
                <span style={{ width: "40px", height: "1px", background: "#c9a84c", display: "block", flexShrink: 0 }} />
            </p>

            {/* ── Barra de progreso ── */}
            <div style={{
                position: "absolute", bottom: "40px", left: "40px", right: "40px",
                height: "1px", background: "rgba(232,224,208,0.08)", zIndex: 2,
            }}>
                <div ref={progress} style={{
                    height: "100%", background: "#c9a84c",
                    transformOrigin: "left",
                }} />
            </div>

            {/* ── Cortina — z-index 4, encima de todo el contenido ── */}
            {/* Empieza con scaleY: 0 (invisible), sube al final para cubrir,
          luego baja para revelar el home */}
            <div ref={curtain} style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#0a0a0a",
                transformOrigin: "bottom",
                zIndex: 4,
            }} />
        </div>
    );
}