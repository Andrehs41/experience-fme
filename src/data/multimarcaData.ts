export interface Facet {
    id: "fme" | "multimarca";
    tag: string;
    topLabel: string;
    title: string[];          
    titleAccent: number | null;     
    desc: string;
    cta: string;
    href: string;            
    external: boolean;
}

export interface Brand {
    external: any;
    id: number;
    name: string;
    desc: string;
    href: string;       // link al catálogo de esa marca
    logo?: string;       // ruta desde /public 
}

export const FACETS: [Facet, Facet] = [
    {
        id: "fme",
        tag: "Línea FME",
        topLabel: "Diseño propio",
        title: ["FME", "STORE"],
        titleAccent: null,
        desc: "Todo lo que diseñamos nosotros: del boceto al envío. Mismo equipo, misma tienda, sin intermediarios raros.",
        cta: "COMPRAR LÍNEA FME →",
        href: "https://storefme.com",
        external: true,
    },
    {
        id: "multimarca",
        tag: "Otras marcas",
        topLabel: "Curaduría",
        title: ["MULTI", "MARCA"],
        titleAccent: 1,              
        desc: "Marcas que elegimos para convivir con FME en el mismo carrito: mismo estándar, mismo soporte.",
        cta: "VER MULTIMARCA →",
        href: "https://storefme.com/multimarca",
        external: true,
    },
];

export const BRANDS: Brand[] = [
    {
        id: 1,
        name: "Marca 01",
        desc: "Descripción breve de la marca.",
        href: "https://storefme.com/marca-01",
        logo: "/images/barrio/tienda-1.jpeg",
        external: false
    },
    {
        id: 2,
        name: "Marca 02",
        desc: "Descripción breve de la marca.",
        href: "https://storefme.com/marca-02",
        external: true
    },
    {
        id: 3,
        name: "Marca 03",
        desc: "Descripción breve de la marca.",
        href: "https://storefme.com/marca-03",
        external: false
    },
    { 
        id: 4,
        name: "Marca 04",
        desc: "Descripción breve de la marca.",
        href: "https://storefme.com/marca-04",
        logo: "/images/barrio/tienda-4.jpeg",
        external: false
    },
];