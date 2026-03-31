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
    id: number;
    name: string;
    desc: string;
    href: string;       // link al catálogo de esa marca
    logo?: string;       // ruta desde /public 
}

export const FACETS: [Facet, Facet] = [
    {
        id: "fme",
        tag: "La marca original",
        topLabel: "Línea propia",
        title: ["FME", "STORE"],
        titleAccent: null,
        desc: "Nuestra línea propia. Diseñada, producida y vendida desde el barrio. Identidad pura en cada pieza.",
        cta: "ENTRAR →",
        href: "https://storefme.com",
        external: true,
    },
    {
        id: "multimarca",
        tag: "Selección curada",
        topLabel: "Catálogo externo",
        title: ["MULTI", "MARCA"],
        titleAccent: 1,              
        desc: "Las mejores marcas, seleccionadas por FME Store. Streetwear de calidad bajo un mismo techo.",
        cta: "VER CATÁLOGO →",
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
    },
    {
        id: 2,
        name: "Marca 02",
        desc: "Descripción breve de la marca.",
        href: "https://storefme.com/marca-02",
    },
    {
        id: 3,
        name: "Marca 03",
        desc: "Descripción breve de la marca.",
        href: "https://storefme.com/marca-03",
    },
];