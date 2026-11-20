import { execute, query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";

type Mensaje = {
  id: number;
  nombre: string;
  telefono: string | null;
  email: string | null;
  mensaje: string;
  leido: boolean;
  creado_en: string;
};

async function getMensajes(leido: boolean): Promise<Mensaje[]> {
  return query<Mensaje>(
    "SELECT id, nombre, telefono, email, mensaje, leido, creado_en FROM mensajes_contacto WHERE leido = ? ORDER BY creado_en DESC",
    [leido]
  );
}

async function marcarLeido(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await execute("UPDATE mensajes_contacto SET leido = 1 WHERE id = ?", [id]);
  revalidatePath("/admin/mensajes");
  revalidatePath("/admin");
}

async function eliminarMensaje(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await execute("DELETE FROM mensajes_contacto WHERE id = ?", [id]);
  revalidatePath("/admin/mensajes");
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

function inicial(nombre: string) {
  return nombre.charAt(0).toUpperCase();
}

type PageProps = { searchParams: { tab?: string } };

export default async function MensajesPage({ searchParams }: PageProps) {
  const tab = searchParams.tab === "atendidos" ? "atendidos" : "nuevos";
  const mensajes = await getMensajes(tab === "atendidos");

  return (
    <>
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-7">
        <h1 className="text-[15px] font-bold text-gray-900">Mensajes de contacto</h1>
        <Link href="/" className="text-[12px] text-gray-400 transition hover:text-gray-600">
          ← Ver sitio
        </Link>
      </div>

      <div className="p-7">
        {/* Tabs */}
        <div className="mb-5 flex w-fit gap-0.5 rounded-[9px] bg-gray-100 p-[3px]">
          {(["nuevos", "atendidos"] as const).map((t) => (
            <Link
              key={t}
              href={`/admin/mensajes?tab=${t}`}
              className={[
                "rounded-[7px] px-4 py-[6px] text-[12px] font-semibold capitalize transition",
                tab === t
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-700",
              ].join(" ")}
            >
              {t === "nuevos" ? "Nuevos" : "Atendidos"}
              {tab === t && mensajes.length > 0 && (
                <span className="ml-2 rounded-full bg-[#ff6b12] px-1.5 py-0.5 text-[9px] font-extrabold text-white">
                  {mensajes.length}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Lista */}
        {mensajes.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center text-[13px] text-gray-400">
            {tab === "nuevos" ? "No hay mensajes nuevos. ✓" : "No hay mensajes atendidos aún."}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mensajes.map((m) => (
              <div
                key={m.id}
                className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#ff6b12] text-[13px] font-extrabold text-white">
                  {inicial(m.nombre)}
                </div>

                {/* Cuerpo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-bold text-gray-900">{m.nombre}</p>
                      <p className="text-[11px] text-gray-400">
                        {m.telefono && (
                          <a href={`tel:${m.telefono}`} className="hover:text-[#ff6b12]">
                            {m.telefono}
                          </a>
                        )}
                        {m.telefono && m.email && " · "}
                        {m.email}
                        {" · "}
                        {formatDate(m.creado_en)}
                      </p>
                    </div>
                    <span
                      className={[
                        "flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold",
                        m.leido
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-amber-200 bg-amber-50 text-amber-700",
                      ].join(" ")}
                    >
                      {m.leido ? "Atendido" : "Nuevo"}
                    </span>
                  </div>

                  <p className="mt-2.5 text-[13px] leading-relaxed text-gray-500">{m.mensaje}</p>

                  <div className="mt-3 flex gap-2">
                    {m.telefono && (
                      <a
                        href={`https://wa.me/${m.telefono.replace(/\D/g, "")}?text=Hola%20${encodeURIComponent(m.nombre)}%2C%20te%20contactamos%20desde%20Cl%C3%ADnica%20Ser%20Humano.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-700 transition hover:bg-green-100"
                      >
                        💬 WhatsApp
                      </a>
                    )}
                    {!m.leido && (
                      <form action={marcarLeido}>
                        <input type="hidden" name="id" value={m.id} />
                        <button
                          type="submit"
                          className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-bold text-gray-600 transition hover:bg-gray-100"
                        >
                          ✓ Marcar atendido
                        </button>
                      </form>
                    )}
                    <form action={eliminarMensaje}>
                      <input type="hidden" name="id" value={m.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-700 transition hover:bg-red-100"
                      >
                        Eliminar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
