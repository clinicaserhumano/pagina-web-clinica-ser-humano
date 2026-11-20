import { execute, query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { revalidarBlog } from "@/lib/revalidate-blog";
import Link from "next/link";

type Comment = {
  id: number;
  nombre: string;
  comentario: string;
  slug: string;
  aprobado: boolean;
  creado_en: string;
};

async function getComments(aprobado: boolean): Promise<Comment[]> {
  return query<Comment>(
    "SELECT id, nombre, comentario, slug, aprobado, creado_en FROM comments WHERE aprobado = ? ORDER BY creado_en DESC",
    [aprobado]
  );
}

async function approveComment(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await execute("UPDATE comments SET aprobado = 1 WHERE id = ?", [id]);
  revalidatePath("/admin/comentarios");
  revalidarBlog();
  revalidatePath("/admin");
}

async function deleteComment(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await execute("DELETE FROM comments WHERE id = ?", [id]);
  revalidatePath("/admin/comentarios");
  revalidarBlog();
  revalidatePath("/admin");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-EC", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type PageProps = { searchParams: { tab?: string } };

export default async function ComentariosPage({ searchParams }: PageProps) {
  const tab = searchParams.tab === "aprobados" ? "aprobados" : "pendientes";
  const isApproved = tab === "aprobados";
  const comments = await getComments(isApproved);

  return (
    <>
      {/* Topbar */}
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-7">
        <h1 className="text-[15px] font-bold text-gray-900">Comentarios</h1>
        <Link href="/" className="text-[12px] text-gray-400 transition hover:text-gray-600">
          ← Ver sitio
        </Link>
      </div>

      <div className="p-7">
        {/* Tabs */}
        <div className="mb-5 flex w-fit gap-0.5 rounded-[9px] bg-gray-100 p-[3px]">
          {(["pendientes", "aprobados"] as const).map((t) => (
            <Link
              key={t}
              href={`/admin/comentarios?tab=${t}`}
              className={[
                "rounded-[7px] px-4 py-[6px] text-[12px] font-semibold capitalize transition",
                tab === t
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-700",
              ].join(" ")}
            >
              {t === "pendientes" ? "Pendientes" : "Aprobados"}
              {tab === t && (
                <span className="ml-2 rounded-full bg-[#ff6b12] px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                  {comments.length}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Table */}
        {comments.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center text-[13px] text-gray-400">
            {tab === "pendientes"
              ? "No hay comentarios pendientes. ✓"
              : "No hay comentarios aprobados aún."}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-36">Autor</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Comentario</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-44">Artículo</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-36">Fecha</th>
                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400 w-40">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60">
                    <td className="px-5 py-3.5 font-semibold text-gray-900">{c.nombre}</td>
                    <td className="px-5 py-3.5 text-gray-600 max-w-xs">
                      <span className="line-clamp-2">{c.comentario}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/novedades/${c.slug}`}
                        target="_blank"
                        className="text-[12px] text-blue-600 hover:underline"
                      >
                        {c.slug}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-gray-400 whitespace-nowrap">
                      {formatDate(c.creado_en)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        {!isApproved && (
                          <form action={approveComment}>
                            <input type="hidden" name="id" value={c.id} />
                            <button
                              type="submit"
                              className="rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700 transition hover:bg-green-100"
                            >
                              ✓ Aprobar
                            </button>
                          </form>
                        )}
                        <form action={deleteComment}>
                          <input type="hidden" name="id" value={c.id} />
                          <button
                            type="submit"
                            className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 transition hover:bg-red-100"
                          >
                            {isApproved ? "Eliminar" : "✕ Rechazar"}
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