import { useRef, useState, useEffect } from "react";
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
      className={`pointer-events-none absolute bottom-0 left-7 right-7 h-px origin-left bg-fme-gold transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${active ? "scale-x-100" : "scale-x-0"
        }`}
    />
  );
}

function BurgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="flex h-[13px] w-[22px] flex-col justify-between" aria-hidden>
      <span
        className={`block h-px w-full origin-center bg-fme-cream transition-transform duration-300 ease-out ${isOpen ? "translate-y-[6px] rotate-45" : ""
          }`}
      />
      <span className={`block h-px w-full bg-fme-cream transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
      <span
        className={`block h-px w-full origin-center bg-fme-cream transition-transform duration-300 ease-out ${isOpen ? "-translate-y-[6px] -rotate-45" : ""
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

  // Animación de entrada inicial
  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.1,
        clearProps: "all",
      }
    );
  }, []);

  // Animación de links en el menú móvil
  useGSAP(() => {
    const root = mobileOverlayRef.current;
    if (!root || !isOpen) return;

    const links = root.querySelectorAll<HTMLElement>(".mobile-nav-link");
    const footer = root.querySelector<HTMLElement>(".mobile-nav-footer");

    gsap.fromTo(
      links,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
    if (footer) {
      gsap.fromTo(
        footer,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: "power2.out" }
      );
    }
  }, { dependencies: [isOpen] });

  // Manejo de Scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      setScrolled(y > 20);
      if (y > 150 && goingDown) setHidden(true);
      else if (!goingDown) setHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear scroll del body al abrir menú
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Cerrar al cambiar de ruta
  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-[400] pt-[env(safe-area-inset-top,0px)] transition-[transform,background-color,backdrop-filter] duration-500 ease-in-out 
          ${hidden && !isOpen ? "-translate-y-full" : "translate-y-0"} 
          ${isOpen
            ? "bg-fme-black/95 backdrop-blur-xl" 
            : scrolled
              ? "fme-nav-surface bg-fme-black/80 backdrop-blur-md"
              : "bg-transparent" 
          }`}
      >
        {/* Línea decorativa superior */}
        <div className={`h-px bg-gradient-to-r from-transparent via-fme-gold/40 to-transparent transition-opacity duration-700 ${scrolled || isOpen ? "opacity-100" : "opacity-0"}`} />

        <div className={`flex min-h-[var(--nav-height)] items-stretch border-b ${BR} transition-all duration-300`}>
          {/* Logo */}
          <div className={`flex items-center border-r ${BR} px-6 transition-[padding] duration-300 ${scrolled ? "md:px-8 py-2" : "md:px-10 py-4"}`}>
            <Link
              to="/"
              className="fme-font-display text-[22px] tracking-[0.2em] text-fme-cream hover:text-fme-gold transition-colors duration-300 md:text-[24px]"
            >
              FME
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="relative hidden flex-1 items-stretch justify-center md:flex" aria-label="Principal">
            {NAV_LINKS.map(({ label, path }) => {
              const active = pathname === path;
              return (
                <div key={path} className={`relative flex items-stretch border-r ${BR_SM}`}>
                  <Link
                    to={path}
                    className={`flex items-center px-8 text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${active ? "text-fme-cream" : "text-fme-cream-dim hover:text-fme-cream"
                      }`}
                  >
                    {label}
                  </Link>
                  <ActiveIndicator active={active} />
                </div>
              );
            })}
          </nav>

          {/* Tienda Desktop */}
          <div className={`hidden items-stretch border-l ${BR} px-6 md:flex lg:px-10`}>
            <a
              href="https://storefme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="my-auto rounded-sm bg-fme-cream px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-fme-black transition-all duration-300 hover:bg-fme-gold"
            >
              TIENDA →
            </a>
          </div>

          {/* Botón Burger (Móvil) */}
          <div className={`ml-auto flex items-stretch border-l ${BR} md:hidden`}>
            <button
              type="button"
              className="flex items-center px-6 py-3 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <BurgerIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay Móvil */}
      <div
        ref={mobileOverlayRef}
        className={`fixed inset-0 z-[380] flex flex-col bg-fme-black transition-all duration-500 ease-in-out md:hidden ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="h-[var(--nav-height)]" />

        <nav className="flex flex-1 flex-col justify-center gap-2 px-4" aria-label="Móvil">
          {NAV_LINKS.map(({ label, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`mobile-nav-link border-b border-white/5 py-6 text-center text-[10vw] font-black uppercase italic leading-none tracking-tighter transition-colors duration-300 ${active ? "text-fme-gold" : "text-fme-cream"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mobile-nav-footer flex flex-col items-center gap-6 px-6 pb-12">
          <a
            href="https://storefme.com"
            className="w-full rounded-sm bg-fme-gold py-4 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-fme-black"
          >
            Ir a la tienda
          </a>
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">
            FME — Medellín — 2026
          </p>
        </div>
      </div>
    </>
  );
}