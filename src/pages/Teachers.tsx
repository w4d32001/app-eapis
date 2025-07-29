import ProfesionalCard from "@/components/pages/teacher/ProfesionalCard"
import TeacherDetails from "@/components/pages/teacher/TeacherDetails"
import { Separator } from "@/components/ui/separator"
import fakeTeachers from "@/lib/teacher"


function Teachers() {
  return (
    <div className="w-full min-h-screen">
    <div className="relative h-[calc(80vh)] w-full overflow-hidden z-0">
      <img
        src=""
        alt="Fondo de la página de docentes"
        className="absolute inset-0 w-full h-full object-cover z-0 -top-0"
      />
      <div className="absolute inset-0 bg-black/60 z-0"></div>
    </div>

    <div className="relative z-30 bg-[#2A4F6E] -mt-10 rounded-t-3xl pt-16 px-4 md:px-8">
      <div className="absolute z- mx-4 -top-15 text-white text-center">
        <div
          className="bg-[#F0CE5D] text-[#0A2342] p-6 rounded-lg max-w-2xl shadow-lg"
        >
          <h2
            className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider"
          >
            Nuestras autoridades y <br /> equipo docente
          </h2>
        </div>
      </div>
      <h2
        className="text-2xl md:text-3xl text-center mb-6 font-semibold tracking-wider text-white"
      >
        Nuestras Autoridades
      </h2>

      <Separator className="text-white" />

      
    </div>
    <div className="my-8">
      <h2
        className="text-2xl text-white md:text-3xl text-center mb-6 font-semibold tracking-wider"
      >
        Nuestras Autoridades
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-16">
        <ProfesionalCard />
        <ProfesionalCard />
      </div>
      <div>
        <ul className="flex gap-x-4 items-center justify-around text-primary font-bold">
          <li><a href="" className="py-2 px-4 bg-white rounded">Ver todos</a></li>
          <li><a href="" className="py-2 px-4 bg-white rounded">Docente nombrados</a></li>
          <li><a href="" className="py-2 px-4 bg-white rounded">Docentes contratados</a></li>
          <li><a href="" className="py-2 px-4 bg-white rounded">Jefes de practica</a></li>
        </ul>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-8 mx-auto">
        {fakeTeachers.map((teacher) => <TeacherDetails teacher={teacher} />)}
      </div>
      </div>
    </div>
  </div>
  )
}

export default Teachers