import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
} from "react-icons/fa";
import { MapPin } from "lucide-react";
import logo from "../assets/logo-rinconcito.jpg"

function Footer() {
    return (
        <footer
            id="contacto"
            className="bg-gray-900 text-white"
        >
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

                <div className="grid gap-10 md:grid-cols-3">

                    {/* Información */}
                    <div>
                        <div className="flex items-center gap-2 ">
                            <img
                            src={logo}
                            alt="Logo El Rinconcito"
                            className="h-16 w-16 object-contain rounded-full"
                            />

                            <h2 className="text-xl font-bold">
                                El Rinconcito
                            </h2>
                        </div>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                            Disfruta de nuestros ceviches y sabores del mar,
                            preparados con ingredientes frescos y el auténtico
                            sabor peruano.
                        </p>
                    </div>

                    {/* Redes sociales */}
                    <div>
                        <h3 className="text-lg font-bold">
                            Síguenos
                        </h3>

                        <p className="mt-3 text-sm text-gray-400">
                            Encuéntranos en nuestras redes sociales.
                        </p>

                        <div className="mt-5 flex gap-3">

                            <a
                                href="https://www.facebook.com/TURINCONCITOCHINCHANO"
                                target="_blank"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-cyan-700 hover:text-white"
                            >
                                <FaFacebookF size={18} />
                            </a>

                            <a
                                href="https://www.instagram.com/rinconcitochinchano.pe"
                                target="_blank"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-cyan-700 hover:text-white"
                            >
                                <FaInstagram size={18} />
                            </a>

                            <a
                                href="https://www.tiktok.com/@rinconcitochinchano"
                                target="_blank"
                                aria-label="TikTok"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-cyan-700 hover:text-white"
                            >
                                <FaTiktok size={18} />
                            </a>

                        </div>
                    </div>

                    {/* Dirección */}
                    <div>
                        <h3 className="text-lg font-bold">
                            Visítanos
                        </h3>

                        <div className="mt-4 flex items-start gap-3">
                            <a
                                href="https://www.google.com/maps/place/Rinconcito+Chinchano/@-12.076287,-77.0207507,15z/data=!4m6!3m5!1s0x9105c8855ef58a75:0xe6a41383a1752676!8m2!3d-12.076287!4d-77.0207507!16s%2Fg%2F11c1mgmb_1?sa=X&ved=1t:2428&ictx=111&entry=tts"
                                target="_blank"
                                aria-label="Ver ubicación en Google Maps"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800 text-cyan-500 transition hover:bg-cyan-700 hover:text-white"
                            >
                                <MapPin
                                    size={20}
                                    className="mt-0.5 shrink-0 text-cyan-500"
                                />

                            </a>
                            <p className="text-sm leading-6 text-gray-400">
                                Los Corales 501, La Victoria 15034
                                <br />
                                Lima, Perú
                            </p>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="mt-10 border-t border-gray-800 pt-6 text-center">
                    <p className="text-sm text-gray-500">
                        © 2026 El Rinconcito. Todos los derechos reservados.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;