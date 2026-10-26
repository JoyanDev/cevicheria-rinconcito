import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import CartBar from "./components/CartBar";
import Cart from "./components/Carrito/Cart";
import ComboSelector from "./components/ComboSelector";
import Footer from "./components/Footer";

// Dos items del carrito son "el mismo producto" si coinciden id + categoria
// y, cuando aplica (combos armables), la misma selección de platos.
const mismoProducto = (item, product) =>
  item.id === product.id &&
  item.categoria === product.categoria &&
  (item.selectionKey || null) === (product.selectionKey || null);

function App() {
  const [cart, setCart] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [comboActivo, setComboActivo] = useState(null);
  // Cuando no es null, el ComboSelector está editando este ítem
  // (ya existente en el carrito) en vez de agregar uno nuevo.
  const [comboEditando, setComboEditando] = useState(null);

  // Agregar una unidad
  const agregarAlCarrito = (product) => {
    setCart((carritoActual) => {
      const productoExiste = carritoActual.find((item) =>
        mismoProducto(item, product)
      );

      if (productoExiste) {
        return carritoActual.map((item) =>
          mismoProducto(item, product)
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...product,
          cantidad: 1,
        },
      ];
    });
  };

  // Desde el menú: si el producto requiere armar una selección
  // (Duo/Trio Marino), abrimos el selector en vez de agregar directo.
  const agregarDesdeMenu = (product) => {
    if (product.requiereSeleccion) {
      setComboActivo(product);
      return;
    }

    agregarAlCarrito(product);
  };

  // Desde el carrito: reabrir el selector para cambiar los platos
  // de un Duo/Trio que ya fue agregado.
  const editarSeleccionDelCarrito = (item) => {
    setComboEditando(item);
    setComboActivo(item);
  };

  // Confirmar selección del combo: si veníamos editando un ítem del
  // carrito, lo actualizamos (o lo fusionamos con otro igual); si no,
  // es un combo nuevo y se agrega normalmente.
  const confirmarComboSeleccionado = (productoConSeleccion) => {
    if (comboEditando) {
      actualizarSeleccionEnCarrito(comboEditando, productoConSeleccion);
    } else {
      agregarAlCarrito(productoConSeleccion);
    }

    setComboActivo(null);
    setComboEditando(null);
  };

  const cerrarComboSelector = () => {
    setComboActivo(null);
    setComboEditando(null);
  };

  // Actualiza la selección de UNA sola unidad del ítem editado, sin
  // tocar las demás. Si no había ningún cambio real (elegiste los
  // mismos platos de nuevo), no hace nada. Si el ítem tenía más de
  // una unidad, se le resta 1 al original (las demás quedan igual) y
  // esa unidad pasa a la nueva selección; si ya existía otra fila con
  // esa misma selección, se fusionan las cantidades en vez de dejar
  // dos filas iguales.
  const actualizarSeleccionEnCarrito = (itemOriginal, productoConSeleccion) => {
    setCart((carritoActual) => {
      if (itemOriginal.selectionKey === productoConSeleccion.selectionKey) {
        return carritoActual;
      }

      const carritoSinUnaUnidad =
        itemOriginal.cantidad > 1
          ? carritoActual.map((item) =>
              item === itemOriginal
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            )
          : carritoActual.filter((item) => item !== itemOriginal);

      const otroConMismaSeleccion = carritoSinUnaUnidad.find(
        (item) =>
          item !== itemOriginal && mismoProducto(item, productoConSeleccion)
      );

      if (otroConMismaSeleccion) {
        return carritoSinUnaUnidad.map((item) =>
          item === otroConMismaSeleccion
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...carritoSinUnaUnidad,
        { ...productoConSeleccion, cantidad: 1 },
      ];
    });
  };

  // Quitar una unidad
  const quitarDelCarrito = (product) => {
    setCart((carritoActual) => {
      return carritoActual
        .map((item) =>
          mismoProducto(item, product)
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0);
    });
  };

  // Eliminar todo un producto del carrito
  const eliminarDelCarrito = (product) => {
    setCart((carritoActual) =>
      carritoActual.filter((item) => !mismoProducto(item, product))
    );
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCart([]);
    setCarritoAbierto(false);
  };

  const cantidadTotal = cart.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const precioTotal = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <div>
      <Header />

      <Hero />

      <Menu
        cart={cart}
        onAgregar={agregarDesdeMenu}
        onQuitar={quitarDelCarrito}
      />

      {cart.length > 0 && (
        <CartBar
          cantidadTotal={cantidadTotal}
          precioTotal={precioTotal}
          onVerPedido={() => setCarritoAbierto(true)}
          onVaciarCarrito={vaciarCarrito}
        />
      )}

      {carritoAbierto && (
        <Cart
          cart={cart}
          onCerrar={() => setCarritoAbierto(false)}
          onAgregar={agregarAlCarrito}
          onQuitar={quitarDelCarrito}
          onEliminar={eliminarDelCarrito}
          onVaciarCarrito={vaciarCarrito}
          onEditarSeleccion={editarSeleccionDelCarrito}
        />
      )}

      {comboActivo && (
        <ComboSelector
          combo={comboActivo}
          esEdicion={Boolean(comboEditando)}
          onCerrar={cerrarComboSelector}
          onConfirmar={confirmarComboSeleccionado}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
