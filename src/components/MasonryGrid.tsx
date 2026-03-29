import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import type { ComunidadMember } from "../data/comunidadData";

interface LightboxProps {
    member: ComunidadMember;
    onClose: () => void;
}

function Lightbox({ member, onClose }: LightboxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            opacity: 0,
            scale: 0.96,
            duration: 0.4,
            ease: "power3.out",
        });
    });

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 800,
                background: "rgba(10,10,10,0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                backdropFilter: "blur(8px)",
                cursor: "zoom-out",
            }}
        >
            <div
                ref={ref}
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    maxWidth: "680px",
                    maxHeight: "90vh",
                    width: "100%",
                }}
            >
                <img
                    src={member.src}
                    alt={member.name}
                    style={{ width: "100%", height: "auto", maxHeight: "75vh", objectFit: "contain", display: "block" }}
                />

                {/* Info */}
                <div style={{ padding: "20px 0 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div>
                        <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", letterSpacing: ".08em", color: "var(--cream)" }}>
                            {member.name}
                        </p>
                        <p style={{ fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginTop: "4px" }}>
                            {member.collection}
                        </p>
                    </div>
                    <span style={{ fontSize: "11px", color: "rgba(232,224,208,.35)", letterSpacing: ".1em" }}>
                        {member.date}
                    </span>
                </div>

                {/* Cerrar */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "-40px",
                        right: 0,
                        background: "none",
                        border: "none",
                        color: "rgba(232,224,208,.5)",
                        fontSize: "11px",
                        letterSpacing: ".2em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "color .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,224,208,.5)")}
                >
                    Cerrar ×
                </button>
            </div>
        </div>
    );
}

// Card 
interface CardProps {
    member: ComunidadMember;
    index: number;
    onClick: (m: ComunidadMember) => void;
}

function MasonryCard({ member, index, onClick }: CardProps) {
    const [hovered, setHovered] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgError, setImgError] = useState(false);

    return (
        <div
            data-cursor={member.name}
            onClick={() => onClick(member)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                breakInside: "avoid",
                marginBottom: "6px",
                position: "relative",
                overflow: "hidden",
                cursor: "zoom-in",
                background: "#111",
                display: "block",
            }}
        >
            {/* Número */}
            <span style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                zIndex: 2,
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: ".15em",
                color: "rgba(232,224,208,.25)",
            }}>
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Imagen */}
            {!imgError ? (
                <img
                    ref={imgRef}
                    src={member.src}
                    alt={member.name}
                    onError={() => setImgError(true)}
                    style={{
                        width: "100%",
                        display: "block",
                        aspectRatio: member.ratio,
                        objectFit: "cover",
                        transition: "transform .6s cubic-bezier(.25,.46,.45,.94)",
                        transform: hovered ? "scale(1.04)" : "scale(1)",
                    }}
                />
            ) : (
                /* Placeholder cuando no hay imagen */
                <div style={{
                    width: "100%",
                    aspectRatio: member.ratio,
                    background: "#141414",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform .6s cubic-bezier(.25,.46,.45,.94)",
                    transform: hovered ? "scale(1.04)" : "scale(1)",
                }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "40px", color: "rgba(232,224,208,.04)" }}>
                        F M E
                    </span>
                </div>
            )}

            {/* Info */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(10,10,10,.88) 0%, rgba(10,10,10,.1) 50%, transparent 100%)",
                opacity: hovered ? 1 : 0,
                transition: "opacity .4s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "16px",
            }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "16px", letterSpacing: ".08em", color: "var(--cream)" }}>
                    {member.name}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                    <span style={{ fontSize: "9px", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)" }}>
                        {member.collection}
                    </span>
                    <span style={{ fontSize: "9px", color: "rgba(232,224,208,.4)", letterSpacing: ".1em" }}>
                        {member.date}
                    </span>
                </div>
            </div>
        </div>
    );
}

// MasonryGrid principal
interface Props {
    members: ComunidadMember[];
}

export default function MasonryGrid({ members }: Props) {
    const [selected, setSelected] = useState<ComunidadMember | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gridRef.current?.querySelectorAll<HTMLElement>(".masonry-card");
        if (!cards) return;

        cards.forEach((card, i) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: (i % 3) * 0.08, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            });
        });
    }, { scope: gridRef });

    return (
        <>
            <div
                ref={gridRef}
                style={{
                    columns: "3",
                    columnGap: "6px",
                }}
                className="masonry-wrap"
            >
                {members.map((member, i) => (
                    <div key={member.id} className="masonry-card">
                        <MasonryCard
                            member={member}
                            index={i}
                            onClick={setSelected}
                        />
                    </div>
                ))}
            </div>

            {selected && (
                <Lightbox
                    member={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    );
}