import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { buildMeta } from "@/lib/seo";
import CommentForm from "@/components/blog/CommentForm";
import ShareButtons from "@/components/blog/ShareButtons";

export const dynamic = "force-dynamic";

type Comment = { id: number; nombre: string; comentario: string; creado_en: string };
type Props = { params: { slug: string } };

type Post = {
  id: number;
  titulo: string;
  slug: string;
  extracto: string | null;
  contenido: string | null;
  autor: string | null;
  categoria: string | null;
  etiquetas: string[] | null;
  imagen_url: string | null;
  creado_en: string;
};

function sb() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);
}

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, cancel: () => clearTimeout(timeout) };
}

async function getPost(slug: string): Promise<Post | null> {
  const { signal, cancel } = withTimeout(1500);
  try {
    const { data, error } = await sb()
      .from("entradas_blog")
      .select("*")
      .eq("slug", slug)
      .eq("publicado", true)
      .abortSignal(signal)
      .single();
    if (error) return null;
    return data ?? null;
  } catch {
    return null;
  } finally {
    cancel();
  }
}

async function getComments(slug: string): Promise<Comment[]> {
  const { signal, cancel } = withTimeout(1500);
  try {
    const { data, error } = await sb()
      .from("comments")
      .select("id, nombre, comentario, creado_en")
      .eq("slug", slug)
      .eq("aprobado", true)
      .order("creado_en", { ascending: true })
      .abortSignal(signal);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  } finally {
    cancel();
  }
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return buildMeta({
    title: `${post.titulo} | Clínica Ser Humano`,
    description: post.extracto ?? "",
    path: `/novedades/${post.slug}`,
    image: post.imagen_url ?? undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const [post, comments] = await Promise.all([
    getPost(params.slug),
    getComments(params.slug),
  ]);

  if (!post) notFound();

  const fecha = new Date(post.creado_en).toLocaleDateString("es-EC", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/novedades"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#616569]/60 hover:text-[#ff6b12] transition-colors"
        >
          <ArrowLeft size={14} /> Novedades
        </Link>

        <div className="mb-6 mt-4">
          <span className="rounded-full bg-[#ff6b12]/10 px-3 py-1 text-xs font-bold uppercase text-[#ff6b12]">
            {post.categoria ?? "Novedades"}
          </span>
        </div>

        <h1 className="text-3xl font-black leading-tight text-[#616569] md:text-4xl">
          {post.titulo}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#616569]/55">
          <span className="flex items-center gap-1.5">
            <User size={14} /> {post.autor ?? "Clínica Ser Humano"}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {fecha}
          </span>
        </div>

        {post.imagen_url && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imagen_url}
              alt={post.titulo}
              className="h-72 w-full object-cover md:h-96"
            />
          </div>
        )}

        <div
          className="blog-content mt-10 text-[#616569]/80"
          dangerouslySetInnerHTML={{ __html: post.contenido ?? "" }}
        />

        {post.etiquetas && post.etiquetas.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-[#616569]/40" />
              {post.etiquetas.map((t) => (
                <span key={t} className="rounded-full bg-[#ebece8] px-3 py-1 text-xs text-[#616569]">
                  {t}
                </span>
              ))}
            </div>
            <ShareButtons title={post.titulo} />
          </div>
        )}
      </article>

      <CommentsSection slug={params.slug} comments={comments} />
    </div>
  );
}

function CommentsSection({ slug, comments }: { slug: string; comments: Comment[] }) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        {comments.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-black text-[#616569]">
              {comments.length === 1 ? "1 comentario" : `${comments.length} comentarios`}
            </h2>
            <div className="flex flex-col gap-5">
              {comments.map((c) => (
                <div key={c.id} className="rounded-2xl bg-[#f8f8f6] p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff6b12]/15 text-sm font-bold text-[#ff6b12]">
                      {c.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#616569]">{c.nombre}</p>
                      <p className="text-xs text-[#616569]/50">
                        {new Date(c.creado_en).toLocaleDateString("es-EC", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#616569]/80">{c.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <h2 className="text-2xl font-black text-[#616569]">Deja un comentario</h2>
        <p className="mt-1 text-sm text-[#616569]/50">Tu comentario será revisado antes de publicarse.</p>
        <CommentForm slug={slug} />
      </div>
    </section>
  );
}