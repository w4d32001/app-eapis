import { getGalleries } from "@/services/getGalleries";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Gallery {
    id: number;
    type: string;
    image: string;
}

export default function GallerySection() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [filtered, setFiltered] = useState<Gallery[]>([]);
    const [selectedType, setSelectedType] = useState<string>("todos");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>(
        {}
    );

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            if (e.key === "Escape") {
                setIsModalOpen(false);
            } else if (e.key === "ArrowLeft") {
                goToPrevious();
            } else if (e.key === "ArrowRight") {
                goToNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen, currentImageIndex, filtered]);

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

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === filtered.length - 1 ? 0 : prev + 1
        );
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? filtered.length - 1 : prev - 1
        );
    };

    const handleImageLoad = (id: number) => {
        setImageLoaded((prev) => ({ ...prev, [id]: true }));
    };


    console.log(filtered);
    return (
        <>
            <section className="p-8 flex flex-col gap-y-10 bg-gallery">
                <h2 className="font-bold text-2xl text-center uppercase text-tertiary">
                    Nuestra Galería
                </h2>

                <nav className="flex items-center w-full">
                    <ul className="flex items-center justify-center w-full gap-x-10 text-white text-lg flex-wrap">
                        {categories.map((cat) => (
                            <li
                                key={cat}
                                onClick={() => handleFilter(cat)}
                                className={`cursor-pointer pb-1 transition-all whitespace-nowrap ${
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

                <div
                    className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6"
                    style={{ columnFill: "balance" }}
                >
                    {filtered.map((item, index) => (
                        <div
                            key={item.id}
                            className="break-inside-avoid mb-6 group cursor-pointer"
                            onClick={() => openModal(index)}
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                                {!imageLoaded[item.id] && (
                                    <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg flex items-center justify-center">
                                        <div className="text-gray-500">
                                            Cargando...
                                        </div>
                                    </div>
                                )}
                                <img
                                    src={item.image}
                                    alt={item.type}
                                    className={`w-full object-cover rounded-lg transition-opacity duration-300 ${
                                        imageLoaded[item.id]
                                            ? "opacity-00"
                                            : "opacity-00"
                                    }`}
                                    onLoad={() => handleImageLoad(item.id)}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/60 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-lg">
                                        Ver imagen
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center">
                    <button className="bg-white py-2 px-8 text-lg cursor-pointer rounded-2xl text-primary hover:text-white hover:bg-primary hover:border hover:border-white transition-all">
                        Ver más
                    </button>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    onClick={closeModal} 
                >
                    <div
                        className="relative max-h-full w-full h-full flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2 rounded-full cursor-pointer bg-red-600 bg-opacity-50 hover:bg-opacity-70"
                        >
                            <X size={24} />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-2 bg-sky-900 rounded-full bg-opacity-50 hover:bg-opacity-70 cursor-pointer"
                            disabled={filtered.length <= 1}
                        >
                            <ChevronLeft size={32} />
                        </button>

                        <div
                            className="relative max-w-full max-h-full flex items-center justify-center"
                            onClick={closeModal} 
                        >
                            <img
                                src={filtered[currentImageIndex]?.image}
                                alt={filtered[currentImageIndex]?.type}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-pointer"
                                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeModal(); 
                                }}
                            />

                            <div
                                className="absolute bottom-4 left-4 bg-gray-500/50 text-white px-2 rounded-lg"
                                onClick={(e) => e.stopPropagation()} // Evita cierre al hacer clic en la info
                            >
                                <p className="font-semibold capitalize">
                                    {filtered[currentImageIndex]?.type}
                                </p>
                                <p className="text-sm opacity-75">
                                    {currentImageIndex + 1} de {filtered.length}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors p-2 bg-sky-900 rounded-full bg-opacity-50 hover:bg-opacity-70 cursor-pointer"
                            disabled={filtered.length <= 1}
                        >
                            <ChevronRight size={32} />
                        </button>

                        {filtered.length > 1 && (
                            <div
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
                                onClick={(e) => e.stopPropagation()} 
                            >
                                {filtered.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(index);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            index === currentImageIndex
                                                ? "bg-white scale-125"
                                                : "bg-white bg-opacity-50 hover:bg-opacity-75"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}


