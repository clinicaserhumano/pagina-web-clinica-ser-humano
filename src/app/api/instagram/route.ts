import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const token  = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) return NextResponse.json([]);

  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      // Se registra en los logs del servidor (Vercel) para detectar tokens vencidos o invalidados
      const err = await res.json().catch(() => null);
      console.error("[instagram] Error de la API:", res.status, err?.error?.message ?? err);
      return NextResponse.json([]);
    }
    const data = await res.json();
    return NextResponse.json(data.data ?? []);
  } catch (e) {
    console.error("[instagram] Fallo de red:", e);
    return NextResponse.json([]);
  }
}