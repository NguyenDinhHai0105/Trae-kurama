import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { getSampleArticles, parseRSSFeed, Article } from '../lib/rss-parser';

interface HomeProps {
  onBackToLanding: () => void;
  initialFeedUrl?: string | undefined;
}

export default function Home({ onBackToLanding, initialFeedUrl }: HomeProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [rssUrl, setRssUrl] = useState('');
  const [isCustomFeed, setIsCustomFeed] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (initialFeedUrl) {
        setLoading(true);
        try {
          const feedArticles = await parseRSSFeed(initialFeedUrl);
          setArticles(feedArticles);
          setIsCustomFeed(true);
          setRssUrl(initialFeedUrl);
        } catch (e) {
          const sampleArticles = getSampleArticles();
          setArticles(sampleArticles);
          setIsCustomFeed(false);
        } finally {
          setLoading(false);
        }
      } else {
        const sampleArticles = getSampleArticles();
        setArticles(sampleArticles);
        setIsCustomFeed(false);
        setLoading(false);
      }
    };
    load();
  }, [initialFeedUrl]);

  const handleLoadCustomFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rssUrl.trim()) return;

    setLoading(true);
    try {
      const feedArticles = await parseRSSFeed(rssUrl);
      setArticles(feedArticles);
      setIsCustomFeed(true);
    } catch (error) {
      console.error('Failed to load RSS feed:', error);
      alert('Failed to load RSS feed. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSampleData = () => {
    setLoading(true);
    setTimeout(() => {
      const sampleArticles = getSampleArticles();
      setArticles(sampleArticles);
      setIsCustomFeed(false);
      setRssUrl('');
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToLanding}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Back to landing page"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">RSS Feed Reader</h1>
                <p className="text-gray-600 mt-1">Stay updated with the latest articles</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <form onSubmit={handleLoadCustomFeed} className="flex gap-2">
                <input
                  type="url"
                  value={rssUrl}
                  onChange={(e) => setRssUrl(e.target.value)}
                  placeholder="Enter RSS feed URL..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-w-64"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Load Feed
                </button>
              </form>
              
              <button
                onClick={handleLoadSampleData}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Load Sample Data
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">
              {isCustomFeed 
                ? "No articles could be loaded from the provided RSS feed. Please check the URL and try again."
                : "Enter an RSS feed URL above to load articles, or click 'Load Sample Data' to see a demo."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard
                key={`${article.link}-${index}`}
                title={article.title}
                description={article.description}
                category={article.category}
                date={article.date}
                imageUrl={article.imageUrl}
                link={article.link}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>RSS Feed Reader - Built with React & TypeScript</p>
            {isCustomFeed && (
              <p className="text-sm mt-2">
                Currently showing articles from: <span className="font-medium">{rssUrl}</span>
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}