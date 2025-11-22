export interface Article {
  title: string;
  description: string;
  link: string;
  date: Date;
  category: string;
  imageUrl?: string;
}

export const parseRSSFeed = async (feedUrl: string): Promise<Article[]> => {
  try {
    // Use a proxy service to avoid CORS issues in the browser
    const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }
    
    return data.items.map((item: any) => {
      // Extract category from various possible fields
      const category = item.categories?.[0] || 
                      item.category || 
                      'GENERAL';
      
      // Extract image URL from various possible fields
      let imageUrl: string | undefined;
      
      // Check enclosure for image
      if (item.enclosure && item.enclosure.link) {
        imageUrl = item.enclosure.link;
      }
      
      // Check for media content
      if (item['media:content']) {
        const mediaContent = item['media:content'];
        if (Array.isArray(mediaContent)) {
          imageUrl = mediaContent[0].url || mediaContent[0].$.url;
        } else if (mediaContent.url) {
          imageUrl = mediaContent.url;
        } else if (mediaContent.$?.url) {
          imageUrl = mediaContent.$.url;
        }
      }
      
      // Check for media thumbnail
      if (item['media:thumbnail']) {
        const mediaThumbnail = item['media:thumbnail'];
        if (Array.isArray(mediaThumbnail)) {
          imageUrl = mediaThumbnail[0].url || mediaThumbnail[0].$.url;
        } else if (mediaThumbnail.url) {
          imageUrl = mediaThumbnail.url;
        } else if (mediaThumbnail.$?.url) {
          imageUrl = mediaThumbnail.$.url;
        }
      }
      
      // Extract from description if it contains an image
      if (!imageUrl && item.description) {
        const imgMatch = item.description.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          imageUrl = imgMatch[1];
        }
      }
      
      return {
        title: item.title || 'Untitled',
        description: item.description || item.content || item.summary || '',
        link: item.link || '',
        date: item.pubDate ? new Date(item.pubDate) : new Date(),
        category: typeof category === 'string' ? category.toUpperCase() : 'GENERAL',
        imageUrl
      };
    });
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
};

// Sample data for demonstration
export const getSampleArticles = (): Article[] => {
  return [
    {
      title: "Find out what's new in the Gemini app in November's Gemini Drop.",
      description: "Discover the latest features and improvements in the Gemini app this November.",
      link: "https://example.com/gemini-drop",
      date: new Date('2024-11-21'),
      category: "GEMINI APP",
      imageUrl: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Gemini+Drops+text+logo+with+sparkles+on+dark+background&image_size=square"
    },
    {
      title: "48 tips and prompts for holiday planning, travel and more",
      description: "Get ready for the holidays with these helpful tips and AI prompts for planning and travel.",
      link: "https://example.com/holiday-tips",
      date: new Date('2024-11-21'),
      category: "GEMINI",
      imageUrl: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Holiday+travel+planning+illustration+with+suitcases+and+calendar&image_size=square"
    },
    {
      title: "16 Google AI tips for stress-free holiday hosting in 2025",
      description: "Make your holiday hosting easier with these AI-powered tips and tricks from Google.",
      link: "https://example.com/ai-holiday-tips",
      date: new Date('2024-11-21'),
      category: "AI",
      imageUrl: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Holiday+food+table+with+traditional+dishes+festive+setting&image_size=square"
    },
    {
      title: "Court testimony highlights the risk and disruption of the DOJ's ad tech proposals",
      description: "Expert analysis of the Department of Justice's ad tech proposals and their potential impact.",
      link: "https://example.com/ad-tech-proposals",
      date: new Date('2024-11-21'),
      category: "PUBLIC POLICY",
      imageUrl: undefined
    },
    {
      title: "4 ways to use AI for easier Black Friday and Cyber Monday shopping",
      description: "Make your holiday shopping smarter with these AI-powered shopping tips and strategies.",
      link: "https://example.com/ai-shopping",
      date: new Date('2024-11-21'),
      category: "SHOPPING",
      imageUrl: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Black+Friday+shopping+collage+with+products+and+discount+tags&image_size=square"
    },
    {
      title: "Develop a deeper understanding with interactive images in Gemini.",
      description: "Learn how interactive images in Gemini can enhance your learning and educational experience.",
      link: "https://example.com/gemini-learning",
      date: new Date('2024-11-20'),
      category: "LEARNING & EDUCATION",
      imageUrl: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Educational+diagram+with+interactive+elements+and+handwritten+notes&image_size=square"
    }
  ];
};