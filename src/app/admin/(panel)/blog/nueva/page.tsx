"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RichEditor from "@/components/admin/RichEditor";
import AutorSelector from "@/components/admin/AutorSelector";

const CATEGORIAS = ["Neurociencia", "Salud Mental", "Bienestar", "Programa SER", "Noticias"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NuevoArticuloPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [extracto, setExtracto] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("Dra. Sara Ochoa");
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [etiquetasInput, setEtiquetasInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicado, setPublicado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitulo = (val: string) => {
    setTitulo(val);
    setSlug(slugify(val));
  };

  const handleSubmit = useCallback(async (pub: boolean) => {
    if (!titulo.trim() || !slug.trim()) {
      setError("El título y el slug son obligatorios.");
      return;
    }
    setLoading(true);
    setError("");
    const etiquetas = etiquetasInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo,
        slug,
        extracto,
        contenido,
        autor,
        categoria,
        etiquetas,
        imagen_url: imageUrl,
        publicado: pub,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Error al guardar.");
      setLoading(false);
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }, [titulo, slug, extracto, contenido, autor, categoria, etiquetasInput, imageUrl, router]);

  return (
    <>
      {/* Topbar */}
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-7">
        <div className="flex items-center gap-3 text-[13px] text-gray-400">
          <Link href="/admin/blog" className="hover:text-gray-700">Blog / Novedades</Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">Nuevo artículo</span>
        </div>
        <div className="flex items-center gap-2">
          {error && <p className="text-[12px] text-red-600">{error}</p>}
          <button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[12px] font-bold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Guardar borrador
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="rounded-lg bg-[#ff6b12] px-3.5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#e25c08] disabled:opacity-50"
          >
            {loading ? "Guardando…" : "Publicar"}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-1 gap-0 overflow-hidden">

        {/* Área principal */}
        <div className="flex-1 overflow-y-auto bg-[#f4f4f2] p-7">
          {/* Título */}
          <input
            value={titulo}
            onChange={(e) => handleTitulo(e.target.value)}
            placeholder="Título del artículo…"
            className="mb-4 w-full rounded-xl border border-gray-200 bg-white px-6 py-4 text-[22px] font-black text-gray-900 placeholder-gray-300 outline-none focus:border-[#ff6b12] focus:ring-2 focus:ring-[#ff6b12]/10"
          />

          {/* Editor */}
          <RichEditor content={contenido} onChange={setContenido} />
        </div>

        {/* Panel lateral */}
        <aside className="w-72 flex-shrink-0 overflow-y-auto border-l border-gray-200 bg-white p-5">

          {/* Estado */}
          <div className="mb-5">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Estado</p>
            <div className="flex gap-1.5 rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setPublicado(false)}
                className={["flex-1 rounded-md py-1.5 text-[12px] font-semibold transition", !publicado ? "bg-white shadow-sm text-gray-900" : "text-gray-400 hover:text-gray-700"].join(" ")}
              >
                Borrador
              </button>
              <button
                type="button"
                onClick={() => setPublicado(true)}
                className={["flex-1 rounded-md py-1.5 text-[12px] font-semibold transition", publicado ? "bg-white shadow-sm text-green-700" : "text-gray-400 hover:text-gray-700"].join(" ")}
              >
                Publicado
              </button>
            </div>
          </div>

          {/* Slug */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
              URL (slug)
            </label>
            <p className="mb-1 text-[10px] text-gray-400">/novedades/<strong>{slug || "—"}</strong></p>
            <input
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="url-del-articulo"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-[#ff6b12] focus:ring-2 focus:ring-[#ff6b12]/10"
            />
          </div>

          {/* Extracto */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Extracto / SEO
            </label>
            <textarea
              value={extracto}
              onChange={(e) => setExtracto(e.target.value)}
              placeholder="Descripción breve para buscadores y redes. Máx. 160 caracteres."
              rows={3}
              maxLength={160}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-[#ff6b12] focus:ring-2 focus:ring-[#ff6b12]/10"
            />
            <p className="mt-1 text-right text-[10px] text-gray-400">{extracto.length}/160</p>
          </div>

          {/* Autor */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">Autor</label>
            <AutorSelector value={autor} onChange={setAutor} />
          </div>

          {/* Categoría */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-[#ff6b12] focus:ring-2 focus:ring-[#ff6b12]/10"
            >
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Etiquetas */}
          <div className="mb-5">
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Etiquetas
            </label>
            <input
              value={etiquetasInput}
              onChange={(e) => setEtiquetasInput(e.target.value)}
              placeholder="tms, cerebro, salud"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-[#ff6b12] focus:ring-2 focus:ring-[#ff6b12]/10"
            />
            <p className="mt-1 text-[10px] text-gray-400">Separadas por coma</p>
          </div>

          {/* Imagen de portada */}
          <div>
            <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Imagen de portada (URL)
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://…/imagen.jpg"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] text-gray-700 outline-none focus:border-[#ff6b12] focus:ring-2 focus:ring-[#ff6b12]/10"
            />
            {imageUrl && (
              <img src={imageUrl} alt="" className="mt-2 h-24 w-full rounded-lg object-cover border border-gray-200" />
            )}
          </div>

        </aside>
      </div>
    </>
  );
}
