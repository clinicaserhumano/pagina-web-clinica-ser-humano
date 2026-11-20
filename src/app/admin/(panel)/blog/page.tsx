import { execute, query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";

// El panel siempre lee datos actuales de la base de datos (nunca una copia de la compilación)
export const dynamic = "force-dynamic";

type Entrada = {
  id: number;
  titulo: string;
  slug: string;
  categoria: string | null;
  autor: string | null;
  publicado: boolean;
  creado_en: string;
};

async function getEntradas(): Promise<Entrada[]> {
  return query<Entrada>(
    "SELECT id, titulo, slug, categoria, autor, publicado, creado_en FROM entradas_blog ORDER BY creado_en DESC"
  );
}

async function eliminarEntrada(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await execute("DELETE FROM entradas_blog WHERE id = ?", [id]);
  revalidatePath("/admin/blog");
}

async function togglePublicado(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const actual = formData.get("publicado") === "true";
  await execute("UPDATE entradas_blog SET publicado = ?, actualizado_en = UTC_TIMESTAMP() WHERE id = ?", [!actual, id]);
  revalidatePath("/admin/blog");
  revalidatePath("/novedades");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogAdminPage() {
  const entradas = await getEntradas();

  return (
    <>
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-7">
        <h1 className="text-[15px] font-bold text-gray-900">Blog / Novedades</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/nueva"
            className="rounded-lg bg-[#ff6b12] px-3.5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#e25c08]"
          >
            + Nuevo artículo
          </Link>
          <Link href="/" className="text-[12px] text-gray-400 transition hover:text-gray-600">
            ← Ver sitio
          </Link>
        </div>
      </div>

      <div className="p-7">
        {entradas.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <p className="text-[13px] text-gray-400">No hay artículos creados aún.</p>
            <Link
              href="/admin/blog/nueva"
              className="mt-4 inline-block rounded-lg bg-[#ff6b12] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#e25c08]"
            >
              Crear primer artículo
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Título</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-28">Categoría</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-28">Autor</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-28">Fecha</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-24">Estado</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-36">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {entradas.map((e) => (
                  <tr key={e.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-gray-900 line-clamp-1">{e.titulo}</p>
                      <p className="text-[11px] text-gray-400">/novedades/{e.slug}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500">{e.categoria ?? "—"}</td>
                    <td className="px-5 py-3.5 text-gray-500">{e.autor ?? "—"}</td>
                    <td className="px-5 py-3.5 text-[12px] text-gray-400 whitespace-nowrap">{formatDate(e.creado_en)}</td>
                    <td className="px-5 py-3.5">
                      <form action={togglePublicado}>
                        <input type="hidden" name="id" value={e.id} />
                        <input type="hidden" name="publicado" value={String(e.publicado)} />
                        <button
                          type="submit"
                          className={[
                            "rounded-full border px-2.5 py-0.5 text-[10px] font-bold transition",
                            e.publicado
                              ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                              : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100",
                          ].join(" ")}
                        >
                          {e.publicado ? "Publicado" : "Borrador"}
                        </button>
                      </form>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/blog/${e.id}/editar`}
                          className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-bold text-gray-600 transition hover:bg-gray-100"
                        >
                          Editar
                        </Link>
                        <Link
                          href={`/novedades/${e.slug}`}
                          target="_blank"
                          className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600 transition hover:bg-blue-100"
                        >
                          Ver
                        </Link>
                        <form action={eliminarEntrada}>
                          <input type="hidden" name="id" value={e.id} />
                          <button
                            type="submit"
                            className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 transition hover:bg-red-100"
                          >
                            ✕
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
