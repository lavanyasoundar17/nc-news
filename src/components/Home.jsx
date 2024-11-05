import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/Home.css';
import axios from 'axios';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [sortOption, setSortOption] = useState("created_at"); 
    const [order, setOrder] = useState("desc");
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL : 'https://nc-news-rhi4.onrender.com'
    })

    const fetchArticles = async (sort_by, order) => {
        setLoading(true); 
        try {
            const response = await api.get(`/api/articles?sort_by=${sort_by}&order=${order}`);
            setArticles(response.data.articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(sortOption, order);
    }, []); 

    useEffect(() => {
        fetchArticles(sortOption, order);
    }, [sortOption, order]);  

    return (
        <div className="welcome_text">
            <h2>Welcome to NC news!</h2>
            <div>
                <label>Sort by: </label>
                <select onChange={(e) => {
                    const [sortBy, order] = e.target.value.split('|'); 
                    setSortOption(sortBy);
                    setOrder(order);
                }}>
                    <option value="created_at|desc">Date (Newest)</option>
                    <option value="created_at|asc">Date (Oldest)</option>
                    <option value="title|asc">Title (A-Z)</option>
                    <option value="title|desc">Title (Z-A)</option>
                    <option value="author|asc">Author (A-Z)</option>
                    <option value="author|desc">Author (Z-A)</option>
                </select>
            </div>
            <ul className="articles_list">
                {articles.map((article) => (
                    <div key={article.article_id} className="article_container">
                        <h3>
                            <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                        </h3>
                        <img src={article.article_img_url} alt={article.title} />
                        <p>By {article.author}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Home;
