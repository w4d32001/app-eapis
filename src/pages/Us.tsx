import UsCard from "@/components/pages/us/UsCard";
import React, { useState, useEffect } from "react";
import sistemas from "@/assets/img/logo_sistemas.png";
import contactos from "@/assets/img/us/contactos.png";
import graduacion from "@/assets/img/us/graduacion.png";
import vision from "@/assets/img/us/image69.png";
import campo from "@/assets/img/us/image68.png";
import mision from "@/assets/img/us/image67.png";
import { settingsService } from "@/services/settingsService";
import type { Portada } from "./Teachers";

interface Section {
    image: string;
    title: string;
    id: string;
}

const Us: React.FC = () => {
    const [activeTabId, setActiveTabId] = useState<string>("perfil");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const sections: Section[] = [
        {
            image: contactos,
            title: "Perfil profesional",
            id: "perfil",
        },
        {
            image: graduacion,
            title: "Grados y Titulos",
            id: "grados",
        },
        {
            image: vision,
            title: "Visión",
            id: "vision",
        },
        {
            image: campo,
            title: "Campo Laboral",
            id: "campo",
        },
        {
            image: mision,
            title: "Misión",
            id: "mision",
        },
    ];

    const showTab = (targetId: string): void => {
        if (targetId === activeTabId) return;

        setIsTransitioning(true);

        setTimeout(() => {
            setActiveTabId(targetId);
            setIsTransitioning(false);
        }, 200);
    };

    useEffect(() => {
        if (sections.length > 0) {
            setActiveTabId(sections[0].id);
        }
    }, []);

    const [portadas, setPortadas] = useState<Portada[]>([]);
    const portadaUs = portadas.find((p) => p.name === "nosotros");
    const portadaHistory = portadas.find((p) => p.name === "historia");

    useEffect(() => {
        settingsService().then((data) => setPortadas(data));
    }, []);

    const renderTabContent = () => {
        const baseClasses = `tab-content transition-all duration-400 ease-in-out transform ${
            isTransitioning 
                ? 'opacity-0 translate-y-8 scale-95' 
                : 'opacity-100 translate-y-0 scale-100'
        }`;

        switch (activeTabId) {
            case "perfil":
                return (
                    <div className={`${baseClasses} text-[#0A2342] text-center`}>
                        <h2 className="text-3xl font-bold mb-6 transform transition-all duration-500 ease-out">
                            Perfil profesional
                        </h2>
                        <h3 className="text-xl font-semibold mb-4 transform transition-all duration-600 ease-out">
                            Descripción de las competencias y habilidades que
                            poseerá el egresado:
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            {[
                                "Pensamiento Analítico",
                                "Resolución de Problemas",
                                "Liderazgo y Trabajo en Equipo",
                                "Comunicación Efectiva",
                                "Adaptabilidad y Aprendizaje Continuo",
                                "Gestión de Proyectos",
                                "Ética Profesional y Responsabilidad Social",
                                "Innovación y Creatividad",
                                "Competencia Técnica Especializada",
                                "Orientación al Cliente y al Usuario"
                            ].map((item, index) => (
                                <li 
                                    key={item}
                                    className={`transition-all duration-500 ease-out transform ${
                                        isTransitioning
                                            ? 'opacity-0 translate-x-8'
                                            : 'opacity-100 translate-x-0'
                                    }`}
                                    style={{
                                        transitionDelay: isTransitioning ? '0ms' : `${index * 50}ms`
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case "grados":
                return (
                    <div className={`${baseClasses} text-[#0A2342] text-center`}>
                        <h2 className="text-3xl font-bold mb-6">
                            Grados y Títulos
                        </h2>
                        <h3 className="text-xl font-semibold mb-4">
                            Al concluir el plan de estudios de la Escuela de
                            Ingeniería Informática y Sistemas de la UNAMBA, el
                            estudiante obtendrá:
                        </h3>
                        <ul className="space-y-4 text-lg text-center">
                            {[
                                {
                                    title: "Grado académico:",
                                    content: "Bachiller en Ingeniería Informática y de Sistemas"
                                },
                                {
                                    title: "Título profesional:",
                                    content: "Ingeniero Informático y de Sistemas"
                                }
                            ].map((item, index) => (
                                <li 
                                    key={item.title}
                                    className={`bg-white/10 p-4 rounded-lg transition-all duration-500 ease-out transform ${
                                        isTransitioning
                                            ? 'opacity-0 translate-y-8'
                                            : 'opacity-100 translate-y-0'
                                    }`}
                                    style={{
                                        transitionDelay: isTransitioning ? '0ms' : `${index * 200}ms`
                                    }}
                                >
                                    <strong>{item.title}</strong>
                                    <br />
                                    {item.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case "vision":
                return (
                    <div className={`${baseClasses} text-[#0A2342] text-center`}>
                        <h2 className="text-3xl font-bold mb-6">
                            Nuestra Visión
                        </h2>
                        <p className="text-lg leading-relaxed">
                            Ser reconocidos a nivel nacional e internacional
                            como una carrera de excelencia en la formación de
                            profesionales, capaces de liderar la transformación
                            digital y el desarrollo tecnológico en el país y la
                            región, con un fuerte compromiso ético y
                            responsabilidad social. Nos enfocamos en la
                            investigación aplicada, la innovación tecnológica y
                            el impulso a proyectos que contribuyan al desarrollo
                            sostenible, formando egresados altamente
                            capacitados, emprendedores y con una sólida
                            preparación para enfrentar los desafíos del entorno
                            global.
                        </p>
                    </div>
                );

            case "campo":
                return (
                    <div className={`${baseClasses} text-[#0A2342] text-center`}>
                        <h2 className="text-3xl font-bold mb-6">
                            Campo Laboral
                        </h2>
                        <h3 className="text-xl font-semibold mb-4">
                            El ingeniero que egrese de la Escuela de Ingeniería
                            Informática y Sistemas de la UNAMBA podrá
                            desarrollarse en:
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            {[
                                "Desarrollo de Software",
                                "Análisis y Diseño de Sistemas",
                                "Administración de Redes y Seguridad Informática",
                                "Ciberseguridad y Auditoría de Sistemas",
                                "Gestión de Proyectos Tecnológicos",
                                "Investigación y Desarrollo",
                                "Emprendimiento Tecnológico"
                            ].map((item, index) => (
                                <li 
                                    key={item}
                                    className={`transition-all duration-500 ease-out transform hover:bg-white/10 hover:rounded-lg hover:p-2 hover:-translate-x-2 ${
                                        isTransitioning
                                            ? 'opacity-0 translate-x-8'
                                            : 'opacity-100 translate-x-0'
                                    }`}
                                    style={{
                                        transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms`
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case "mision":
                return (
                    <div className={`${baseClasses} text-[#0A2342] text-center`}>
                        <h2 className="text-3xl font-bold mb-6">
                            Nuestra Misión
                        </h2>
                        <p className="text-lg leading-relaxed">
                            Tiene como misión formar profesionales capaces de
                            diseñar, desarrollar y gestionar sistemas de
                            información requeridos por las empresas públicas y
                            privadas. Además, administra redes telemáticas y
                            realiza investigaciones centradas en las tecnologías
                            de información y comunicación, con un alto valor
                            ético y responsabilidad social para promover el
                            desarrollo regional y nacional.
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <section
                className="h-[calc(100vh-6.5rem)] bg-fondo-image bg-center bg-cover relative"
                style={{ backgroundImage: `url(${portadaUs?.image})` }}
            >
                <div className="absolute h-[calc(100vh-6.5rem)] w-full bg-black opacity-75"></div>
                <article className="relative flex flex-col z-10 h-full items-center justify-around -top-10">
                    <figure className="flex justify-center m-auto">
                        <img
                            src={sistemas}
                            alt="Logo Sistemas"
                            className="w-80 object-cover"
                        />
                    </figure>
                    <div className="flex items-center justify-center flex-col gap-y-10 text-4xl text-white font-semibold">
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

            <div className="h-20 w-full bg-[#1B4E7A]"></div>

            <section className="h-[calc(100vh-8rem)] bg-[#D9D9D9] relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
                    <div className="h-screen flex flex-col items-center relative justify-center">
                        <div className="w-2/3 text-center flex flex-col gap-y-8 py-5">
                            <h2 className="text-[#050087] font-light text-5xl uppercase font-serif">
                                Nuestra Historia
                            </h2>
                            <p className="text-sm lg:text-xl  text-[#0A2342] text-center font-light">
                                La carrera de Ingeniería Informática y Sistemas
                                en la Universidad Nacional Micaela Bastidas de
                                Apurímac (UNAMBA) fue creada poco después de la
                                fundación de la universidad, que tuvo lugar el
                                26 de enero de 2000. Desde entonces, la carrera
                                ha sido parte fundamental de la oferta académica
                                de la UNAMBA, buscando formar profesionales
                                capaces de liderar en el campo de las
                                tecnologías de la información y la comunicación,
                                adaptándose a las necesidades cambiantes de la
                                región y del país.
                            </p>
                        </div>
                        <div className="absolute top-10 left-10 h-full flex items-center pb-60">
                            <div className="border-l border-2 border-[#1B4E7A] h-full relative">
                                <span className="h-10 w-10 bg-[#1B4E7A] rounded-full block -left-5 absolute top-10"></span>
                                <span className="h-10 w-10 bg-[#1B4E7A] rounded-full block -left-5 absolute top-1/2 -translate-y-1/2"></span>
                                <span className="h-10 w-10 bg-[#1B4E7A] rounded-full block -left-5 absolute bottom-10"></span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img
                            src={portadaHistory?.image}
                            alt="Logo Sistemas"
                            className="w-180 object-cover border-[#F0CE5D] border-2 rounded"
                        />
                    </div>
                </div>
                <div className="relative h-64 w-full z-10 rotate-180">
                    <svg
                        className="absolute -bottom-40 w-full h-full"
                        viewBox="0 0 1440 590"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M 0,600 L 0,225 C 104.06,194.51 208.13,164.02 302,194 C 395.86,223.97 479.53,314.41 559,296 C 638.46,277.58 713.74,150.31 810,139 C 906.25,127.68 1023.50,232.33 1132,266 C 1240.49,299.66 1340.24,262.33 1440,225 L 1440,600 L 0,600 Z"
                            fill="#D9D9D9"
                        />
                    </svg>
                </div>
            </section>

            <div className="min-h-screen bg-[#333333] pt-64">
                <div className="curved-container relative h-[400px]">
                    <div className="flex justify-center items-center space-x-8 py-8">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                className={`item cursor-pointer p-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                                    activeTabId === section.id
                                        ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400 ring-opacity-50 scale-105"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                                onClick={() => showTab(section.id)}
                            >
                                <UsCard {...section} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-40"></div>
                <div className="w-full relative py-20 flex items-center justify-center">
                    <div className="absolute inset-0 flex flex-col">
                        <div className="flex-1 bg-[#33617E] rounded-t-2xl"></div>
                        <div className="flex-1 bg-[#F9F1DF]"></div>
                    </div>

                    <div className="w-full max-w-6xl px-10 relative z-20">
                        <div className="w-full rounded-3xl bg-[#F0CE5D] p-10 shadow-lg overflow-hidden">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Us;