import { Facebook, Instagram, Mail, Map, Phone, Youtube } from "lucide-react"

function Footer() {
  return (
    <footer>
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
    </footer>
  )
}

export default Footer