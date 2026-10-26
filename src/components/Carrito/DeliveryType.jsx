import { Truck, Store } from "lucide-react";

function DeliveryType({
  tipoEntrega,
  setTipoEntrega,
}) {
  return (
    <div className="mt-8">

      <h3 className="mb-4 text-lg font-bold text-gray-900">
        ¿Cómo deseas recibir tu pedido?
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {/* Delivery */}
        <button
          onClick={() => setTipoEntrega("delivery")}
          className={`flex items-center justify-center gap-2 rounded-xl border p-4 font-semibold transition ${
            tipoEntrega === "delivery"
              ? "border-cyan-700 bg-cyan-50 text-cyan-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-cyan-300"
          }`}
        >
          <Truck size={20} />
          Delivery
        </button>

        {/* Presencial */}
        <button
          onClick={() => setTipoEntrega("presencial")}
          className={`flex items-center justify-center gap-2 rounded-xl border p-4 font-semibold transition ${
            tipoEntrega === "presencial"
              ? "border-cyan-700 bg-cyan-50 text-cyan-700"
              : "border-gray-200 bg-white text-gray-600 hover:border-cyan-300"
          }`}
        >
          <Store size={20} />
          Recojo Presencial
        </button>

      </div>
    </div>
  );
}

export default DeliveryType;