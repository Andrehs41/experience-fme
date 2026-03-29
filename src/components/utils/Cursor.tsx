import { useRef, useEffect } from "react";
import { gsap } from "../../lib/gsap";

interface CursorProps {
    color?: string;
    hoverColor?: string;
    hoverScale?: number;
    selector?: string;
}

export default function Cursor({
    color = "var(--gold)",
    hoverColor = "var(--gold)",
    hoverScale = 5,
    selector = "[data-cursor]",
}: CursorProps) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const label = labelRef.current;
        if (!cursor) return;

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest(selector) as HTMLElement | null;
            if (!target) return;

            const text = target.getAttribute("data-cursor") || "";
            if (label) {
                label.innerText = text;
                gsap.to(label, { opacity: text ? 1 : 0, scale: 0.2, duration: 0.3 });
            }
            gsap.to(cursor, {
                scale: hoverScale,
                backgroundColor: hoverColor,
                duration: 0.3,
            });
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest(selector);
            if (!target) return;

            if (label) gsap.to(label, { opacity: 0, duration: 0.2 });
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: color,
                duration: 0.3,
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);
        window.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            window.removeEventListener("mouseout", onMouseOut);
        };
    }, [color, hoverColor, hoverScale, selector]);

    return (
        <div
            ref={cursorRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: color,
                pointerEvents: "none",
                zIndex: 9998,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "translate(-50%, -50%)",
                mixBlendMode: "difference",
            }}
            className="hidden md:flex"
        >
            <span
                ref={labelRef}
                style={{
                    fontSize: "6px",
                    fontWeight: "bold",
                    color: "var(--black)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    opacity: 0,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.1em",
                }}
            />
        </div>
    );
}