import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import { formatDate } from '@/lib/formDate';
import { getNews } from '@/services/newsService';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getNews(page);
      setNews(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
      
      if (!selectedNews || page === 1) {
        setSelectedNews(data.data[0] || null);
        setIsContentExpanded(false); // Resetear el estado de expansión
      }
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

  const handleNewsClick = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsContentExpanded(false); // Resetear expansión al cambiar de noticia
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const toggleContentExpansion = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  const shouldShowExpandButton = (content: string, maxLength: number = 300) => {
    return content && content.length > maxLength;
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p className="text-center py-10">Cargando noticias...</p>;
  if (!news.length) return <p className="text-center py-10">No hay noticias disponibles.</p>;

  return (
    <section className="bg-white min-h-svh py-10">
      <h2 className="uppercase text-center text-primary font-bold text-2xl mb-8">
        Últimas noticias
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto px-4">
        {selectedNews && (
          <article className="lg:col-span-2 flex justify-center flex-col items-center">
            <div className="w-full max-h-[60vh] overflow-hidden rounded-t-lg">
              <img
                src={selectedNews.image || '/fondo.png'}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-primary text-white p-4 rounded-b-lg w-full flex flex-col gap-y-4">
              <h2 className="text-xl lg:text-2xl font-bold line-clamp-2">
                {selectedNews.title}
              </h2>
              <div className="flex w-full justify-between items-center text-tertiary font-bold text-sm">
                <span>{formatDate(selectedNews.date)}</span>
                <span>{selectedNews.location}</span>
              </div>
              
              {/* Contenido expandible */}
              <div className="relative">
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isContentExpanded 
                      ? 'max-h-none' 
                      : 'max-h-32 overflow-hidden'
                  }`}
                >
                  <p className="text-sm lg:text-base leading-relaxed whitespace-pre-line">
                    {isContentExpanded 
                      ? selectedNews.content 
                      : truncateText(selectedNews.content, 300)
                    }
                  </p>
                </div>
                
                {/* Gradient overlay cuando está colapsado */}
                {!isContentExpanded && shouldShowExpandButton(selectedNews.content) && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
                )}
                
                {/* Botón Ver más/Ver menos */}
                {shouldShowExpandButton(selectedNews.content) && (
                  <button
                    onClick={toggleContentExpansion}
                    className="mt-3 flex items-center gap-1 text-tertiary hover:text-white transition-colors duration-200 text-sm font-medium"
                  >
                    {isContentExpanded ? (
                      <>
                        <span>Ver menos</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Ver más</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
                
                {/* Alternativa: Click en el texto para expandir */}
                {!isContentExpanded && shouldShowExpandButton(selectedNews.content) && (
                  <div 
                    onClick={toggleContentExpansion}
                    className="absolute inset-0 cursor-pointer"
                    title="Haz clic para ver el contenido completo"
                  />
                )}
              </div>
            </div>
          </article>
        )}

        <div id="news-container" className="flex flex-col gap-y-4 p-4 max-h-[80vh] overflow-y-auto">
          {news.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleNewsClick(item)}
              className={`cursor-pointer transform hover:scale-105 transition-all duration-200 ${
                selectedNews?.id === item.id 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : ''
              }`}
            >
              <NewsCard
                title={item.title}
                date={item.date}
                ubication={item.location}
                image={item.image}
              />
            </div>
          ))}

          {lastPage > 1 && (
            <div className="flex items-center justify-center gap-4 mt-4 sticky bottom-0 bg-white py-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Anterior
              </button>

              <span id="page-indicator" className="text-xs text-gray-600">
                Página {currentPage} de {lastPage}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === lastPage}
                className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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