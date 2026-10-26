import { Minus, Plus, Trash2, Pencil } from "lucide-react";

function CartItem({
  product,
  onAgregar,
  onQuitar,
  onEliminar,
  onEditarSeleccion,
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Nombre + eliminar */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-5 text-gray-900 sm:text-lg">
            {product.nombre}
          </h3>

          {product.seleccion && product.seleccion.length > 0 && (
            <ul className="mt-1.5 space-y-0.5 text-xs text-gray-500">
              {product.seleccion.map((plato) => (
                <li key={plato}>• {plato}</li>
              ))}
            </ul>
          )}

          {product.requiereSeleccion && (
            <button
              onClick={() => onEditarSeleccion(product)}
              className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 transition hover:text-cyan-800"
            >
              <Pencil size={12} />
              Editar platos
            </button>
          )}

          <p className="mt-1 text-sm text-cyan-700">
            S/ {product.precio.toFixed(2)} c/u
          </p>
        </div>

        <button
          onClick={() => onEliminar(product)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          aria-label={`Eliminar ${product.nombre}`}
          title="Eliminar producto"
        >
          <Trash2 size={17} />
        </button>
      </div>

      {/* Controles */}
      <div className="mt-4 flex items-center justify-between">
        
        {/* Cantidad */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onQuitar(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-100"
            aria-label={`Quitar ${product.nombre}`}
          >
            <Minus size={16} />
          </button>

          <span className="min-w-5 text-center font-bold text-gray-900">
            {product.cantidad}
          </span>

          <button
            onClick={() => onAgregar(product)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-700 text-white transition hover:bg-cyan-800"
            aria-label={`Agregar ${product.nombre}`}
          >
            <Plus size={17} />
          </button>
        </div>

        {/* Total */}
        <span className="text-base font-bold text-cyan-700">
          S/ {(product.precio * product.cantidad).toFixed(2)}
        </span>
      </div>
    </article>
  );
}

export default CartItem;
