import { z } from "zod";

export const deliverySchema = z.object({
  direccion: z
    .string()
    .min(5, "Ingresa una dirección válida"),

  whatsapp: z
    .string()
    .regex(
      /^\d{9}$/,
      "El WhatsApp debe tener 9 dígitos"
    ),
});

export const presencialSchema = z.object({
  nombreRecojo: z
    .string()
    .min(3, "Ingresa el nombre de quien recogerá el pedido"),

  horaRecojo: z
    .string()
    .min(1, "Selecciona una hora aproximada de recojo"),

  whatsapp: z
    .string()
    .regex(
      /^\d{9}$/,
      "El WhatsApp debe tener 9 dígitos"
    ),
});