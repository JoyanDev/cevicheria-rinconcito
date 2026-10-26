function WhatsAppButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 w-full rounded-xl bg-cyan-700 px-5 py-4 font-bold text-white transition hover:bg-cyan-800 active:scale-[0.99]"
    >
      Realizar pedido por WhatsApp
    </button>
  );
}

export default WhatsAppButton;