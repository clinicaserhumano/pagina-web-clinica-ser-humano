import { NextRequest, NextResponse } from "next/server";
import { execute, query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json([], { status: 200 });

  try {
    const data = await query(
      "SELECT id, nombre, comentario, creado_en FROM comments WHERE slug = ? AND aprobado = 1 ORDER BY creado_en ASC",
      [slug],
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slug, nombre, comentario } = body;

  if (!slug || !nombre?.trim() || !comentario?.trim()) {
    return NextResponse.json({ error: "Campos incompletos." }, { status: 400 });
  }

  try {
    await execute("INSERT INTO comments (slug, nombre, comentario, aprobado) VALUES (?, ?, ?, 0)", [
      slug,
      nombre.trim(),
      comentario.trim(),
    ]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al guardar." }, { status: 500 });
  }
}
