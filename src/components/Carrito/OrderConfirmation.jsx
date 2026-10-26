function OrderConfirmation({
  onConfirmar,
  onCancelar,
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-5">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h3 className="text-xl font-bold text-gray-900">
          ¿Ya enviaste tu pedido?
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Hemos abierto WhatsApp con los datos de tu pedido.
          Confirma solamente si ya presionaste el botón
          <strong> Enviar </strong>
          en WhatsApp.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={onCancelar}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Todavía no
          </button>

          <button
            onClick={onConfirmar}
            className="flex-1 rounded-xl bg-cyan-700 px-4 py-3 font-semibold text-white transition hover:bg-cyan-800"
          >
            Sí, ya lo envié
          </button>

        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;