import fondoHero from '../assets/fondoHero.jpg'
function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gray-900"
    >

      {/* Imagen de fondo */}
      <img
        src={fondoHero}
        alt="Fondo con logo Cevicheria Rinconcito"
        className="absolute inset-0 h-full w-full object-cover object-[45%_center] md:object-[10%_center]"
      />

      {/* Capa oscura sobre la imagen */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          Sabor peruano
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          El Rinconcito
        </h1>

        <p className="mt-4 text-lg text-gray-200 sm:text-xl">
          Ceviches y sabores del mar preparados para disfrutar.
        </p>

        <a
          href="#carta"
          className="mt-8 inline-block rounded-full bg-cyan-600 px-7 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          Ver nuestra carta
        </a>

      </div>
    </section>
  );
}

export default Hero;