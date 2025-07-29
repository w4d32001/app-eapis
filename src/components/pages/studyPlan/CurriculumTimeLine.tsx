import React, { useState, useEffect } from 'react';

// Tipos TypeScript
interface Semester {
  id: number;
  name: string;
  number: number;
  image: string;
  public_id: string;
  description: string;
  is_active: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: {
    current_page: number;
    data: Semester[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

const CurriculumTimeline: React.FC = () => {
  const [activeSemester, setActiveSemester] = useState<number>(1);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const allSemesters = [
    { id: 1, name: "PRIMER", roman: "I" },
    { id: 2, name: "SEGUNDO", roman: "II" },
    { id: 3, name: "TERCER", roman: "III" },
    { id: 4, name: "CUARTO", roman: "IV" },
    { id: 5, name: "QUINTO", roman: "V" },
    { id: 6, name: "SEXTO", roman: "VI" },
    { id: 7, name: "SÉPTIMO", roman: "VII" },
    { id: 8, name: "OCTAVO", roman: "VIII" },
    { id: 9, name: "NOVENO", roman: "IX" },
    { id: 10, name: "DÉCIMO", roman: "X" },
    { id: 11, name: "CURSOS ELECTIVOS", roman: "" }
  ];

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/semesters', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      setSemesters(data.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los semestres');
      console.error('Error fetching semesters:', err);

      setSemesters([
        {
          id: 1,
          name: "Primer Semestre",
          number: 1,
          image: "https://res.cloudinary.com/dqyxcnusl/image/upload/v1753768066/semesters/phpIvxnfx_bqjk51.png",
          public_id: "semesters/phpIvxnfx_bqjk51",
          description: "Semestre de introducción a la carrera",
          is_active: 1,
          created_by: 1,
          updated_by: 1,
          created_at: "2025-07-29T05:43:04.000000Z",
          updated_at: "2025-07-29T05:47:47.000000Z"
        },
        {
          id: 2,
          name: "Segundo Semestre",
          number: 2,
          image: "https://res.cloudinary.com/dqyxcnusl/image/upload/v1753768291/semesters/phpsMfchg_xlwljs.png",
          public_id: "semesters/phpsMfchg_xlwljs",
          description: "Continuación y profundización de conocimientos",
          is_active: 1,
          created_by: 1,
          updated_by: 1,
          created_at: "2025-07-29T05:51:31.000000Z",
          updated_at: "2025-07-29T05:51:31.000000Z"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const currentSemesterData = semesters.find(sem => sem.number === activeSemester);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-400 transform -translate-y-1/2"></div>
            
            <div className="flex justify-between items-center relative">
              {allSemesters.map((semester) => {
                const hasData = semesters.some(s => s.number === semester.id);
                return (
                  <div key={semester.id} className="flex flex-col items-center">
                    <button
                      onClick={() => setActiveSemester(semester.id)}
                      disabled={!hasData && semester.id !== 11} 
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 mb-2 ${
                        activeSemester === semester.id
                          ? 'bg-yellow-400 border-yellow-400'
                          : hasData || semester.id === 11
                          ? 'bg-slate-600 border-slate-400 hover:bg-slate-500 cursor-pointer'
                          : 'bg-slate-800 border-slate-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <span className="sr-only">{semester.name}</span>
                    </button>
                    
                    <div className="text-center text-white text-xs">
                      <div className="font-bold">{semester.roman}</div>
                      <div className="text-[10px] leading-tight max-w-16">
                        {semester.name} SEMESTRE
                      </div>
                      {hasData && (
                        <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-slate-100 rounded-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Cargando semestres...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 rounded-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Error de Conexión</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <p className="text-sm text-red-400 mb-4">Mostrando datos de ejemplo mientras tanto</p>
            <button 
              onClick={fetchSemesters}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : null}

        {currentSemesterData ? (
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            
            <div className="p-6">
              <div className="relative">
                <img 
                  src={currentSemesterData.image} 
                  alt={currentSemesterData.name}
                  className="w-full h-auto rounded-lg shadow-lg max-h-160 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMzg0IDE4MEgzNjRWMjAwSDM4NFYxODBaTTQyNCAxODBINDA0VjIwMEg0MjRWMTgwWiIgZmlsbD0iIzlDQTNBRiIvPjx0ZXh0IHg9IjQwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE2Ij5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
                
                {currentSemesterData.is_active === 1 && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Activo
                  </div>
                )}
              </div>

              
            </div>
          </div>
        ) : activeSemester === 11 ? (
          <div className="bg-slate-100 rounded-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-600 mb-4">Cursos Electivos</h3>
            <p className="text-slate-500">Los cursos electivos estarán disponibles próximamente.</p>
          </div>
        ) : (
          <div className="bg-slate-100 rounded-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-slate-600 mb-4">Semestre no disponible</h3>
            <p className="text-slate-500">Los datos para este semestre aún no están disponibles.</p>
            <div className="mt-4 text-sm text-slate-400">
              <p>Semestres disponibles: {semesters.map(s => `${s.number}° (${s.name})`).join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumTimeline;