import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Estructura del artículo que se muestra al instante al hacer clic,
 *  mientras llega el contenido (con la misma disposición que la página real). */
export default function ArticuloLoading() {
  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-6 py-16" aria-busy="true" aria-label="Cargando artículo">
        <Link
          href="/novedades"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#616569]/60 transition-colors hover:text-[#ff6b12]"
        >
          <ArrowLeft size={14} /> Novedades
        </Link>

        <div className="animate-pulse">
          <div className="mb-6 mt-4 h-6 w-28 rounded-full bg-[#ff6b12]/10" />
          <div className="h-9 w-11/12 rounded-lg bg-[#616569]/15 md:h-10" />
          <div className="mt-3 h-9 w-2/3 rounded-lg bg-[#616569]/15 md:h-10" />

          <div className="mt-5 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#616569]/15" />
            <div className="h-4 w-40 rounded bg-[#616569]/10" />
          </div>

          <div className="mt-8 h-72 w-full rounded-2xl bg-[#616569]/10 md:h-96" />

          <div className="mt-10 space-y-3">
            {["w-full", "w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map((w, i) => (
              <div key={i} className={`h-4 rounded bg-[#616569]/10 ${w}`} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
