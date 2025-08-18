import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import { formatDate } from '@/lib/formDate';
import { getNews } from '@/services/newsService';
import { ChevronDown, ChevronUp, X, Eye } from 'lucide-react';

export interface News {
  id: number;
  title: string;
  date: string;
  location: string;
  content: string;
  image?: string;
}

function NewsSection() {
  const navigate = useNavigate();
  const [news, setNews] = useState<News[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>('');

  const MAX_NEWS_DISPLAY = 4;

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getNews(page);
      
      const sortedNews = data.data.sort((a: News, b: News) => {
        return  new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      
      setNews(sortedNews);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
      
      if (!selectedNews || page === 1) {
        setSelectedNews(sortedNews[0] || null);
        setIsContentExpanded(false); 
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
    setIsContentExpanded(false); 
  };

  const handleImageClick = () => {
    if (selectedNews?.image) {
      setModalImage(selectedNews.image);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const handleViewAllNews = () => {
    navigate('/news');
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

  const displayedNews = news.slice(0, MAX_NEWS_DISPLAY);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (loading) return <p className="text-center py-10">Cargando noticias...</p>;
  if (!news.length) return <p className="text-center py-10">No hay noticias disponibles.</p>;

  return (
    <section className="bg-white min-h-svh py-10 relative">
      <h2 className="uppercase text-center text-primary font-bold text-2xl mb-8">
        Últimas noticias
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto px-4">
        {selectedNews && (
          <article className="lg:col-span-2 flex justify-center flex-col items-center">
            <div className="w-full max-h-[60vh] overflow-hidden rounded-t-lg relative group">
              <img
                src={selectedNews.image || '/fondo.png'}
                alt={selectedNews.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                onClick={handleImageClick}
              />
              {selectedNews.image && (
                <div 
                  className="absolute inset-0 bg-black/60 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                </div>
              )}
            </div>
            <div className="bg-primary text-white p-4 rounded-b-lg w-full flex flex-col gap-y-4">
              <h2 className="text-xl lg:text-2xl font-bold line-clamp-2">
                {selectedNews.title}
              </h2>
              <div className="flex w-full justify-between items-center text-tertiary font-bold text-sm">
                <span className='font-mono'>{formatDate(selectedNews.date)}</span>
                <span>{selectedNews.location}</span>
              </div>
              
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
                
                {!isContentExpanded && shouldShowExpandButton(selectedNews.content) && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
                )}
                
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

        <div className="flex flex-col gap-y-4 p-4 max-h-[80vh] overflow-y-auto">
          <div id="news-container" className="flex flex-col gap-y-4">
            {displayedNews.map((item) => (
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
          </div>

          {news.length > MAX_NEWS_DISPLAY && (
            <button
              onClick={handleViewAllNews}
              className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2"
            >
              Ver todas las noticias
              <ChevronDown className="h-4 w-4" />
            </button>
          )}

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

      {isModalOpen && modalImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 bg-opacity-90 p-4"
          onClick={handleCloseModal}
          style={{ position: 'fixed' }}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseModal();
              }}
              className="absolute top-4 right-4 z-[10000] p-2 bg-black bg-opacity-70 text-white rounded-full hover:bg-opacity-90 transition-colors duration-200 cursor-pointer"
              title="Cerrar imagen"
            >
              <X className="h-6 w-6" />
            </button>
            
            <img
              src={modalImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-70 px-4 py-2 rounded-lg">
            Presiona ESC o haz clic fuera para cerrar
          </div>
        </div>
      )}
    </section>
  );
}

export default NewsSection;

