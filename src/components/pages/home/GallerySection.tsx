import { getGalleries } from "@/services/getGalleries";
import { useEffect, useState } from "react";

interface Gallery {
    id: number;
    type: string;
    image: string;
}

export default function GallerySection() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [filtered, setFiltered] = useState<Gallery[]>([]);
    const [selectedType, setSelectedType] = useState<string>("todos");

    const categories = [
        "todos",
        "laboratorios",
        "eventos",
        "alumnos",
        "vida universitaria",
    ];

    useEffect(() => {
        fetchGalleries();
    }, []);

    const fetchGalleries = async () => {
        try {
            const data = await getGalleries();
            setGalleries(data.data);
            setFiltered(data.data);
        } catch (error) {
            console.error("Error al cargar galería:", error);
        }
    };

    const handleFilter = (type: string) => {
        setSelectedType(type);
        if (type === "todos") {
            setFiltered(galleries);
        } else {
            setFiltered(
                galleries.filter(
                    (item) => item.type.toLowerCase() === type.toLowerCase()
                )
            );
        }
    };

    return (
        <section className="p-8 flex flex-col gap-y-10 bg-gallery">
            <h2 className="font-bold text-2xl text-center uppercase text-tertiary">
                Nuestra Galería
            </h2>

            <nav className="flex items-center w-full">
                <ul className="flex items-center justify-center w-full gap-x-10 text-white text-lg">
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            onClick={() => handleFilter(cat)}
                            className={`cursor-pointer pb-1 transition-all ${
                                selectedType === cat
                                    ? "border-b-2 border-[#F0CE5D] text-white font-bold"
                                    : "hover:border-b hover:border-gray-300"
                            }`}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="grid grid-cols-3 gap-8 p-8">
                {filtered.map((item) => (
                    <img
                        key={item.id}
                        src={item.image}
                        alt={item.type}
                        className="w-full object-cover rounded shadow-2xl shadow-black"
                    />
                ))}
            </div>

            {/* Botón Ver más (si quieres paginación futura) */}
            <div className="flex items-center justify-center">
                <button className="bg-white py-2 px-8 text-lg cursor-pointer rounded-2xl text-primary hover:text-white hover:bg-primary hover:border hover:border-white transition-all">
                    Ver más
                </button>
            </div>
        </section>
    );
}
