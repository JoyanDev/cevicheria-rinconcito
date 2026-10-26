import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CategoryBanner({ category }) {
  const imagenes = category.imagenes;

  const [index, setIndex] = useState(0);

  // Si cambió la categoría desde el último render, reiniciamos el
  // índice del carrusel ahora mismo, durante el render (en vez de
  // con un useEffect), para evitar el render en cascada.
  const [categoriaPrevia, setCategoriaPrevia] = useState(category);

  if (categoriaPrevia !== category) {
    setCategoriaPrevia(category);
    setIndex(0);
  }

  // El auto-avance del carrusel sí es un efecto legítimo: arma un
  // temporizador externo y lo limpia cuando cambian las imágenes o
  // se desmonta el componente.
  useEffect(() => {
    if (imagenes.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [category, imagenes]);

  const anterior = () =>
    setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);

  const siguiente = () =>
    setIndex((prev) => (prev + 1) % imagenes.length);

  return (
    <div className="mx-auto mb-8 max-w-2xl">
      <div className="relative h-48 w-full overflow-hidden rounded-[28px] shadow-[0_16px_32px_-16px_rgba(15,23,42,0.35)] sm:h-60 lg:h-64">
        {imagenes.map((imagen, i) => (
          <img
            key={i}
            src={imagen}
            alt={category.nombre}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {imagenes.length > 1 && (
          <>
            <button
              onClick={anterior}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={siguiente}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur transition hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {imagenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir a la imagen ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {category.descripcion && (
        <p className="mt-4 text-center text-base text-gray-600">
          {category.descripcion}
        </p>
      )}
    </div>
  );
}

export default CategoryBanner;