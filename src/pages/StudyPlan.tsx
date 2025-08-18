import sistemas from "@/assets/img/logo_sistemas.png";
import type { AcademicArea } from "@/components/pages/studyPlan/AreasCard";
import AreasCard from "@/components/pages/studyPlan/AreasCard";
import CurriculumTimeline from "@/components/pages/studyPlan/CurriculumTimeLine";
import { academicAreasData } from "@/lib/academic";
import { useEffect, useState } from "react";
import type { Portada } from "./Teachers";
import { settingsService } from "@/services/settingsService";

function StudyPlan() {
    const [activeTabId, setActiveTabId] = useState<string>("areas");

    const tabs = [
        { id: "areas", label: "ÁREAS CURRICULARES" },
        { id: "malla", label: "MALLA CURRICULAR" },
        { id: "plan", label: "PLAN DE ESTUDIOS" },
        { id: "resolucion", label: "RESOLUCIÓN" },
    ];

    const renderTabContent = () => {
        switch (activeTabId) {
            case "areas":
                return (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {academicAreasData.map((area: AcademicArea) => (
                                <AreasCard key={area.id} area={area} />
                            ))}
                        </div>
                    </div>
                );

            case "malla":
                return (
                    <div className="tab-content text-[#0A2342] text-center">
                        <img
                            src={portadaMalla?.image}
                            alt=""
                            className="object-cover m-auto"
                        />
                    </div>
                );

            case "plan":
                return (
                    <div className="tab-content text-[#0A2342] text-center">
                        <CurriculumTimeline />
                    </div>
                );

            case "resolucion":
                return (
                    <div className="tab-content text-[#0A2342] text-center">
                        <p>Contenido de Resolución</p>
                    </div>
                );

            default:
                return null;
        }
    };
    const [portadas, setPortadas] = useState<Portada[]>([]);
    const portadaAbout = portadas.find((p) => p.name === "plan");
    const portadaMalla = portadas.find((p) => p.name === "malla");

    useEffect(() => {
        settingsService().then((data) => setPortadas(data));
    }, []);

    return (
        <div>
            <section
                className="h-[calc(100svh-6.5rem)] bg-no-repeat bg-center bg-cover relative z-0"
                style={{ backgroundImage: `url(${portadaAbout?.image})` }}
            >
                <div className="absolute h-[calc(100svh-6.5rem)] w-full bg-black opacity-75 z-5"></div>
                <article className="relative z-7 h-full items-center justify-around -top-10 grid lg:grid-cols-2">
                    <figure className="flex justify-center">
                        <img
                            src={sistemas}
                            alt=""
                            className="w-80 object-cover"
                        />
                    </figure>
                    <div className="flex items-center justify-center flex-col gap-y-10 font-rem text-4xl text-white font-semibold">
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
            <div className="h-20 w-full bg-[#0A2342]"></div>
            <section className="w-full h-full flex flex-col bg-[#364C5D] py-10">
                <h2 className="text-center text-2xl font-semibold uppercase text-white mb-4">
                    Plan de Estudios
                </h2>

                <div className="flex flex-wrap justify-center px-4">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`px-6 py-3 font-semibold transition-all duration-300 ${
                                activeTabId === tab.id
                                    ? "bg-[#1B4E7A] text-tertiary shadow-lg"
                                    : "bg-[#001135] text-white hover:bg-[#1B4E7A]"
                            }
                            ${index === 0 ? "rounded-tl-lg" : ""}
                            ${index === tabs.length - 1 ? "rounded-tr-lg" : ""}
                            ${index !== 0 ? "border-l border-white" : ""}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="px-4 bg-[#284055] pt-14">
                    {renderTabContent()}
                </div>
            </section>
        </div>
    );
}

export default StudyPlan;

