import axios from "axios";
import { useEffect, useState } from "react";

interface NewsArticle {
  urlToImage: string;
  title: string;
  url: string;
  description: string;
}

export const NewsList = (listSize: number) => {
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `${
        import.meta.env.VITE_REACT_NEWS_API_HOST
      }/top-headlines?country=us&category=business&apiKey=${
        import.meta.env.VITE_REACT_NEWS_API_KEY
      }`;
      try {
        // const realResponse = await axios.get<{ articles: NewsArticle[] }>(url);
        console.log(url);

        const response = await axios.get<{ articles: NewsArticle[] }>(url);

        const filteredArticles = response.data.articles.map((article) => ({
          urlToImage: article.urlToImage || "images/placeholder.png",
          title: article.title,
          url: article.url,
          description: filterDescription(article.description),
        }));

        setNewsList(filteredArticles.slice(0, listSize));
      } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
      }
    };

    fetchNews();
  },[]);

  return newsList;
};

const filterDescription = (desc: string | null) => {
  if (!desc) return "Click on the title to learn more";
  const parser = new DOMParser();
  const parsed = parser.parseFromString(desc, "text/html");
  return parsed.body.textContent || "Click on the title to learn more";
};
