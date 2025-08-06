import type { Teacher } from "@/pages/Teachers";
import { FileText, Mail, Phone } from "lucide-react";

function ProfesionalCard({ teacher }: { teacher: Teacher }) {
    return (
        <div className="w-full m-auto md:p-16">
            <div className="bg-[#001135] w-full rounded-2xl p-8 shadow-2xl border border-slate-600">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-slate-300 to-slate-400 rounded-2xl flex items-center justify-center shadow-lg">
                        <img
                            src={teacher.image}
                            alt=""
                            className="w-100 h-100 object-cover rounded-2xl"
                        />
                    </div>
                </div>

                <h1 className="text-yellow-400 text-xl font-bold text-center mb-2">
                    {teacher.name}
                </h1>

                <p className="text-blue-400 text-sm font-semibold text-center mb-8 uppercase tracking-wide">
                    {teacher.academic_degree}
                </p>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center text-white">
                        <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{teacher.email}</span>
                    </div>

                    <div className="flex items-center text-white">
                        <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{teacher.phone}</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="bg-[#B4A97A] text-slate-900 font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Ver Hoja de Vida</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfesionalCard;
