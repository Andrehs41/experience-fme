export interface NavLink {
    label: string,
    path: string
}

export const NAV_LINKS: NavLink[] = [
    { label: "Colecciones", path: "/colecciones" },
    { label: "Barrio", path: "/barrio" },
    { label: "Comunidad", path: "/comunidad" },
    { label: "Multimarca", path: "/multimarca" },
];