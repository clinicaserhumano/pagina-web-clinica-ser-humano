declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = "1630284591859479";

export function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function fbqEvent(
  eventName: string,
  params?: Record<string, unknown>,
  eventId?: string,
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params ?? {}, eventId ? { eventID: eventId } : undefined);
}

export async function capiEvent(payload: {
  event_name: string;
  event_id: string;
  event_source_url?: string;
}) {
  try {
    await fetch("/api/meta-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // CAPI es secundario; el pixel del browser es el canal principal
  }
}
