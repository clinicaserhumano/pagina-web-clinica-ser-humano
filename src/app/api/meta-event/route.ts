import { NextRequest, NextResponse } from "next/server";

const PIXEL_ID = "1630284591859479";

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return NextResponse.json({ ok: false });

  const { event_name, event_id, event_source_url } = await req.json();

  const payload = {
    data: [
      {
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: "website",
      },
    ],
  };

  await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  return NextResponse.json({ ok: true });
}
