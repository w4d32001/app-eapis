interface CourseCardProps {
    title: string;
}

function CourseCard({ title }: CourseCardProps) {
    return (
        <div className="bg-blue-100 text-bold z-10 flex items-center justify-center text-brand rounded lg px-8 py-4 text-center text-xl font-semibold font-rubik shadow-2xl">
            {title}
        </div>
    );
}

export default CourseCard;
