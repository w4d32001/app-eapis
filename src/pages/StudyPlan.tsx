import sistemas from "@/assets/img/logo_sistemas.png";
import type { AcademicArea } from "@/components/pages/studyPlan/AreasCard";
import AreasCard from "@/components/pages/studyPlan/AreasCard";
import CurriculumTimeline from "@/components/pages/studyPlan/CurriculumTimeLine";
import { academicAreasData } from "@/lib/academic";
import { useState } from "react";
import malla from "@/assets/malla.jpeg";

function StudyPlan() {
    const [activeTabId, setActiveTabId] = useState<string>("areas");

    const tabs = [
        { id: "areas", label: "ÁREAS CURRICULARES" },
        { id: "malla", label: "MALLA CURRICULAR" },
        { id: "plan", label: "PLAN DE ESTUDIOS" },
        { id: "resolucion", label: "RESOLUCIÓN" }
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
                        <img src={malla} alt="" className="object-cover m-auto"/>
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
            <div className="h-20 w-full bg-[#0A2342]"></div>
            <section className="w-full h-full flex flex-col gap-y-8 bg-[#364C5D] py-10">
                <h2 className="text-center text-2xl font-semibold uppercase text-white">
                    Plan de Estudios
                </h2>
                
                <div className="flex flex-wrap justify-center gap-4 px-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                                activeTabId === tab.id
                                    ? "bg-[#0A2342] text-white shadow-lg"
                                    : "bg-white text-[#0A2342] hover:bg-gray-100"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="px-4 mt-8">
                    {renderTabContent()}
                </div>
            </section>
        </div>
    );
}

export default StudyPlan;