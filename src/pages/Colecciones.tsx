import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { ITEMS } from "../data/coleccionesData";

export default function Colecciones() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".item");

    //  Efecto Parallax basado en el movimiento del Mouse
    const xTo = gsap.quickTo(galleryRef.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(galleryRef.current, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * -150;
      const yPos = (clientY / window.innerHeight - 0.5) * -150;
      xTo(xPos);
      yTo(yPos);

      // Parallax individual por profundidad (Z)
      items.forEach((item) => {
        const depth = Number(item.getAttribute("data-z")) * 0.05;
        gsap.to(item, {
          x: (clientX / window.innerWidth - 0.5) * (depth * 50),
          y: (clientY / window.innerHeight - 0.5) * (depth * 50),
          duration: 1,
          ease: "power2.out"
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animación inicial de entrada
    gsap.from(items, {
      scale: 0,
      opacity: 0,
      x: () => (Math.random() - 0.5) * 1000,
      y: () => (Math.random() - 0.5) * 1000,
      duration: 2,
      stagger: 0.05,
      ease: "expo.out",
      delay: 0.5
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden cursor-none">

      {/* Título de Fondo Estático */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[25vw] font-bold text-white/[0.02] tracking-tighter leading-none select-none">
          COLLECTIONS
        </h1>
      </div>

      {/* Galería Flotante */}
      <div ref={galleryRef} className="relative w-full h-full">
        {ITEMS.map((item) => (
          <div
            data-cursor={item.title}
            key={item.id}
            data-z={item.z}
            className={`item absolute ${item.size} group will-change-transform`}
            style={{ top: item.top, left: item.left, zIndex: item.z }}
          >
            <div className="relative overflow-hidden transition-all duration-500 group-hover:scale-110">
              <img
                src={item.src}
                alt={`FME ${item.id}`}
                className={`w-full h-full transition-all duration-700 
                  ${item.type !== "scene" ? "drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" : "grayscale-[50%] group-hover:grayscale-0"}
                `}
              />

              {/* Overlay con info disruptiva */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                <span className="text-[gold] font-bold text-[8px] tracking-[0.5em] uppercase border border-[gold] px-3 py-1">
                  Ver colección
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Texto minimalista flotante */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-2 z-[100]">
        <div className="h-px w-20 bg-[gold]"></div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">
          Explora la esencia | Descubre el barrio
        </p>
      </div>

      <div className="absolute top-1/2 right-10 -translate-y-1/2 flex flex-col items-center gap-8 z-[100] mix-blend-difference">
        {['FW26', 'SS26', 'CORE'].map((cat) => (
          <button key={cat} className="rotate-90 text-[10px] tracking-[1em] hover:text-[gold] transition-colors uppercase">
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}