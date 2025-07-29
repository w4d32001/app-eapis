import { BookOpen, Code, Settings, Cloud, Radio, Scale } from "lucide-react";

type IconName = "book" | "code" | "settings" | "cloud" | "radio" | "scale";

interface IconComponentProps {
    iconName: IconName;
    className?: string;
}
const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
    book: BookOpen,
    code: Code,
    settings: Settings,
    cloud: Cloud,
    radio: Radio,
    scale: Scale,
};

const IconComponent: React.FC<IconComponentProps> = ({
    iconName,
    className = "",
}) => {
    const Icon = iconMap[iconName];
    return <Icon className={className} />;
};

export default IconComponent;
