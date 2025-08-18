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
import GallerySection from "@/components/pages/home/GallerySection";

function Home() {
    const duplicatedCourses = [...courses, ...courses];
    return (
        <div className="overflow-x-hidden">
            <section className="h-[calc(100svh-6.5rem)] bg-fondo-image bg-no-repeat bg-center bg-cover relative z-0">
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
            <section className="relative w-full -mt-5 -mb-5 z-20 overflow-hiddens">
                <div className="flex animate-scroll">
                    {duplicatedCourses.map((course, index) => (
                        <div
                            key={`${course.name}-${index}`}
                            className="flex-shrink-0 mx-7"
                        >
                            <CourseCard title={course.name} />
                        </div>
                    ))}
                </div>
            </section>
            <NewsSection />
            <GallerySection />
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
        </div>
    );
}

export default Home;
