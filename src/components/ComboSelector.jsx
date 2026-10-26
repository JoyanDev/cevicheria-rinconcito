import { useState } from "react";
import { X } from "lucide-react";
import { gruposCombo } from "../data/comboOpciones";

// Si el combo ya trae una selección previa (lo estamos editando desde el
// carrito), reconstruimos el mapa { grupoKey: opcionElegida } a partir de
// los nombres de los platos, buscando a qué grupo pertenece cada uno.
const construirSeleccionInicial = (platosElegidos) => {
  if (!platosElegidos || platosElegidos.length === 0) return {};

  const inicial = {};

  platosElegidos.forEach((plato) => {
    const grupo = gruposCombo.find((g) => g.opciones.includes(plato));
    if (grupo) inicial[grupo.key] = plato;
  });

  return inicial;
};

function ComboSelector({ combo, esEdicion = false, onConfirmar, onCerrar }) {
  const [seleccion, setSeleccion] = useState(() =>
    construirSeleccionInicial(combo.seleccion)
  );

  const totalElegidos = Object.values(seleccion).filter(Boolean).length;
  const esValido = totalElegidos === combo.cantidadPlatos;

  const elegirOpcion = (grupoKey, opcion) => {
    setSeleccion((prev) => ({
      ...prev,
      [grupoKey]: prev[grupoKey] === opcion ? undefined : opcion,
    }));
  };

  const confirmar = () => {
    if (!esValido) return;

    const platosElegidos = gruposCombo
      .map((grupo) => seleccion[grupo.key])
      .filter(Boolean);

    onConfirmar({
      ...combo,
      seleccion: platosElegidos,
      selectionKey: platosElegidos.join(" + "),
    });
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 px-0 sm:items-center sm:px-5"
      onClick={onCerrar}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="mb-1 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {esEdicion ? `Editar ${combo.nombre}` : combo.nombre}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {combo.cantidadPlatos === gruposCombo.length
                ? "Elige un plato de cada grupo."
                : `Elige ${combo.cantidadPlatos} platos (de los ${gruposCombo.length} grupos).`}
            </p>

            {esEdicion && combo.cantidad > 1 && (
              <p className="mt-1 text-xs font-medium text-amber-600">
                Tienes {combo.cantidad} unidades de este combo — este
                cambio solo aplicará a 1 de ellas.
              </p>
            )}
          </div>

          <button
            onClick={onCerrar}
            className="shrink-0 text-gray-400 transition hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-5 text-sm font-semibold text-cyan-700">
          {totalElegidos}/{combo.cantidadPlatos} elegidos
        </p>

        {/* Grupos de opciones */}
        <div className="space-y-6">
          {gruposCombo.map((grupo) => (
            <div key={grupo.key}>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-gray-700">
                {grupo.nombre}
              </h4>

              <div className="flex flex-col gap-2">
                {grupo.opciones.map((opcion) => {
                  const elegido = seleccion[grupo.key] === opcion;

                  return (
                    <button
                      key={opcion}
                      type="button"
                      onClick={() => elegirOpcion(grupo.key, opcion)}
                      aria-pressed={elegido}
                      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                        elegido
                          ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                          : "border-gray-200 text-gray-700 hover:border-cyan-200 hover:bg-cyan-50/40"
                      }`}
                    >
                      {opcion}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Confirmar */}
        <button
          onClick={confirmar}
          disabled={!esValido}
          className="mt-6 w-full rounded-xl bg-cyan-700 px-5 py-4 font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {esEdicion
            ? "Guardar cambios"
            : `Agregar al pedido — S/ ${combo.precio.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}

export default ComboSelector;
