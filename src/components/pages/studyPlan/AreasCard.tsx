import IconComponent from "@/components/shared/IconComponent";

type IconName = 'book' | 'code' | 'settings' | 'cloud' | 'radio' | 'scale';

export interface AcademicArea {
  id: number;
  title: string;
  icon: IconName;
  subjects: string[];
  color: string;
  borderColor: string;
}

interface AcademicCardProps {
  area: AcademicArea;
}

export default function AreasCard({ area }: AcademicCardProps) {
  return (
    <div className={`${area.color} rounded-xl p-6 text-white relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
     
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-400 p-3 rounded-lg">
          <IconComponent 
            iconName={area.icon} 
            className="w-8 h-8 text-blue-900" 
          />
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-center mb-6 leading-tight">
        {area.title}
      </h3>
      
      <div className={`border-2 ${area.borderColor} border-dashed rounded-lg p-4 bg-blue-800/30`}>
        <ul className="space-y-2">
          {area.subjects.map((subject: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-400 mr-2 text-sm">•</span>
              <span className="text-sm leading-relaxed">{subject}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="absolute top-0 right-0 w-20 h-20 bg-blue-800/20 rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-800/20 rounded-full translate-y-8 -translate-x-8"></div>
    </div>
  );
}
