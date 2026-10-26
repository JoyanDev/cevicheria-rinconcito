import { X } from "lucide-react";

function CartBar({
  cantidadTotal,
  precioTotal,
  onVerPedido,
  onVaciarCarrito,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">

      {/* Botón cancelar */}
      <button
        onClick={onVaciarCarrito}
        className="cursor-pointer absolute -top-5 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-gray-100"
        aria-label="Cancelar pedido"
        title="Cancelar pedido"
      >
        <X size={20} />
      </button>

      {/* Barra del carrito */}
      <div className="border-t border-cyan-800 bg-cyan-700 shadow-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">

          {/* Información */}
          <div className="text-white">
            <p className="text-sm font-medium">
              {cantidadTotal}{" "}
              {cantidadTotal === 1 ? "producto" : "productos"}
            </p>

            <p className="text-lg font-bold">
              S/ {precioTotal.toFixed(2)}
            </p>
          </div>

          {/* Ver pedido */}
          <button
            onClick={onVerPedido}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-cyan-700 transition hover:bg-gray-100 cursor-pointer"
          >
            Ver pedido
          </button>

        </div>
      </div>

    </div>
  );
}

export default CartBar;