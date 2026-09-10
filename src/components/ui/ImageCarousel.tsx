"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

type CarouselImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export default function ImageCarousel({
  images,
  height,
  aspectSquare = false,
  intervalMs = 8000,
  bgClassName = "bg-black/20",
}: {
  images: CarouselImage[];
  height?: number;
  aspectSquare?: boolean;
  intervalMs?: number;
  bgClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  // Auto-avance, pausado mientras el lightbox está abierto
  useEffect(() => {
    if (open) return;
    const t = setInterval(next, intervalMs);
    return () => clearInterval(t);
  }, [next, intervalMs, open]);

  // Cerrar con Escape y bloquear scroll de fondo mientras el lightbox está abierto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const current = images[index];

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-2xl ${bgClassName} ${aspectSquare ? "aspect-square" : ""}`}
        style={aspectSquare ? undefined : { height: height ?? 320 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => setOpen(true)}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              style={{ objectPosition: current.objectPosition ?? "center" }}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Foto anterior"
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Siguiente foto"
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-[80vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.src} alt={current.alt} fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
