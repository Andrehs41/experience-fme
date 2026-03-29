import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS } from "../data/navlinksData";

const BORDER = "1px solid rgba(232,224,208,0.07)";
const BORDER_SM = "1px solid rgba(232,224,208,0.05)";

const RESPONSIVE_CSS = `
  .fme-nav-desktop { display: none !important; }
  .fme-nav-burger  { display: flex !important; }

  @media (min-width: 768px) {
    .fme-nav-desktop { display: flex !important; }
    .fme-nav-burger  { display: none !important; }
  }
`;

function ActiveIndicator({ active }: { active: boolean }) {
  return (
    <span style={{
      position: "absolute", bottom: 0, left: "28px", right: "28px",
      height: "1px", background: "var(--gold)", transformOrigin: "left",
      transform: active ? "scaleX(1)" : "scaleX(0)",
      transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
    }} />
  );
}

function BurgerIcon({ isOpen }: { isOpen: boolean }) {
  const line: React.CSSProperties = {
    display: "block", width: "22px", height: "1px", background: "var(--cream)",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <span style={{ ...line, transition: "transform 0.3s", transform: isOpen ? "rotate(45deg) translateY(6px)" : "none" }} />
      <span style={{ ...line, transition: "opacity 0.3s", opacity: isOpen ? 0 : 1 }} />
      <span style={{ ...line, transition: "transform 0.3s", transform: isOpen ? "rotate(-45deg) translateY(-6px)" : "none" }} />
    </div>
  );
}
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const id = "fme-navbar-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = RESPONSIVE_CSS;
    document.head.appendChild(tag);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
        delay: isHome ? 3.6 : 0, clearProps: "transform,opacity"
      }
    );
  }, { dependencies: [isHome] });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      setScrolled(y > 60);
      if (y > 120 && goingDown) setHidden(true);
      else if (!goingDown) setHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const logoPadding = scrolled ? "16px 32px" : "24px 40px";
  const ctaPadding = scrolled ? "0 24px" : "0 40px";

  return (
    <>
      <header
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 400,
          transition: "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s",
          transform: hidden && !isOpen ? "translateY(-110%)" : "translateY(0)",
          backgroundColor: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        {/* Línea dorada */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          opacity: scrolled ? 0.4 : 0, transition: "opacity 0.5s",
        }} />

        {/* Barra interna */}
        <div style={{ display: "flex", alignItems: "stretch", borderBottom: BORDER }}>

          {/* Logo  */}
          <div style={{ display: "flex", alignItems: "center", borderRight: BORDER, padding: logoPadding, transition: "padding 0.3s" }}>
            <Link
              to="/"
              style={{ fontFamily: "var(--font-display)", fontSize: "26px", letterSpacing: "0.18em", color: "var(--cream)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cream)")}
            >
              FME
            </Link>
          </div>

          {/* Links — SOLO desktop */}
          <nav
            className="fme-nav-desktop"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {NAV_LINKS.map(({ label, path }) => {
              const active = pathname === path;
              return (
                <div key={path} style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", borderRight: BORDER_SM }}>
                  <Link
                    to={path}
                    style={{ padding: "4px 28px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.22em", color: active ? "var(--cream)" : "var(--cream-dim)", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--cream)" : "var(--cream-dim)")}
                  >
                    {label}
                  </Link>
                  <ActiveIndicator active={active} />
                </div>
              );
            })}
          </nav>

          {/* CTA Tienda — SOLO desktop */}
          <div
            className="fme-nav-desktop"
            style={{ alignItems: "center", borderLeft: BORDER, padding: ctaPadding, transition: "padding 0.3s" }}
          >
            <a
              href="https://storefme.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-display)", fontSize: "11px", letterSpacing: "0.22em", background: "var(--cream)", color: "var(--black)", padding: "8px 20px", textDecoration: "none", whiteSpace: "nowrap", transition: "background 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--cream)")}
            >
              TIENDA →
            </a>
          </div>

          {/* Burger — SOLO mobile) */}
          <div
            className="fme-nav-burger"
            style={{ alignItems: "center", borderLeft: BORDER, padding: "0 20px", marginLeft: "auto" }}
          >
            <button
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}
            >
              <BurgerIcon isOpen={isOpen} />
            </button>
          </div>

        </div>
      </header>

      {/* ── Menú mobile fullscreen */}
      <div
        className="fme-nav-burger"
        style={{
          position: "fixed", inset: 0, zIndex: 390,
          background: "var(--black)",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.4s, visibility 0.4s",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {NAV_LINKS.map(({ label, path }, i) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              style={{
                width: "100%", textAlign: "center",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 11vw, 72px)",
                letterSpacing: "0.04em", padding: "18px 0",
                borderBottom: "1px solid rgba(232,224,208,0.06)",
                color: pathname === path ? "var(--gold)" : "var(--cream)",
                textDecoration: "none", transition: "color 0.3s",
                transitionDelay: isOpen ? `${i * 55}ms` : "0ms",
              }}
              onMouseEnter={(e) => { if (pathname !== path) e.currentTarget.style.color = "var(--cream-dim)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = pathname === path ? "var(--gold)" : "var(--cream)"; }}
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <p style={{ position: "absolute", bottom: "32px", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(232,224,208,0.18)" }}>
          La marca del barrio
        </p>
      </div>
    </>
  );
}