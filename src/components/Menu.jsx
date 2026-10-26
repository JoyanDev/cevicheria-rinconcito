import { useState } from "react";
import { Search, X, SearchX } from "lucide-react";

import { products } from "../data/products";
import { categories } from "../data/categorias";

import ProductGrid from "./ProductGrid";
import CategoryBanner from "./CategoryBanner";

function Menu({ cart, onAgregar, onQuitar }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Combos");

  const [busqueda, setBusqueda] = useState("");

  // Respaldo: si la categoría seleccionada cambió desde el último
  // render, limpiamos la búsqueda ahora mismo, durante el render
  // (aunque el handler del botón ya lo haga, esto evita que quede
  // texto residual por cualquier otro motivo). Se hace así, en vez
  // de con un useEffect, para no disparar un render en cascada.
  const [categoriaPrevia, setCategoriaPrevia] = useState(
    categoriaSeleccionada
  );

  if (categoriaPrevia !== categoriaSeleccionada) {
    setCategoriaPrevia(categoriaSeleccionada);
    setBusqueda("");
  }

  const seleccionarCategoria = (nombreCategoria) => {
    setBusqueda("");
    setCategoriaSeleccionada(nombreCategoria);
  };

  const categoriaActual = categories.find(
    (category) =>
      category.nombre === categoriaSeleccionada
  );

  const productosFiltrados = products.filter((product) => {
    const textoBusqueda = busqueda.toLowerCase().trim();

    // Si hay una búsqueda, buscar en todos los productos
    if (textoBusqueda) {
      return (
        product.nombre.toLowerCase().includes(textoBusqueda) ||
        product.descripcion.toLowerCase().includes(textoBusqueda)
      );
    }

    // Si no hay búsqueda, mostrar solamente la categoría seleccionada
    return product.categoria === categoriaSeleccionada;
  });

  return (
    <section
      id="carta"
      className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Encabezado */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
            Nuestra carta
          </p>

          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Sabores del mar
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Disfruta nuestros platos preparados con
            ingredientes frescos y el auténtico sabor peruano.
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative mx-auto max-w-xl">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
              placeholder="Buscar un plato..."
              autoComplete="off"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-12 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />

            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400 transition hover:text-gray-700"
                aria-label="Limpiar búsqueda"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Categorías */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.nombre}
              onClick={() => seleccionarCategoria(category.nombre)}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition sm:px-5 sm:py-2.5 sm:text-sm ${!busqueda &&
                  categoriaSeleccionada === category.nombre
                  ? "bg-cyan-700 text-white"
                  : "bg-white text-gray-600 hover:bg-cyan-50 hover:text-cyan-700"
                }`}
            >
              {category.nombre}
            </button>
          ))}
        </div>

        {/* Banner de la categoría */}
        {!busqueda.trim() && categoriaActual && (
          <CategoryBanner
            category={categoriaActual}
          />
        )}

        {/* Productos */}
        {productosFiltrados.length > 0 ? (
          <ProductGrid
            products={productosFiltrados}
            cart={cart}
            onAgregar={onAgregar}
            onQuitar={onQuitar}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <SearchX size={32} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-800">
              No encontramos resultados
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              No encontramos platos que coincidan con tu
              búsqueda. Intenta con otro nombre o revisa
              las categorías.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;