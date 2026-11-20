import { query, queryOne } from "@/lib/db";
import Link from "next/link";

// El panel siempre lee datos actuales de la base de datos (nunca una copia de la compilación)
export const dynamic = "force-dynamic";

async function getStats() {
  const row = await queryOne<{ pendientes: number; aprobados: number }>(
    "SELECT COALESCE(SUM(aprobado = 0), 0) AS pendientes, COALESCE(SUM(aprobado = 1), 0) AS aprobados FROM comments"
  );
  return {
    pendingComments: Number(row?.pendientes ?? 0),
    approvedComments: Number(row?.aprobados ?? 0),
  };
}

async function getRecentComments() {
  return query<{ id: number; nombre: string; comentario: string; slug: string; aprobado: boolean; creado_en: string }>(
    "SELECT id, nombre, comentario, slug, aprobado, creado_en FROM comments WHERE aprobado = 0 ORDER BY creado_en DESC LIMIT 5"
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number;
  sub: string;
  accent: string;
}) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 border-t-[3px] ${accent}`}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-2 text-[30px] font-black leading-none text-gray-900">{value}</p>
      <p className="mt-1.5 text-[11px] text-gray-400">{sub}</p>
    </div>
  );
}

export default async function AdminDashboard() {
  const [stats, recentComments] = await Promise.all([
    getStats(),
    getRecentComments(),
  ]);

  return (
    <>
      {/* Topbar */}
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-7">
        <h1 className="text-[15px] font-bold text-gray-900">Dashboard</h1>
        <Link
          href="/"
          className="text-[12px] text-gray-400 transition hover:text-gray-600"
        >
          ← Ver sitio
        </Link>
      </div>

      <div className="p-7">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          <StatCard
            label="Comentarios pendientes"
            value={stats.pendingComments}
            sub="Esperando revisión"
            accent="border-amber-400"
          />
          <StatCard
            label="Comentarios aprobados"
            value={stats.approvedComments}
            sub="Visibles en el blog"
            accent="border-green-500"
          />
          <StatCard
            label="Artículos publicados"
            value={2}
            sub="En el blog"
            accent="border-[#ff6b12]"
          />
          <StatCard
            label="Mensajes de contacto"
            value={0}
            sub="Próximamente"
            accent="border-blue-500"
          />
        </div>

        {/* Pending comments */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              Comentarios pendientes
            </p>
            <Link
              href="/admin/comentarios"
              className="text-[12px] font-semibold text-[#ff6b12] hover:underline"
            >
              Ver todos →
            </Link>
          </div>

          {recentComments.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center text-[13px] text-gray-400">
              No hay comentarios pendientes. ✓
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Autor</th>
                    <th className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Comentario</th>
                    <th className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Artículo</th>
                    <th className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-gray-400">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {recentComments.map((c) => (
                    <tr key={c.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{c.nombre}</td>
                      <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{c.comentario}</td>
                      <td className="px-4 py-3 text-[12px] text-gray-400">{c.slug}</td>
                      <td className="px-4 py-3">
                        <Link
                          href="/admin/comentarios"
                          className="text-[12px] font-semibold text-[#ff6b12] hover:underline"
                        >
                          Revisar →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}