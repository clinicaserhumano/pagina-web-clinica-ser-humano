import Link from "next/link";
import { query } from "@/lib/db";
import { buildMeta } from "@/lib/seo";
import AutorBadge from "@/components/blog/AutorBadge";

export const dynamic = "force-dynamic";

export const metadata = buildMeta({
  title: "Novedades | Clínica Ser Humano",
  description: "Artículos sobre salud mental, neuromodulación, neurociencia y bienestar integral, escritos por el equipo de Clínica Ser Humano en Guayaquil.",
  path: "/novedades",
});

type Post = {
  id: number;
  titulo: string;
  slug: string;
  autor: string | null;
  categoria: string | null;
  imagen_url: string | null;
};

async function getPosts(): Promise<Post[]> {
  try {
    return await query<Post>(
      "SELECT id, titulo, slug, autor, categoria, imagen_url FROM entradas_blog WHERE publicado = 1 ORDER BY creado_en DESC"
    );
  } catch (e) {
    console.error("[novedades] Error leyendo artículos:", (e as Error).message);
    return [];
  }
}

export default async function NovedadesPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-[#616569]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#616569] to-[#3a3c3e]" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black text-white">Novedades</h1>
          <p className="mt-3 text-white/70">Artículos sobre salud, neurociencia y bienestar</p>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="bg-[#ebece8] py-16">
        <div className="mx-auto max-w-6xl px-6">
          {posts.length === 0 ? (
            <p className="text-center text-[#616569]/60">Próximamente publicaremos artículos aquí.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {featured && (
                <Link
                  href={`/novedades/${featured.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md md:col-span-1"
                >
                  <PostCard post={featured} />
                </Link>
              )}
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/novedades/${post.slug}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md"
                >
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl">
      {post.imagen_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.imagen_url}
          alt={post.titulo}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-[#616569] to-[#3a3c3e]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="mb-3 inline-block w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-[#616569]">
          {post.categoria ?? "Novedades"}
        </span>
        <h2 className="text-lg font-black leading-snug text-white">{post.titulo}</h2>
        <AutorBadge autor={post.autor} size="sm" className="mt-3 text-xs text-white/85" />
      </div>
    </div>
  );
}