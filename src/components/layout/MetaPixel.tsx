"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { generateEventId, capiEvent } from "@/lib/meta";

export default function MetaPixel() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    // El primer PageView lo dispara el script de init en layout
    if (isFirst.current) { isFirst.current = false; return; }
    if (typeof window === "undefined" || !window.fbq) return;

    const eventId = generateEventId();
    window.fbq("track", "PageView", {}, { eventID: eventId });
    capiEvent({
      event_name: "PageView",
      event_id: eventId,
      event_source_url: window.location.href,
    });
  }, [pathname]);

  return null;
}
