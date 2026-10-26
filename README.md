El Rinconcito – Carta Digital y Pedidos por WhatsApp

Aplicación web para el restaurante El Rinconcito (comida marina y criolla peruana). Muestra la carta por categorías, permite armar combos personalizados (Duo/Trio Marino), gestionar un carrito de compras y enviar el pedido final por WhatsApp.

Stack tecnológico
React (Vite) — componentes funcionales con Hooks
Tailwind CSS — estilos utilitarios
Zod — validación de formularios (dirección/WhatsApp de delivery, datos de recojo presencial)
lucide-react — íconos de interfaz
react-icons (react-icons/fa) — íconos de redes sociales en el footer
Estructura del proyecto
src/
├── assets/                  # Imágenes (logo, fondos, fotos de categorías)
├── data/                    # "Base de datos" estática de la carta
│   ├── categorias.js        # Categorías del menú (nombre, descripción, imágenes del banner)
│   ├── combos.js            # Duo Marino / Trio Marino (combos armables)
│   ├── comboOpciones.js     # Grupos y opciones para armar los combos
│   ├── entradas.js
│   ├── ceviches.js
│   ├── arroces.js
│   ├── platosCriollos.js
│   ├── chicharrones.js      # Incluye chicharrones y jaleas
│   └── products.js          # Junta todos los arrays de productos en uno solo
├── components/
│   ├── Header.jsx / Footer.jsx / Hero.jsx
│   ├── Menu.jsx              # Buscador + filtro de categorías + grid de productos
│   ├── CategoryBanner.jsx    # Carrusel de imágenes por categoría
│   ├── ProductGrid.jsx / ProductCard.jsx
│   ├── ComboSelector.jsx     # Modal para armar/editar un Duo o Trio
│   ├── CartBar.jsx           # Barra flotante con el resumen del carrito
│   └── Carrito/
│       ├── Cart.jsx              # Vista completa del carrito y checkout
│       ├── CartItem.jsx          # Fila de producto en el carrito (con opción de editar combos)
│       ├── DeliveryType.jsx      # Delivery vs. Recojo presencial
│       ├── DeliveryForm.jsx / PresencialForm.jsx
│       ├── OrderSummary.jsx      # Subtotal / total
│       ├── WhatsAppButton.jsx
│       └── OrderConfirmation.jsx # Modal de confirmación tras abrir WhatsApp
├── schema/
│   └── deliverySchema.js    # Esquemas Zod (delivery y presencial)
├── App.jsx                  # Estado global del carrito y orquestación de modales
└── main.jsx

Funcionalidades principales
Carta por categorías con banner de imágenes rotativo y buscador que filtra en toda la carta.
Combos armables (Duo/Trio Marino): el cliente elige un plato por grupo (frío, achicharrado, caliente); se puede volver a editar la selección desde el carrito sin perder el resto de unidades del pedido (si tienes 2 unidades iguales, editar solo cambia 1).
Carrito: sumar/restar cantidad, eliminar producto, vaciar todo el pedido.
Checkout: elegir Delivery (con validación de dirección y WhatsApp) o Recojo presencial (nombre y hora aproximada), con mensajes de error en línea.
Pedido por WhatsApp: arma un mensaje de texto con el detalle del pedido, subtotal, datos de entrega y comentario, y abre wa.me con el mensaje precargado.

Cómo correrlo localmente:
pnpm install
pnpm dev

Luego abre la URL que te muestre Vite (por defecto http://localhost:5173).