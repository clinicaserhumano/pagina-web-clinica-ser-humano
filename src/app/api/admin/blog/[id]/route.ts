import { NextRequest, NextResponse } from "next/server";
import { revalidarBlog } from "@/lib/revalidate-blog";
import { DUPLICATE_KEY, execute } from "@/lib/db";

/** Columnas que se pueden editar desde el panel (lista blanca: nunca se usan
 *  nombres de columna que vengan sin filtrar del cliente). */
const EDITABLES = ["titulo", "slug", "extracto", "contenido", "autor", "categoria", "etiquetas", "imagen_url", "publicado"] as const;

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = (await req.json()) as Record<string, unknown>;

  const sets: string[] = [];
  const values: unknown[] = [];
  for (const col of EDITABLES) {
    if (!(col in body)) continue;
    let v = body[col];
    if (col === "etiquetas") v = Array.isArray(v) ? JSON.stringify(v) : null;
    if (col === "publicado") v = Boolean(v);
    sets.push(`${col} = ?`);
    values.push(v ?? null);
  }
  if (sets.length === 0) return NextResponse.json({ ok: true });

  try {
    await execute(`UPDATE entradas_blog SET ${sets.join(", ")}, actualizado_en = UTC_TIMESTAMP() WHERE id = ?`, [...values, id]);
    revalidarBlog();
    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e as { code?: string; message: string };
    const msg = err.code === DUPLICATE_KEY ? "Ya existe un artículo con ese slug." : err.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  try {
    await execute("DELETE FROM entradas_blog WHERE id = ?", [id]);
    revalidarBlog();
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
