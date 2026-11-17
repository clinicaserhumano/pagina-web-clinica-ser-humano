"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VIDEO_SLIDES } from "@/lib/constants";

const TOTAL = VIDEO_SLIDES.length;

export default function VideoCarousel() {
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > slide || (slide === TOTAL - 1 && next === 0) ? 1 : -1);
    setSlide(next);
  };

  const prev = () => go(slide === 0 ? TOTAL - 1 : slide - 1);
  const next = () => go((slide + 1) % TOTAL);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0 }),
  };

  return (
    <div className="relative">
      {/* Videos */}
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={slide}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {VIDEO_SLIDES[slide].map((id) => (
              <div key={id} className="aspect-video w-full overflow-hidden rounded-xl bg-brand-gray-dark/10">
                {id.startsWith("VIDEO_ID") ? (
                  <div className="flex h-full w-full items-center justify-center text-sm text-brand-gray-dark/40">
                    Video pendiente
                  </div>
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
                    title="Video Ser Humano"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles (solo si hay más de un grupo de videos) */}
      {TOTAL > 1 && (
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={prev}
          aria-label="Anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-orange text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {VIDEO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Ir al grupo ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slide
                  ? "w-6 bg-brand-orange"
                  : "w-2 bg-brand-gray-light"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Siguiente"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-orange text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      )}
    </div>
  );
}
