import React from 'react';
import { format } from 'date-fns';

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  date: Date;
  imageUrl?: string;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  category,
  date,
  imageUrl,
  link
}) => {
  const formattedDate = format(date, 'MMM dd').toUpperCase();

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex gap-4 tech-card">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>{formattedDate}</span>
          <span>·</span>
          <a 
            href="#" 
            className="text-blue-600 hover:text-blue-800 font-medium uppercase tracking-wide"
            onClick={(e) => e.preventDefault()}
          >
            {category}
          </a>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </a>
        </h3>
        
        {description && (
          <p className="text-gray-700 text-sm line-clamp-3">
            {description}
          </p>
        )}
      </div>
      
      {imageUrl && (
        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center p-1">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-contain"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </article>
  );
};

export default ArticleCard;