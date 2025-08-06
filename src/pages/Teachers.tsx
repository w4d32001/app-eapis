import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfesionalCard from "@/components/pages/teacher/ProfesionalCard"
import { Separator } from "@/components/ui/separator"
import fondo from "@/assets/fondo.png";
import { API_URL } from '@/lib/url';

export interface Teacher {
    id?: string;
    name: string;
    academic_degree: string;
    email: string;
    phone: string;
    image?: string;
    teacher_type: TeacherType;
}

export interface TeacherType {
    id: number;
    name: string;
    updated_at?: string;
    updated_by?: string;
}

interface ApiResponse {
    teachers: Teacher[];
    teacherTypes: TeacherType[];
    filters: any[];
}

function Teachers() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(`${API_URL}/teachers`);
            setTeachers(response.data.teachers);
            setFilteredTeachers(response.data.teachers);
            setError(null);
        } catch (err) {
            setError('Error al cargar los datos de los docentes');
            console.error('Error fetching teachers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    const filterTeachers = (filterType: string) => {
        setActiveFilter(filterType);
        
        if (filterType === 'all') {
            setFilteredTeachers(teachers);
            return;
        }

        const filtered = teachers.filter(teacher => {
            const teacherTypeName = teacher.teacher_type.name.toLowerCase();
            
            switch (filterType) {
                case 'nombrado':
                    return teacherTypeName.includes('nombrado');
                case 'contratado':
                    return teacherTypeName.includes('contratado');
                case 'jefe':
                    return teacherTypeName.includes('jefe de practica');
                default:
                    return true;
            }
        });
        
        setFilteredTeachers(filtered);
    };

    const getDirectors = () => {
        return teachers.filter(teacher => 
            teacher.teacher_type.name.includes('DIRECTOR')
        );
    };

    const getOtherTeachers = () => {
        return filteredTeachers.filter(teacher => 
            !teacher.teacher_type.name.includes('DIRECTOR')
        );
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Cargando docentes...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    const directors = getDirectors();
    const otherTeachers = getOtherTeachers();

    return (
        <div className="w-full min-h-screen ">
            <div className="relative h-[calc(80vh)] w-full overflow-hidden z-0">
                <img
                    src={fondo}
                    alt="Fondo de la página de docentes"
                    className="absolute inset-0 w-full h-full object-cover z-0 -top-0"
                />
                <div className="absolute inset-0 bg-black/60 z-0"></div>
            </div>

            <div className="relative z-30 bg-[#2A4F6E] -mt-10 rounded-t-3xl pt-16 px-4 md:px-8">
                <div className="absolute z- mx-4 -top-15 text-white text-center">
                    <div className="bg-[#F0CE5D] text-[#0A2342] p-6 rounded-lg max-w-2xl shadow-lg">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wider">
                            Nuestras autoridades y <br /> equipo docente
                        </h2>
                    </div>
                </div>
                <h2 className="text-2xl md:text-3xl text-center mb-6 font-semibold tracking-wider text-white">
                    Nuestras Autoridades
                </h2>

                <Separator className="text-white" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-16">
                    {directors.length > 0 ? (
                        directors.map((director) => (
                            <ProfesionalCard
                               teacher={director}
                            />
                        ))
                    ) : (
                        <>
                            <div className="text-white text-center">No hay directores disponibles</div>
                            <div className="text-white text-center">No hay directores disponibles</div>
                        </>
                    )}
                </div>
            </div>

            <div className="my-8">
                <h2 className="text-2xl text-[#333333] md:text-3xl text-center mb-6 font-semibold tracking-wider">
                    Nuestro equipo docente
                </h2>
                
               
                

                <div>
                    <ul className="flex gap-x-4 items-center justify-around text-primary font-bold">
                        <li>
                            <button 
                                onClick={() => filterTeachers('all')}
                                className={`py-2 px-4 rounded ${activeFilter === 'all' ? 'bg-[#F0CE5D]' : 'bg-[#3E4CA9]'}`}
                            >
                                Ver todos
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => filterTeachers('nombrado')}
                                className={`py-2 px-4 rounded ${activeFilter === 'nombrado' ? 'bg-[#F0CE5D]' : 'bg-[#3E4CA9]'}`}
                            >
                                Docente nombrados
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => filterTeachers('contratado')}
                                className={`py-2 px-4 rounded ${activeFilter === 'contratado' ? 'bg-[#F0CE5D]' : 'bg-[#3E4CA9]'}`}
                            >
                                Docentes contratados
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => filterTeachers('jefe')}
                                className={`py-2 px-4 rounded ${activeFilter === 'jefe' ? 'bg-[#F0CE5D]' : 'bg-[#3E4CA9]'}`}
                            >
                                Jefes de practica
                            </button>
                        </li>
                    </ul>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 mx-auto">
                        {otherTeachers.length > 0 ? (
                            otherTeachers.map((teacher) => (
                                <ProfesionalCard key={teacher.id} teacher={teacher} />
                            ))
                        ) : (
                            <div className="col-span-full text-white text-center py-8">
                                No hay docentes disponibles para el filtro seleccionado
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teachers;