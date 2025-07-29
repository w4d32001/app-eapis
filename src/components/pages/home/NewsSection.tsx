import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { formatDate } from '@/lib/formDate';
import { getNews } from '@/services/newsService';

interface News {
  id: number;
  title: string;
  date: string;
  location: string;
  content: string;
  image?: string;
}

function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getNews(page);
      setNews(data.data);              // artículos
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) fetchNews(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) fetchNews(currentPage - 1);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p className="text-center py-10">Cargando noticias...</p>;
  if (!news.length) return <p className="text-center py-10">No hay noticias disponibles.</p>;

  return (
    <section className="bg-white min-h-svh pt-20">
      <h2 className="uppercase text-center text-primary font-bold text-2xl mb-8">
        Últimas noticias
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Artículo principal (el primero de la lista) */}
        {news[0] && (
          <article className="md:col-span-2 flex justify-center flex-col items-center p-4">
            <img
              src={news[0].image || '/fondo.png'}
              alt={news[0].title}
              className="w-full h-[calc(100svh-20rem)] m-auto object-cover"
            />
            <div className="bg-primary text-white h-50 p-4 rounded-b w-full flex flex-col gap-y-4">
              <h2 className="text-2xl font-bold">{news[0].title}</h2>
              <div className="flex w-full justify-between items-center text-tertiary font-bold">
                <span>{formatDate(news[0].date)}</span>
                <span>{news[0].location}</span>
              </div>
              <p>{news[0].content}</p>
            </div>
          </article>
        )}

        <div id="news-container" className="flex flex-col gap-y-4 p-4">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              date={item.date}
              ubication={item.location}
              image={item.image}
            />
          ))}

          {/* Paginación */}
          {lastPage > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>

              <span id="page-indicator" className="text-sm text-gray-600">
                Página {currentPage} de {lastPage}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === lastPage}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
