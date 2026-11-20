/** Pantalla de carga instantánea al entrar a Novedades (mientras llega la página) */
export default function NovedadesLoading() {
  return (
    <>
      <section className="relative flex min-h-[280px] items-center justify-center bg-[#616569]">
        <div className="text-center">
          <h1 className="text-5xl font-black text-white">Novedades</h1>
          <p className="mt-3 text-white/70">Artículos sobre salud, neurociencia y bienestar</p>
        </div>
      </section>
      <section className="bg-brand-base py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-[#616569]/15" />
          ))}
        </div>
      </section>
    </>
  );
}
