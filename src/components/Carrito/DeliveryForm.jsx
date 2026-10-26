function DeliveryForm({
  direccion,
  setDireccion,
  whatsapp,
  setWhatsapp,
  comentario,
  setComentario,
  errores,
  setErrores,
}) {
  return (
    <div className="mt-6 space-y-5">

      {/* Dirección */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Dirección de entrega
        </label>

        <input
          type="text"
          value={direccion}
          onChange={(e) => {
            setDireccion(e.target.value);

            if (errores.direccion) {
              setErrores((prev) => ({
                ...prev,
                direccion: undefined,
              }));
            }
          }}
          placeholder="Ej: Av. Los Pinos 123, Urb. Las Flores"
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
            errores.direccion
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-cyan-700 focus:ring-cyan-100"
          }`}
        />

        {errores.direccion && (
          <p className="mt-2 text-sm text-red-500">
            {errores.direccion}
          </p>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Tu número de WhatsApp
        </label>

        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => {
            const valor = e.target.value.replace(/\D/g, "");

            setWhatsapp(valor);

            if (errores.whatsapp) {
              setErrores((prev) => ({
                ...prev,
                whatsapp: undefined,
              }));
            }
          }}
          placeholder="Ej: 987654321"
          maxLength={9}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 ${
            errores.whatsapp
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-cyan-700 focus:ring-cyan-100"
          }`}
        />

        {errores.whatsapp && (
          <p className="mt-2 text-sm text-red-500">
            {errores.whatsapp}
          </p>
        )}
      </div>

      {/* Comentario adicional */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Comentario adicional
          <span className="ml-1 font-normal text-gray-400">
            (opcional)
          </span>
        </label>

        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Ej: Quiero una gaseosa helada, las salsas aparte por favor."
          rows={3}
          maxLength={300}
          className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
        />

        <p className="mt-1 text-right text-xs text-gray-400">
          {comentario.length}/300
        </p>
      </div>

    </div>
  );
}

export default DeliveryForm;