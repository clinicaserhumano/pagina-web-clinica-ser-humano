"use client";

import { usePathname } from "next/navigation";

const esAdmin = (path: string | null) => !!path && path.startsWith("/admin");

/** Muestra su contenido solo en el sitio público (no en /admin).
 *  Usa la ruta en lugar de headers(), así las páginas públicas pueden
 *  generarse una sola vez (estáticas) en vez de en cada visita. */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  return esAdmin(usePathname()) ? null : <>{children}</>;
}

/** <main> con el espacio superior para la barra de navegación fija (solo en el sitio público) */
export function MainContent({ children }: { children: React.ReactNode }) {
  return <main className={esAdmin(usePathname()) ? "" : "pt-[72px]"}>{children}</main>;
}
