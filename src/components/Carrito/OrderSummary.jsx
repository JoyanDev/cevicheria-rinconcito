function OrderSummary({
  subtotal,
  total,
  tipoEntrega,
}) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-bold text-gray-900">
        Resumen del pedido
      </h3>

      <div className="space-y-3">

        {/* Subtotal */}
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>

          <span className="font-medium text-gray-900">
            S/ {subtotal.toFixed(2)}
          </span>
        </div>

        {/* Delivery */}
        <div className="flex items-center justify-between text-gray-600">
          <span>Delivery</span>

          <span className="font-medium text-gray-900">
            {tipoEntrega === "delivery"
              ? "Por confirmar"
              : "S/ 0.00"}
          </span>
        </div>

        {/* Mensaje */}
        {tipoEntrega === "delivery" && (
          <p className="text-sm text-gray-500">
            El costo se avisará por WhatsApp.
          </p>
        )}

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">

          <div className="flex items-center justify-between">

            <span className="text-lg font-bold text-gray-900">
              Total
            </span>

            <span className="text-xl font-bold text-cyan-700">
              S/ {total.toFixed(2)}
            </span>

          </div>

          {tipoEntrega === "delivery" && (
            <p className="mt-2 text-right text-xs text-gray-400">
              El total final se confirmará con el costo de delivery.
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default OrderSummary;