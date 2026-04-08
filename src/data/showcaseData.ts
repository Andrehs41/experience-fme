/** Piezas destacadas para la demo Showcase (scroll cinematográfico) */
export interface ShowcasePiece {
    id: number;
    src: string;
    title: string;
    lookCode: string;
    detail: string;
    /** Texto para accesibilidad / SEO */
    alt: string;
}

export const SHOWCASE_PIECES: ShowcasePiece[] = [
    {
        id: 1,
        src: "/images/barrio/sesion-fme-04.webp",
        title: "Silueta core",
        lookCode: "FW26 · 01",
        detail: "Corte limpio · uso diario",
        alt: "Prenda FME silueta esencial — sesión editorial",
    },
    {
        id: 2,
        src: "/images/barrio/sesion-fme-07.webp",
        title: "Capa calle",
        lookCode: "FW26 · 02",
        detail: "Textura · volumen controlado",
        alt: "Look FME sesión editorial — volumen y capas",
    },
    {
        id: 3,
        src: "/images/barrio/sesion-fme-01.webp",
        title: "Noche barrio",
        lookCode: "FW26 · 03",
        detail: "Contraste · actitud",
        alt: "Sesión FME — contraste nocturno barrio",
    },
    {
        id: 4,
        src: "/images/barrio/sesion-fme-05.webp",
        title: "Horizonte urbano",
        lookCode: "FW26 · 04",
        detail: "Editorial · contexto real",
        alt: "Editorial FME horizonte urbano Medellín",
    },
    {
        id: 5,
        src: "/images/barrio/sesion-fme-08.webp",
        title: "Archivo vivo",
        lookCode: "FW26 · 05",
        detail: "Piezas que vuelven por demanda",
        alt: "Pieza FME archivo sesión editorial",
    },
    {
        id: 6,
        src: "/images/barrio/sesion-fme-02.webp",
        title: "Drop selecto",
        lookCode: "FW26 · 06",
        detail: "Edición limitada · sin restock",
        alt: "Drop FME sesión editorial exclusiva",
    },
];
