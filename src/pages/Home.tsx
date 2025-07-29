import sistemas from "@/assets/img/logo_sistemas.png";
import CourseCard from "@/components/pages/home/CourseCard";
import NewsSection from "@/components/pages/home/NewsSection";
import { courses } from "@/lib/courses";
import logoUniversidad from "@/assets/img/Logos/logo_universidad.png";
import concytec from "@/assets/img/Logos/logo_concytec.png";
import idiomas from "@/assets/img/Logos/logo_centro_idiomas_unamba.png";
import trabajo from "@/assets/img/Logos/logo_bolsa_trabajo_unamba.png";
import sunedu from "@/assets/img/Logos/logo_sunedu.png";
import repositorio from "@/assets/img/Logos/logo_repositorio_unamba.png";
import servicios from "@/assets/img/Logos/logo_servicios_academicos.png";
import { Facebook, Instagram, Mail, Map, Phone, Youtube } from "lucide-react";
import GallerySection from "@/components/pages/home/GallerySection";

function Home() {
    return (
        <div>
            <section className="h-[calc(100svh-6.5rem)] bg-fondo-image bg-no-repeat bg-center bg-cover relative z-0">
                <div className="absolute h-[calc(100svh-6.5rem)] w-full bg-black opacity-75 z-5"></div>
                <article className="relative z-7 h-full items-center justify-around -top-10 grid lg:grid-cols-2">
                    <figure className="flex justify-center">
                        <img
                            src={sistemas}
                            alt=""
                            className="w-100 object-cover"
                        />
                    </figure>
                    <div className="flex items-center justify-center flex-col gap-y-10 font-rem text-6xl text-white font-semibold">
                        <h1 className="text-center uppercase tracking-wider leading-tight mb-4">
                            Ingeniería
                            <br className="block h-6" />
                            Informática y Sistemas
                        </h1>
                        <p className="text-xl font-light uppercase tracking-wide text-gray-300">
                            Forjando tu futuro con excelencia
                        </p>
                    </div>
                </article>
            </section>
            <section className="relative w-full -mt-5 -mb-5 z-20">
                <div className="grid grid-cols-4 gap-x-14 px-4 w-full max-w-screen-2xl mx-auto">
                    {courses.map((course) => (
                        <CourseCard title={course.name} />
                    ))}
                </div>
            </section>
            <NewsSection />
            <GallerySection />
            );
            <section className="flex flex-col gap-y-10 p-10 bg-intent">
                <h2 className="uppercase text-xl font-bold text-tertiary">
                    Enlaces de interes
                </h2>
                <div className="grid grid-cols-4 items-center justify-between">
                    <a href="https://www.unamba.edu.pe/" target="_blank">
                        <img
                            src={logoUniversidad}
                            alt=""
                            className="w-60 object-cover cursor-pointer m-auto"
                        />
                    </a>
                    <a
                        href="https://biblioteca.concytec.gob.pe/"
                        target="_blank"
                    >
                        <img
                            src={concytec}
                            alt=""
                            className="w-60 object-cover cursor-pointer m-auto"
                        />
                    </a>
                    <a href="https://idiomas.unamba.edu.pe/" target="_blank">
                        <img
                            src={idiomas}
                            alt=""
                            className="w-60 object-cover cursor-pointer m-auto"
                        />
                    </a>
                    <a
                        href="https://bolsadetrabajo.unamba.edu.pe/jobOffers"
                        target="_blank"
                    >
                        <img
                            src={trabajo}
                            alt=""
                            className="w-60 object-cover cursor-pointer m-auto"
                        />
                    </a>
                </div>
                <div className="grid grid-cols-3">
                    <a href="https://enlinea.sunedu.gob.pe/" target="_blank">
                        <img
                            src={sunedu}
                            alt=""
                            className="w-60 object-cover cursor-pointer m-auto"
                        />
                    </a>
                    <a
                        href="https://repositorio.unamba.edu.pe/"
                        target="_blank"
                    >
                        <img
                            src={repositorio}
                            alt=""
                            className="w-60 object-cover cursor-pointer m-auto"
                        />
                    </a>
                    <a
                        href="https://sisacademico.unamba.edu.pe/"
                        target="_blank"
                    >
                        <img
                            src={servicios}
                            alt=""
                            className="w-60 object-cover cursor-pointer m-auto"
                        />
                    </a>
                </div>
            </section>
            <div className="h-20 bg-tertiary w-full"></div>
            <section className="px-16 py-8 flex flex-col gap-y-10 bg-success">
                <div className="grid grid-cols-2 gap-20">
                    <div className="bg-brand text-white rounded-3xl p-8 flex flex-col gap-y-20">
                        <h2 className="text-tertiary font-bold uppercase text-2xl">
                            Ubicacion
                        </h2>
                        <div className="flex gap-x-8">
                            <span className="text-tertiary text-7xl">
                                <Map />
                            </span>
                            <div className="flex flex-col gap-y-8">
                                <div className="flex flex-col text-xl">
                                    <h2 className="text-[#3A7CA5] font-bold text-2xl">
                                        Dirección
                                    </h2>
                                    <span>
                                        Av. Inca Garcilazo de la Vega S/N
                                    </span>
                                    <span>Tamburco-Abancay-Apurimac</span>
                                </div>
                                <div className="flex flex-col text-xl">
                                    <h2 className="text-[#3A7CA5] font-bold text-2xl">
                                        Horario de Atención
                                    </h2>
                                    <span>
                                        Lunes a viernes de 08:00 a 13:00
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d576.1031086036314!2d-72.8680150442175!3d-13.617773473988132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916d031110cca7df%3A0x76b548e9c776d989!2sUniversidad%20Nacional%20Micaela%20Bastidas%20de%20Apur%C3%ADmac!5e0!3m2!1ses-419!2spe!4v1752372380098!5m2!1ses-419!2spe"
                            width="100%"
                            height="450"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
                <article className="bg-brand grid grid-cols-2 items-center justify-between rounded-3xl">
                    <div className="flex flex-col gap-y-10 p-10">
                        <h2 className="text-tertiary text-2xl font-bold uppercase">
                            Contacto
                        </h2>
                        <div className="flex flex-col gap-y-6">
                            <div className="flex gap-x-6 items-center">
                                <span className="text-tertiary text-xl">
                                    <Phone />
                                </span>
                                <div className="flex flex-col gap-y-2">
                                    <span className="text-[#3A7CA5] font-semibold">
                                        Telefono
                                    </span>
                                    <span className="text-white">
                                        985-756-421
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-x-6 items-center">
                                <span className="text-tertiary text-xl">
                                    <Mail />
                                </span>
                                <div className="flex flex-col gap-y-2">
                                    <span className="text-[#3A7CA5] font-semibold">
                                        Correo
                                    </span>
                                    <span className="text-white">
                                        datacentereapiis@unamba.edu.pe
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start item h-full w-full p-10">
                        <h2 className="text-tertiary text-2xl font-bold uppercase">
                            Nuestras Redes
                        </h2>
                        <div className="flex gap-x-10 p-10 justify-between">
                            <span className="text-7xl text-white rounded-full bg-accent p-4">
                                <a
                                    href="https://www.youtube.com/@Ingenier%C3%ADaInform%C3%A1ticaySistemas"
                                    target="_blank"
                                >
                                    <Youtube size={40} />
                                </a>
                            </span>
                            <span className="text-7xl text-white rounded-full bg-accent p-4">
                                <Instagram size={40} />
                            </span>
                            <span className="text-7xl text-white rounded-full bg-accent p-4">
                                <a
                                    href="https://www.facebook.com/unamba.apurimac/?locale=es_LA"
                                    target="_blank"
                                >
                                    <Facebook size={40} />
                                </a>
                            </span>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default Home;
