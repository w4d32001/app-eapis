import { FileText, Mail, Phone } from "lucide-react";

function ProfesionalCard() {
  return (
      <div className="bg-[#001135] rounded-2xl p-8 w-80 shadow-2xl border border-slate-600 m-auto">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-300 to-slate-400 rounded-2xl flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="text-yellow-400 text-xl font-bold text-center mb-2">
          Dr. María González
        </h1>

        {/* Title */}
        <p className="text-blue-400 text-sm font-semibold text-center mb-8 uppercase tracking-wide">
          Director Departamento Académico
        </p>

        {/* Contact Info */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center text-white">
            <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
            <span className="text-sm">maria.gonzalez@universidad.edu</span>
          </div>
          
          <div className="flex items-center text-white">
            <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
            <span className="text-sm">+51 987 654 321</span>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-slate-900 font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Ver Hoja de Vida</span>
          </button>
        </div>
      </div>
  );
}

export default ProfesionalCard