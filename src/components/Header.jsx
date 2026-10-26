import { useState } from "react";
import logo from "../assets/logo-rinconcito.jpg";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="Logo El Rinconcito"
                        className="h-16 w-16 object-contain rounded-full"
                    />

                    <span className="text-xl font-bold text-gray-900">
                        El Rinconcito
                    </span>
                </div>

                {/* Navegación Desktop */}
                <nav className="hidden items-center gap-8 md:flex">
                    <a
                        href="#inicio"
                        className="text-sm font-medium text-gray-700 transition hover:text-cyan-700"
                    >
                        Inicio
                    </a>

                    <a
                        href="#carta"
                        className="text-sm font-medium text-gray-700 transition hover:text-cyan-700"
                    >
                        Carta
                    </a>

                    <a
                        href="#contacto"
                        className="text-sm font-medium text-gray-700 transition hover:text-cyan-700"
                    >
                        Contacto
                    </a>
                </nav>

                {/* Botón hamburguesa */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2xl text-gray-800 md:hidden"
                    aria-label="Abrir menú"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Menú Mobile */}
            {menuOpen && (
                <nav className="border-t border-gray-100 bg-white px-5 py-3 md:hidden">
                    <a
                        href="#inicio"
                        onClick={() => setMenuOpen(false)}
                        className="block border-b border-gray-100 py-3 text-gray-700"
                    >
                        Inicio
                    </a>

                    <a
                        href="#carta"
                        onClick={() => setMenuOpen(false)}
                        className="block border-b border-gray-100 py-3 text-gray-700"
                    >
                        Carta
                    </a>

                    <a
                        href="#contacto"
                        onClick={() => setMenuOpen(false)}
                        className="block py-3 text-gray-700"
                    >
                        Contacto
                    </a>
                </nav>
            )}
        </header>
    );
}

export default Header;