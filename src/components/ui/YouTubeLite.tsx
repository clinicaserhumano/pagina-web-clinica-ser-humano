"use client";

import { useState } from "react";

/** Video de YouTube "ligero": muestra solo la miniatura (~20 KB) con un botón de play
 *  y carga el reproductor real (~500 KB de JS por video) recién al hacer clic. */
export default function YouTubeLite({ id, title = "Video Ser Humano" }: { id: string; title?: string }) {
  const [activo, setActivo] = useState(false);

  if (activo) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivo(true)}
      aria-label={`Reproducir video: ${title}`}
      className="group relative block h-full w-full overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#ff0000] shadow-lg transition-transform group-hover:scale-110">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
