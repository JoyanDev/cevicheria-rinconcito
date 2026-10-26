import { Minus, Plus, ClipboardList } from "lucide-react";

function ProductCard({ product, cart, onAgregar, onQuitar }) {

  //Obtener las unidades de este producto que ya están en el carrito
  //(para combos armables puede haber varias selecciones distintas)
  const itemsEnCarrito = cart.filter(
    (item) =>
      item.id === product.id &&
      item.categoria === product.categoria
  );

  const cantidadTotal = itemsEnCarrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  // Producto simple: solo puede haber una entrada en el carrito
  const cantidad = itemsEnCarrito[0]?.cantidad || 0;

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-cyan-100 hover:shadow-[0_12px_24px_-8px_rgba(15,23,42,0.18)]">
      {/* Información del producto */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900">
          {product.nombre}
        </h3>

        <span className="whitespace-nowrap rounded-full bg-cyan-50 px-3 py-1 text-sm font-bold text-cyan-700">
          S/ {product.precio.toFixed(2)}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {product.descripcion}
      </p>

      {/* Controles del carrito */}
      {product.requiereSeleccion ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => onAgregar(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cyan-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-800"
          >
            <ClipboardList size={18} />
            Elegir mis platos
          </button>

          {cantidadTotal > 0 && (
            <span className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-2 text-sm font-bold text-gray-700">
              {cantidadTotal} en tu pedido
            </span>
          )}
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            onClick={() => onQuitar(product)}
            disabled={cantidad === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Quitar ${product.nombre}`}
          >
            <Minus size={18} />
          </button>

          <span className="min-w-8 text-center text-lg font-bold text-gray-900">
            {cantidad}
          </span>

          <button
            onClick={() => onAgregar(product)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-700 text-white transition hover:bg-cyan-800"
            aria-label={`Agregar ${product.nombre}`}
          >
            <Plus size={20} />
          </button>
        </div>
      )}
    </article>
  );
}

export default ProductCard;
