import { useState } from "react";
import { deliverySchema, presencialSchema } from "../../schema/deliverySchema";
import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import DeliveryType from "./DeliveryType";
import PresencialForm from "./PresencialForm";
import DeliveryForm from "./DeliveryForm";
import OrderSummary from "./OrderSummary";
import WhatsAppButton from "./WhatsAppButton";
import OrderConfirmation from "./OrderConfirmation";

function Cart({
  cart,
  onCerrar,
  onAgregar,
  onQuitar,
  onEliminar,
  onVaciarCarrito,
  onEditarSeleccion,
}) {
  const [tipoEntrega, setTipoEntrega] = useState("presencial");
  const [direccion, setDireccion] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [nombreRecojo, setNombreRecojo] = useState("");
  const [horaRecojo, setHoraRecojo] = useState("");
  const [errores, setErrores] = useState({});

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [comentario, setComentario] = useState("");

  const subtotal = cart.reduce(
    (total, product) =>
      total + product.precio * product.cantidad,
    0
  );

  const costoDelivery =
    tipoEntrega === "delivery" ? null : 0;

  const total = subtotal + (costoDelivery || 0);

  // ==========================================
  // VALIDAR DELIVERY
  // ==========================================

  const validarDelivery = () => {
    const resultado = deliverySchema.safeParse({
      direccion,
      whatsapp,
    });

    if (!resultado.success) {
      const nuevosErrores = {};

      resultado.error.issues.forEach((error) => {
        const campo = error.path[0];
        nuevosErrores[campo] = error.message;
      });

      setErrores(nuevosErrores);

      return false;
    }

    setErrores({});

    return true;
  };

  //Validar recojo presencial 
  const validarPresencial = () => {
    const resultado = presencialSchema.safeParse({
      nombreRecojo,
      horaRecojo,
      whatsapp,
    });

    if (!resultado.success) {
      const nuevosErrores = {};

      resultado.error.issues.forEach((error) => {
        const campo = error.path[0];
        nuevosErrores[campo] = error.message;
      });

      setErrores(nuevosErrores);

      return false;
    }

    setErrores({});

    return true;
  };

  // ==========================================
  // REALIZAR PEDIDO
  // ==========================================

  const realizarPedido = () => {
    // Validar datos si es delivery o presencial
    if (tipoEntrega === "delivery") {
      const esValido = validarDelivery();

      if (!esValido) {
        return;
      }
    }

    if (tipoEntrega === "presencial") {
      const esValido = validarPresencial();

      if (!esValido) {
        return;
      }
    }

    // Crear lista de productos
    const productosTexto = cart
      .map((product) => {
        const detalleSeleccion =
          product.seleccion && product.seleccion.length > 0
            ? `\n  Incluye: ${product.seleccion.join(", ")}`
            : "";

        return `• ${product.nombre}${detalleSeleccion}
  Cantidad: ${product.cantidad}
  Total: S/ ${(product.precio * product.cantidad).toFixed(2)}`;
      })
      .join("\n\n");

    // Emojis como escapes Unicode (\u{...}) en vez de literales:
    // así el mensaje no se corrompe aunque el archivo, el build o el
    // servidor no estén manejando bien el UTF-8.
    const EMOJI = {
      saludo: "\u{1F44B}", // 👋
      carrito: "\u{1F6D2}", // 🛒
      dinero: "\u{1F4B0}", // 💰
      comentario: "\u{1F4AC}", // 💬
      gracias: "\u{1F64F}", // 🙏
    };
    const LINEA = "\u2500".repeat(18); // ────────────────── (separador)

    // Mensaje inicial
    let mensaje = `¡Hola! ${EMOJI.saludo} Quiero realizar el siguiente pedido:\n\n`;
    mensaje += `*MI PEDIDO* ${EMOJI.carrito}\n\n`;
    mensaje += `${productosTexto}\n\n`;
    mensaje += `*Subtotal: S/ ${subtotal.toFixed(2)}* ${EMOJI.dinero}\n\n`;
    mensaje += `${LINEA}\n\n`;

    // Información de entrega
    if (tipoEntrega === "delivery") {
      mensaje += `*Tipo de entrega:* Delivery\n`;
      mensaje += `*Dirección:* ${direccion}\n`;
      mensaje += `*WhatsApp:* ${whatsapp}\n\n`;
      mensaje += `_El costo de delivery queda por confirmar._\n\n`;
    } else {
      mensaje += `*Tipo de entrega:* Presencial\n`;
      mensaje += `*Persona que recoge:* ${nombreRecojo}\n`;
      mensaje += `*Hora aproximada de recojo:* ${horaRecojo}\n`;
      mensaje += `*WhatsApp:* ${whatsapp}\n\n`;
    }

    // Mensaje final
    if (comentario.trim()) {
      mensaje += `*Comentario adicional* ${EMOJI.comentario}\n${comentario.trim()}\n\n`;
    }

    mensaje += `¡Gracias! ${EMOJI.gracias}`;

    // ==========================================
    // NÚMERO DEL NEGOCIO
    // ==========================================

    const numeroNegocio = "51934757283";

    // Crear URL
    const url = `https://wa.me/${numeroNegocio}?text=${encodeURIComponent(
      mensaje
    )}`;

    // Abrir WhatsApp
    window.open(url, "_blank");

    // Mostrar confirmación
    setMostrarConfirmacion(true);
  };

  // ==========================================
  // CONFIRMAR PEDIDO ENVIADO
  // ==========================================

  const confirmarPedidoEnviado = () => {
    // Vaciar carrito
    onVaciarCarrito();

    // Limpiar formulario
    setDireccion("");
    setWhatsapp("");
    setNombreRecojo("");
    setHoraRecojo("");

    // Volver a presencial
    setTipoEntrega("presencial");

    // Limpiar errores
    setErrores({});

    // Ocultar confirmación
    setMostrarConfirmacion(false);

    // Cerrar carrito
    onCerrar();
  };

  // ==========================================
  // CANCELAR CONFIRMACIÓN
  // ==========================================

  const cancelarConfirmacion = () => {
    setMostrarConfirmacion(false);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-gray-50">

      {/* Encabezado */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-5 py-5">

          <button
            onClick={onCerrar}
            className="text-2xl text-gray-700 transition hover:text-cyan-700"
            aria-label="Cerrar pedido"
          >
            ←
          </button>

          <h2 className="text-3xl font-bold text-gray-900">
            Tu pedido
          </h2>

        </div>
      </div>

      {/* Contenido */}
      <div className="mx-auto max-w-4xl px-5 py-8">
        {cart.length === 0 ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-50 text-4xl">
              <ShoppingCart size={70} />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Tu carrito está vacío
            </h3>

            <p className="mt-2 max-w-md text-gray-500">
              Aún no has agregado productos a tu pedido.
              Escoge algo delicioso de nuestro menú.
            </p>

            <button
              onClick={onCerrar}
              className="mt-6 rounded-xl bg-cyan-700 px-6 py-3 font-bold text-white transition hover:bg-cyan-800"
            >
              Escoger productos
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((product) => (
                <CartItem
                  key={`${product.categoria}-${product.id}-${product.selectionKey || ""}`}
                  product={product}
                  onAgregar={onAgregar}
                  onQuitar={onQuitar}
                  onEliminar={onEliminar}
                  onEditarSeleccion={onEditarSeleccion}
                />
              ))}
            </div>

            <DeliveryType
              tipoEntrega={tipoEntrega}
              setTipoEntrega={setTipoEntrega}
            />

            {tipoEntrega === "delivery" && (
              <DeliveryForm
                direccion={direccion}
                setDireccion={setDireccion}
                whatsapp={whatsapp}
                setWhatsapp={setWhatsapp}
                errores={errores}
                setErrores={setErrores}
                comentario={comentario}
                setComentario={setComentario}
              />
            )}

            {tipoEntrega === "presencial" && (
              <PresencialForm
                nombreRecojo={nombreRecojo}
                setNombreRecojo={setNombreRecojo}
                horaRecojo={horaRecojo}
                comentario={comentario}
                setHoraRecojo={setHoraRecojo}
                whatsapp={whatsapp}
                setWhatsapp={setWhatsapp}
                errores={errores}
                setErrores={setErrores}
                setComentario={setComentario}
              />
            )}

            <OrderSummary
              subtotal={subtotal}
              total={total}
              tipoEntrega={tipoEntrega}
            />

            <WhatsAppButton onClick={realizarPedido} />
          </>
        )}
      </div>

      {/* Confirmación */}
      {mostrarConfirmacion && (
        <OrderConfirmation
          onConfirmar={confirmarPedidoEnviado}
          onCancelar={cancelarConfirmacion}
        />
      )}

    </div>
  );
}

export default Cart;