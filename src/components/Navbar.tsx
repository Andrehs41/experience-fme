import { useRef, useState, useEffect, useId } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "../data/navlinksData";

const BR = "border-[var(--border-cream-07)]";
const BR_SM = "border-[var(--border-cream-05)]";

function ActiveIndicator({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bottom-0 left-7 right-7 h-px origin-left bg-fme-gold transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        active ? "scale-x-100" : "scale-x-0"
      }`}
    />
  );
}

function BurgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="flex h-[13px] w-[22px] flex-col justify-between" aria-hidden>
      <span
        className={`block h-px w-full origin-center bg-fme-cream transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span className={`block h-px w-full bg-fme-cream transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
      <span
        className={`block h-px w-full origin-center bg-fme-cream transition-transform duration-300 ease-out ${
          isOpen ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const mobileNavId = useId();

  const showGlass = scrolled || isOpen;
  const compact = scrolled;

  useGSAP(
    () => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: isHome ? 3.6 : 0,
          clearProps: "transform,opacity",
        }
      );
    },
    { dependencies: [isHome] }
  );

  useGSAP(
    () => {
      const root = mobileOverlayRef.current;
      if (!root || !isOpen) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const links = root.querySelectorAll<HTMLElement>(".mobile-nav-link");
      const footer = root.querySelector<HTMLElement>(".mobile-nav-footer");
      if (reduced) {
        gsap.set(links, { clearProps: "all" });
        if (footer) gsap.set(footer, { clearProps: "all" });
        return;
      }

      gsap.fromTo(
        links,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.055,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
      if (footer) {
        gsap.fromTo(
          footer,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.12, overwrite: "auto" }
        );
      }
    },
    { dependencies: [isOpen] }
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      setScrolled(y > 48);
      if (y > 120 && goingDown) setHidden(true);
      else if (!goingDown) setHidden(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-[400] pt-[env(safe-area-inset-top,0px)] transition-[transform,background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          hidden && !isOpen ? "-translate-y-full" : "translate-y-0"
        } ${showGlass ? "fme-nav-surface" : "bg-transparent"}`}
      >
        <div
          className={`h-px bg-gradient-to-r from-transparent via-fme-gold to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-60" : "opacity-[0.12]"
          }`}
        />

        <div className={`flex min-h-[var(--nav-height)] items-stretch border-b ${BR}`}>
          {/* Logo */}
          <div
            className={`flex items-center border-r ${BR} transition-[padding] duration-300 ${
              compact ? "px-6 py-3 md:px-8 md:py-3" : "px-5 py-4 md:px-10 md:py-5"
            }`}
          >
            <Link
              to="/"
              className="fme-focus-ring fme-font-display text-[24px] tracking-[0.18em] text-fme-cream transition-colors duration-300 hover:text-fme-gold md:text-[26px]"
            >
              FME
            </Link>
          </div>

          {/* Desktop nav */}
          <nav
            className="relative hidden flex-1 items-stretch justify-center md:flex"
            aria-label="Principal"
          >
            {NAV_LINKS.map(({ label, path }) => {
              const active = pathname === path;
              return (
                <div key={path} className={`relative flex items-stretch border-r ${BR_SM}`}>
                  <Link
                    to={path}
                    className={`fme-focus-ring flex items-center px-7 py-1 text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                      active ? "text-fme-cream" : "text-fme-cream-dim hover:text-fme-cream"
                    }`}
                  >
                    {label}
                  </Link>
                  <ActiveIndicator active={active} />
                </div>
              );
            })}
          </nav>

          {/* Tienda desktop */}
          <div
            className={`hidden items-stretch border-l ${BR} transition-[padding] duration-300 md:flex ${
              compact ? "px-5" : "px-8 lg:px-10"
            }`}
          >
            <a
              href="https://storefme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="fme-focus-ring fme-font-display my-auto inline-flex items-center rounded-sm bg-fme-cream px-5 py-2 text-[10px] uppercase tracking-[0.22em] text-fme-black shadow-[0_1px_0_0_var(--border-gold-10)] transition-all duration-300 hover:bg-fme-gold hover:shadow-[0_0_0_1px_var(--border-gold-18)] sm:text-[11px]"
            >
              TIENDA →
            </a>
          </div>

          {/* Burger */}
          <div className={`ml-auto flex items-stretch border-l ${BR} md:hidden`}>
            <button
              type="button"
              className="fme-focus-ring flex items-center px-5 py-3"
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls={mobileNavId}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsOpen((v) => !v)}
            >
              <BurgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay móvil */}
      <div
        ref={mobileOverlayRef}
        id={mobileNavId}
        className={`fixed inset-0 z-[380] flex flex-col bg-[radial-gradient(ellipse_130%_70%_at_50%_-15%,rgb(var(--gold-rgb)/0.14),transparent_50%),var(--black)] pt-[calc(var(--nav-height)+env(safe-area-inset-top,0px))] transition-[opacity,visibility] duration-500 ease-out md:hidden ${
          isOpen ? "pointer-events-auto opacity-100 visible" : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={isOpen ? "false" : "true"}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <nav className="flex flex-1 flex-col justify-center px-2" aria-label="Móvil">
          {NAV_LINKS.map(({ label, path }, i) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`mobile-nav-link fme-focus-ring fme-font-display border-b border-[var(--border-cream-06)] py-5 text-center text-[clamp(2rem,10vw,3.75rem)] leading-none tracking-[0.02em] transition-colors duration-300 ${
                  active ? "text-fme-gold" : "text-fme-cream hover:text-fme-gold"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label.toUpperCase()}
              </Link>
            );
          })}
        </nav>

        <div className="mobile-nav-footer flex flex-col items-center gap-8 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <a
            href="https://storefme.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fme-focus-ring fme-font-display w-full max-w-sm rounded-sm border border-[var(--border-gold-12)] bg-fme-cream py-3.5 text-center text-[11px] uppercase tracking-[0.28em] text-fme-black transition-colors duration-300 hover:bg-fme-gold"
            onClick={() => setIsOpen(false)}
          >
            Ir a la tienda
          </a>
          <p className="text-[9px] uppercase tracking-[0.35em] text-[var(--text-cream-faint)]">
            FME · Medellín
          </p>
        </div>
      </div>
    </>
  );
}
