import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Users, Zap, Globe, CheckCircle, Play, Download } from 'lucide-react';
import FoxLogo from './FoxLogo';

interface LandingPageProps {
  onTryDemo: (url?: string) => void;
}

interface Topic {
  id: string;
  url: string;
  title: string;
  backgroundImg?: string;
  lastPolledAt?: string | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onTryDemo }) => {
  const [email, setEmail] = useState('');

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Welcome! We'll notify you at ${email} when we launch.`);
      setEmail('');
    }
  };

  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [topicsError, setTopicsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setTopicsLoading(true);
        setTopicsError(null);
        const res = await fetch('http://localhost:9091/api/v1/feed');
        const json = await res.json();
        if (json && json.statusCode === 200 && Array.isArray(json.data)) {
          if (isMounted) setTopics(json.data);
        } else {
          if (isMounted) setTopicsError('Failed to load topics');
        }
      } catch (e) {
        if (isMounted) setTopicsError('Failed to load topics');
      } finally {
        if (isMounted) setTopicsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const cleanUrl = (url: string | undefined) => {
    if (!url) return undefined;
    return url.replace(/[`'"\s]/g, '').trim();
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech Journalist",
      content: "This RSS reader has completely transformed how I stay updated with industry news. The smart categorization is incredible!"
    },
    {
      name: "Mike Rodriguez",
      role: "Product Manager",
      content: "Finally, an RSS reader that actually understands what I want to read. The interface is clean and intuitive."
    },
    {
      name: "Emily Watson",
      role: "Research Analyst",
      content: "I love how I can aggregate all my news sources in one place. Saves me hours every week."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2" aria-label="NewsFlow home">
                <FoxLogo />
                <span className="text-2xl font-bold text-gray-900">NewsFlow</span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Features</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Testimonials</a>
                <a href="#demo" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">Demo</a>
                <button 
                  onClick={onTryDemo}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Try Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 relative overflow-hidden tech-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stay Informed with
              <span className="text-blue-600"> Intelligent News</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the world's best content with our smart RSS reader. 
              Aggregate, categorize, and enjoy personalized news feeds that matter to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={() => onTryDemo()}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center gap-2 tech-button"
              >
                Try Live Demo
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2 tech-button">
                <Play className="h-5 w-5" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Real-time updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Topics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a topic to explore its latest articles
            </p>
          </div>
          {topicsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 rounded-lg bg-gray-50 animate-pulse">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : topicsError ? (
            <div className="text-center text-red-600">{topicsError}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {topics.map((t) => (
                <div key={t.id} className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors tech-card">
                  <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden bg-white border border-gray-200 mb-4 flex items-center justify-center p-2">
                    {t.backgroundImg ? (
                      <img src={t.backgroundImg} alt={t.title} className="w-full h-full object-contain" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{t.title}</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onTryDemo(cleanUrl(t.url))}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >Open Feed</button>
                    <a
                      href={cleanUrl(t.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View RSS
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">News Sources</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Articles Read</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Users Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our users have to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your News Reading?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have already discovered the future of news consumption
          </p>
          
          <form onSubmit={handleGetStarted} className="max-w-md mx-auto mb-8">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <p className="text-blue-100 text-sm">
            Get early access and be the first to know when we launch
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NewsFlow</h3>
              <p className="text-gray-400">
                The intelligent way to stay informed in the digital age.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#demo" className="hover:text-white">Demo</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NewsFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;