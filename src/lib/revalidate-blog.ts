import { revalidatePath } from "next/cache";

/** Actualiza al instante las páginas públicas del blog tras un cambio en el panel */
export function revalidarBlog() {
  revalidatePath("/novedades");
  revalidatePath("/novedades/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
