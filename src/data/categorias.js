import cevicheClasico from "../assets/cevicheClasico.jpg";
import jaleaPescado from "../assets/jaleaPescado.JPG";
import carapulcraChinchana from "../assets/carapulcraChinchana.jpg";
import chicharrones from "../assets/chicharrones.jpg";
import arrozPato from "../assets/arrozPato.jpg";
import causaAcevichada from "../assets/causaAcevichada.jpg";

export const categories = [
  {
    nombre: "Combos",
    descripcion:
      "Lo mejor de la carta en un solo plato, para no tener que elegir.",
    imagenes: [
      causaAcevichada,
      cevicheClasico,
    ],
  },

  {
    nombre: "Entradas",
    descripcion:
      "Para abrir el apetito: causas, pulpo y los clásicos piqueos de la casa.",
    imagenes: [
      causaAcevichada,
    ],
  },

  {
    nombre: "Ceviches y tiraditos",
    descripcion:
      "Pescado del día marinado al momento en limón, cebolla y ají.",
    imagenes: [
      cevicheClasico,
      jaleaPescado,
    ],
  },

  {
    nombre: "Chicharrones y jaleas",
    descripcion:
      "Mariscos y pescado frito con yuca y salsa criolla, para compartir.",
    imagenes: [
      chicharrones,
      jaleaPescado,
    ],
  },

  {
    nombre: "Arroces",
    descripcion:
      "Arroces criollos con el sabor de la cocina de barrio.",
    imagenes: [
      arrozPato,
      carapulcraChinchana,
    ],
  },

  {
    nombre: "Platos criollos",
    descripcion:
      "Los sabores de siempre: carapulcra, secos y arroz con pato.",
    imagenes: [
      carapulcraChinchana,
      arrozPato,
    ],
  },
];
