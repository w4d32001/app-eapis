import { Mail, Phone } from "lucide-react";

export interface Teacher {
        name: string;
        position: string;
        image: string;
        school: string;
        email: string;
        phone: string;
    };

function TeacherDetails({ teacher }: { teacher: Teacher }) {
  return (
    <article
    className="pr-8 grid grid-cols-3 w-full items-center gap-4 rounded-lg border shadow-primary shadow-lg border-gray-300"
>
    <div className="col-span-1">
        <img
            src={teacher.image}
            alt=""
            className="w-70 h-70 rounded-l object-cover shadow-lg"
        />
    </div>
    <div className="flex flex-col gap-2 col-span-2">
        <span className="text-primary text-4xl font-semibold">{teacher.school}</span
        >
        <h3 className="font-bold text-black/90 text-xl">{teacher.name}</h3>
        <p className="text-black/60">{teacher.position}</p>
        <span className="text-black/60 flex items-center gap-x-2"
            ><Mail /> {teacher.email}</span
        >
        <span className="text-black/60 flex items-center gap-x-2"
            ><Phone /> {teacher.phone}</span
        >
    </div>
</article>

  )
}

export default TeacherDetails