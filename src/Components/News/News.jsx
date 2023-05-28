import React, { useEffect, useState } from "react";
import "./News.css";
import Navbar from "../Navbar/Navbar";
const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?sources=ynet&apiKey=51a1f1de53944e58be88f2d96e98efa6"
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="news-container">
      <Navbar />
      <h1 className="news-title">חדשות מעודכנות</h1>
      <div className="wrapper">
        <ul className="news-list">
          {articles.map((article, index) => (
            <li key={index} className="news-item">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                לכתבה
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;
