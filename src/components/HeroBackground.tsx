// Con ajustes:
//   <HeroBackground
//     src="/images/comunidad-hero.jpeg"
//     brightness={0.3}
//     blur={4}
//     overlay={0.6}
//     saturation={0.6}
//     glow="gold"
//   />
interface HeroBackgroundProps {
    /** Ruta desde /public. Si se omite, solo se muestran los gradientes de marca. */
    src?: string;
    /**
     * Cuánta luz deja pasar la imagen. 0 = negro total, 1 = original.
     * @default 0.38
     */
    brightness?: number;
    /**
     * Píxeles de blur sobre la imagen.
     * 0 = nítida, 8 = muy difuminada.
     * @default 3
     */
    blur?: number;
    /**
     * Opacidad del velo oscuro encima de la imagen (0–1).
     * @default 0.55
     */
    overlay?: number;
    /**
     * Saturación de la imagen. 0 = blanco y negro, 1 = colores originales.
     * @default 0.7
     */
    saturation?: number;
    /**
     * Acento de glow superior.
     * "gold"  → glow dorado (Home, Colecciones)
     * "cream" → glow crema sutil (Comunidad, Barrio)
     * "none"  → sin glow
     * @default "gold"
     */
    glow?: "gold" | "cream" | "none";
    /**
     * object-position de la imagen. Útil para reencuadrar según la foto.
     * @default "center"
     */
    position?: string;
}

export default function HeroBackground({
    src,
    brightness = 0.38,
    blur = 3,
    overlay = 0.55,
    saturation = 0.7,
    glow = "gold",
    position = "center",
}: HeroBackgroundProps) {

    const glowMap = {
        gold: "radial-gradient(ellipse 90% 55% at 50% -8%, rgb(var(--gold-rgb) / 0.14) 0%, transparent 52%), radial-gradient(ellipse 70% 45% at 100% 100%, rgb(var(--cream-rgb) / 0.05) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 0% 80%, rgb(var(--gold-rgb) / 0.06) 0%, transparent 50%)",
        cream: "radial-gradient(ellipse 90% 55% at 50% -8%, rgb(var(--cream-rgb) / 0.07) 0%, transparent 52%), radial-gradient(ellipse 60% 40% at 100% 100%, rgb(var(--cream-rgb) / 0.04) 0%, transparent 55%)",
        none: "none",
    };

    return (
        <>
            {/* 1. Imagen de fondo */}
            {src && (
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ zIndex: 0 }}
                    aria-hidden
                >
                    <img
                        src={src}
                        alt=""
                        className="h-full w-full"
                        style={{
                            objectFit: "cover",
                            objectPosition: position,
                            // Scale para que el blur no deje bordes blancos
                            transform: "scale(1.08)",
                            filter: `blur(${blur}px) brightness(${brightness}) saturate(${saturation})`,
                            willChange: "transform",
                            display: "block",
                        }}
                        fetchPriority="high"
                        decoding="async"
                    />

                    {/* Velo oscuro uniforme */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `rgba(10,10,10,${overlay})`,
                            mixBlendMode: "multiply",
                        }}
                    />
                </div>
            )}

            {/* 2. Noise texture */}
            <div
                className="pointer-events-none absolute inset-0 fme-noise-soft"
                style={{ zIndex: 1 }}
                aria-hidden
            />

            {/* 3. Gradientes de marca */}
            {glow !== "none" && (
                <div
                    className="pointer-events-none absolute inset-0 opacity-90"
                    style={{ zIndex: 1, background: glowMap[glow] }}
                    aria-hidden
                />
            )}

            {/* 4. Halo central suave */}
            <div
                className="pointer-events-none absolute left-1/2 top-[18%] h-[min(56vw,420px)] w-[min(120vw,900px)] -translate-x-1/2 rounded-full blur-3xl"
                style={{
                    zIndex: 1,
                    background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.09) 0%, transparent 68%)",
                }}
                aria-hidden
            />
        </>
    );
}