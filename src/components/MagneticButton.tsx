import { useRef, useEffect } from "react";
import { gsap } from "../lib/gsap";

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: Props) {
    const btn = useRef<HTMLButtonElement>(null);
    const xToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
    const yToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

    useEffect(() => {
        const el = btn.current;
        if (!el) return;
        xToRef.current = gsap.quickTo(el, "x", { duration: 0.4, ease: "power2.out" });
        yToRef.current = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = btn.current;
        if (!el || !xToRef.current || !yToRef.current) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        xToRef.current(x * 0.35);
        yToRef.current(y * 0.35);
    };

    const handleMouseLeave = () => {
        gsap.to(btn.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
        });
    };

    return (
        <button
            type="button"
            ref={btn}
            className={className}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    );
}