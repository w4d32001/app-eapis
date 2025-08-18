import React, { useState, useEffect } from "react";
import { formatDate } from "@/lib/formDate";
import type { News } from "@/components/pages/home/NewsSection";
import { getNews } from "@/services/newsService";

interface NewsCardProps {
    news: News;
    onViewDetails: (news: News) => void;
}

interface ModalProps {
    news: News | null;
    isOpen: boolean;
    onClose: () => void;
}

function NewsCard({ news, onViewDetails }: NewsCardProps) {
    return (
        <article className="bg-brand text-tertiary p-4 rounded shadow-2xl grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
            <figure className="flex justify-center sm:justify-center">
                <img
                    src={news.image || "/logo-eapiis.png"}
                    alt=""
                    className="w-full max-w-48 sm:max-w-80 h-40 sm:max-h-50 object-cover rounded"
                />
            </figure>

            <div className="flex flex-col gap-y-3 sm:gap-y-4 sm:col-span-2 font-bold justify-start items-start">
                <h3
                    className="text-white text-lg font-bold w-full px-2 min-w-0"
                    title={news.title}
                >
                    <span className="sm:hidden line-clamp-2 leading-tight">
                        {news.title}
                    </span>
                    <span className="hidden sm:block truncate">
                        {news.title}
                    </span>
                </h3>
                <span className="text-base w-full font-mono">
                    {formatDate(news.date)}
                </span>

                <span
                    className="text-sm leading-tight break-words whitespace-normal sm:text-base first-letter-uppercase line-clamp-4"
                >
                    {news.content}
                </span>

                <div className="w-full mt-2 flex justify-end">
                    <button
                        onClick={() => onViewDetails(news)}
                        className="bg-white text-brand px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                        Ver Detalles ...
                    </button>
                </div>
            </div>
        </article>
    );
}

function NewsModal({ news, isOpen, onClose }: ModalProps) {
    if (!isOpen || !news) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        Detalles de la Noticia
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6">
                    {news.image && (
                        <div className="mb-6">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full max-h-96 object-cover rounded"
                            />
                        </div>
                    )}

                    <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="bg-gray-100 px-3 py-1 rounded">
                            📅 {formatDate(news.date)}
                        </span>
                        <span className="bg-gray-100 px-3 py-1 rounded">
                            📍 {news.location}
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {news.title}
                    </h1>
                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                        {news.content.split("\n").map(
                            (paragraph, index) =>
                                paragraph.trim() && (
                                    <p key={index} className="mb-4">
                                        {paragraph}
                                    </p>
                                )
                        )}
                    </div>
                </div>

                <div className="border-t p-4 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="bg-brand text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors duration-200"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

function News() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchNews = async (page = 1) => {
        try {
            setLoading(true);
            const data = await getNews(page);

            const sortedNews = data.data.sort((a: News, b: News) => {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            });

            setNews(sortedNews);
            setCurrentPage(data.current_page);
            setLastPage(data.last_page);
        } catch (error) {
            console.error("Error al cargar noticias:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleViewDetails = (newsItem: News) => {
        setSelectedNews(newsItem);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNews(null);
    };

    const handlePageChange = (page: number) => {
        fetchNews(page);
    };

    return (
        <div className="p-8 bg-gray-200">
            <div className="container m-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Noticias
                    </h1>
                    <p className="text-gray-600">
                        Mantente informado con las últimas noticias
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
                    </div>
                )}

                {!loading && (
                    <div className="grid gap-6 mb-8">
                        {news.map((newsItem) => (
                            <NewsCard
                                key={newsItem.id}
                                news={newsItem}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                )}

                {!loading && lastPage > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-brand text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>

                        <span className="mx-4 text-gray-600">
                            Página {currentPage} de {lastPage}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === lastPage}
                            className="px-4 py-2 bg-brand text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                )}

                <NewsModal
                    news={selectedNews}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />

                {!loading && news.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">
                            No se encontraron noticias
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default News;
