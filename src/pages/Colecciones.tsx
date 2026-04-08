import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import { ITEMS } from "../data/coleccionesData";
import HeroBackground from "../components/HeroBackground";

const SEASONS = ["FW26", "SS26", "CORE"] as const;
type Season = (typeof SEASONS)[number];

function matchesSeason(index: number, season: Season): boolean {
  return index % 3 === SEASONS.indexOf(season);
}

function typeLabel(type: string): string {
  if (type === "person") return "Retrato";
  if (type === "product") return "Pieza";
  return "Escena";
}

export default function Colecciones() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [season, setSeason] = useState<Season>("FW26");

  const filtered = useMemo(
    () => ITEMS.map((item, i) => ({ item, i })).filter(({ i }) => matchesSeason(i, season)),
    [season]
  );

  useGSAP(
    () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduced) {
        gsap
          .timeline({ defaults: { ease: "power4.out" }, delay: 0.08 })
          .from(".cc-hero-line", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
          })
          .from(".cc-hero-eyebrow", { y: 16, opacity: 0, duration: 0.55 }, "-=0.65")
          .from(".cc-hero-title", { y: 36, opacity: 0, duration: 0.85 }, "-=0.55")
          .from(".cc-hero-copy", { y: 20, opacity: 0, duration: 0.55 }, "-=0.45")
          .from(".cc-hero-actions", { y: 12, opacity: 0, duration: 0.45 }, "-=0.35");
      }
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const cards = gsap.utils.toArray<HTMLElement>(".colecciones-card");
      if (cards.length && !reduced) {
        gsap.from(cards, {
          y: 32,
          opacity: 0,
          duration: 0.65,
          stagger: { each: 0.06, from: "start" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".colecciones-grid",
            start: "top 82%",
            once: true,
          },
        });
      } else if (cards.length) {
        gsap.set(cards, { opacity: 1, y: 0 });
      }

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      return () => {
        window.removeEventListener("load", onLoad);
      };
    },
    { scope: rootRef, dependencies: [season] }
  );

  return (
    <div ref={rootRef} className="fme-page-vignette-deep relative text-fme-white">
      <section className="relative z-[2] px-5 pb-12 pt-2 md:px-12 md:pb-16 md:pt-4 lg:px-16">
        <div className="cc-hero-line mb-8 h-px w-16 bg-fme-gold md:mb-10 md:w-24 z-[1]" />
        <HeroBackground
          src="/images/fme-hero.webp"
          blur={1.5}
          brightness={0.32}
          saturation={1.1}
          overlay={0.65}
          glow="cream"
        />
        <p className="cc-hero-eyebrow text-[10px] uppercase tracking-[0.42em] text-fme-gold">
          Lookbook · temporada
        </p>
        <h1 className="cc-hero-title fme-font-display mt-5 max-w-[14ch] text-[clamp(2.4rem,9vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-fme-cream">
          Colecciones
        </h1>
        <p className="cc-hero-copy mt-6 max-w-xl text-sm font-light leading-relaxed text-fme-cream-dim md:text-base">
          Piezas y escenas en contexto. Elegí una línea para filtrar el archivo; en tienda tenés talle y stock al día.
        </p>
        <div className="cc-hero-actions mt-8 flex flex-wrap items-center gap-4">
          <a
            href="https://storefme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fme-focus-ring inline-flex items-center justify-center rounded-sm border border-[var(--border-gold-12)] bg-fme-cream px-6 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-fme-black transition-colors hover:bg-fme-gold"
          >
            Ir a la tienda
          </a>
          <Link
            to="/barrio"
            className="fme-focus-ring text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim transition-colors hover:text-fme-gold"
          >
            Ver el barrio →
          </Link>
        </div>
      </section>

      <section className="relative z-[2] border-t border-[var(--border-cream-08)] px-5 py-8 md:px-12 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-fme-cream-dim">Línea activa</p>
            <p className="fme-font-display mt-2 text-2xl text-fme-cream md:text-3xl">{season}</p>
            <p className="mt-2 text-[11px] text-fme-cream-dim">
              {filtered.length} {filtered.length === 1 ? "pieza" : "piezas"} en esta vista
            </p>
          </div>
          <div
            className="flex flex-wrap gap-2 md:justify-end"
            role="group"
            aria-label="Filtrar por temporada"
          >
            {SEASONS.map((s) => {
              const active = season === s;
              return (
                <button
                  key={s}
                  type="button"
                  aria-label={`Mostrar línea ${s}${active ? " (activa)" : ""}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setSeason(s)}
                  className={`fme-focus-ring rounded-sm border px-4 py-2.5 text-[9px] uppercase tracking-[0.22em] transition-colors md:px-5 ${active
                    ? "border-fme-gold bg-[rgb(var(--gold-rgb)/0.12)] text-fme-gold"
                    : "border-[var(--border-cream-10)] text-fme-cream-dim hover:border-[var(--border-cream-20)] hover:text-fme-cream"
                    }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-[2] px-5 pb-20 md:px-12 lg:px-16 lg:pb-28">
        <div
          key={season}
          className="colecciones-grid grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
        >
          {filtered.map(({ item }, idx) => {
            const lookCode = `${season} · ${String(idx + 1).padStart(2, "0")}`;
            const featured = idx % 6 === 0;
            return (
              <article
                key={`${season}-${item.id}`}
                data-cursor={item.title}
                className={`colecciones-card group relative overflow-hidden rounded-sm border border-[var(--border-cream-10)] bg-fme-surface-deep transition-[border-color,box-shadow] duration-300 hover:border-[var(--border-gold-12)] hover:shadow-[0_24px_48px_rgb(var(--black-rgb)/0.45)] ${featured ? "col-span-2 aspect-[21/9] md:aspect-[2.4/1] lg:col-span-2 lg:row-span-1" : "aspect-[3/4]"
                  }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  onLoad={() => ScrollTrigger.refresh()}
                  {...(idx === 0 ? { fetchPriority: "high" as const } : {})}
                  className={`h-full w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] ${item.type === "scene" ? "grayscale-[35%] group-hover:grayscale-0" : ""
                    }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fme-black via-fme-black/20 to-transparent opacity-90 md:opacity-80" />
                <div className="absolute inset-x-0 bottom-0 z-[1] p-3 sm:p-4 md:p-5">
                  <p className="text-[9px] uppercase tracking-[0.38em] text-fme-gold">{lookCode}</p>
                  <h2 className="fme-font-display mt-1.5 text-lg leading-tight text-fme-cream sm:text-xl md:text-2xl">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-fme-cream-dim">
                    {typeLabel(item.type)}
                  </p>
                </div>
                <a
                  href="https://storefme.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fme-focus-ring absolute inset-0 z-[2] rounded-sm"
                  aria-label={`Ver ${item.title} en la tienda FME`}
                />
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative z-[2] border-t border-[var(--border-gold-08)] bg-gradient-to-b from-fme-black to-[rgb(var(--gold-rgb)/0.05)] px-5 py-16 md:px-12 md:py-20 lg:px-16">
        <p className="text-[10px] uppercase tracking-[0.38em] text-fme-gold">Siguiente paso</p>
        <p className="fme-font-display mt-5 max-w-lg text-[clamp(1.35rem,3.5vw,2.1rem)] leading-tight text-fme-cream">
          Si un modelo agotó online, puede quedar en tienda. Escribinos o pasá por el local.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <a
            href="https://storefme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fme-focus-ring inline-flex items-center justify-center rounded-sm border border-[var(--border-gold-12)] bg-fme-cream px-7 py-3.5 text-[10px] font-medium uppercase tracking-[0.26em] text-fme-black transition-colors hover:bg-fme-gold"
          >
            Abrir tienda oficial →
          </a>
          <Link
            to="/comunidad"
            className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.26em] text-fme-cream-dim transition-colors hover:text-fme-gold"
          >
            Comunidad →
          </Link>
          <Link
            to="/"
            className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.26em] text-fme-cream-dim transition-colors hover:text-fme-gold"
          >
            Inicio →
          </Link>
        </div>
      </section>
    </div>
  );
}
