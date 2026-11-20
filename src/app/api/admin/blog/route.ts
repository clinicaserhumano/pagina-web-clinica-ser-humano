import { NextRequest, NextResponse } from "next/server";
import { DUPLICATE_KEY, execute, query } from "@/lib/db";

export async function GET() {
  try {
    const data = await query("SELECT * FROM entradas_blog ORDER BY creado_en DESC");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { titulo, slug, extracto, contenido, autor, categoria, etiquetas, imagen_url, publicado } = body;

  if (!titulo?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: "Título y slug son obligatorios." }, { status: 400 });
  }

  try {
    const { insertId } = await execute(
      `INSERT INTO entradas_blog (titulo, slug, extracto, contenido, autor, categoria, etiquetas, imagen_url, publicado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        slug,
        extracto ?? null,
        contenido ?? null,
        autor ?? null,
        categoria ?? null,
        Array.isArray(etiquetas) ? JSON.stringify(etiquetas) : null,
        imagen_url ?? null,
        Boolean(publicado),
      ],
    );
    return NextResponse.json({ ok: true, id: insertId }, { status: 201 });
  } catch (e) {
    const err = e as { code?: string; message: string };
    const msg = err.code === DUPLICATE_KEY ? "Ya existe un artículo con ese slug." : err.message;
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
