import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/Home.css';
import axios from 'axios';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [sortOption, setSortOption] = useState("created_at"); 
    const [order, setOrder] = useState("desc");
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(""); 

    const api = axios.create({
        baseURL : 'https://nc-news-rhi4.onrender.com'
    })

    const fetchTopics = async () => {
        try {
            const response = await api.get("/api/topics");
            setTopics(response.data.topics || []);
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    };

    const fetchArticles = async (sort_by, order, topic = "") => {
        setLoading(true); 
        try {
            const params = {
                sort_by,
                order,
                topic: topic || undefined
             };
            const response = await api.get('/api/articles', { params });
            console.log("Articles fetched:", response.data.articles);
            setArticles(response.data.articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(sortOption, order, selectedTopic); 
    }, [sortOption, order, selectedTopic]); 

    useEffect(() => {
        fetchTopics(); 
    }, []);

    if (loading) return <p>Loading articles...</p>;

    return (
        <div className="welcome_text">
    <h2>Welcome to NC News!</h2>

    <div className="dropdown-container">
        <div className="sort-dropdown">
        <label>Sort by: </label>
            <select onChange={(e) => {
                const [sortBy, order] = e.target.value.split('|'); 
                setSortOption(sortBy);
                setOrder(order);
            }} value={`${sortOption}|${order}`}>
                <option value="created_at|desc">Date (Newest)</option>
                <option value="created_at|asc">Date (Oldest)</option>
                <option value="title|asc">Title (A-Z)</option>
                <option value="title|desc">Title (Z-A)</option>
                <option value="author|asc">Author (A-Z)</option>
                <option value="author|desc">Author (Z-A)</option>
            </select>
        </div>

        <div className="topic-dropdown">
            <label>Select Topic: </label>
             
            <select onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
                
                {topics.map((topic) => (
                    <option key={topic.slug} value={topic.slug}>
                        {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    </div>

    <ul className="articles_list">
        {articles.length > 0 ? (
            articles.map((article) => (
                <div key={article.article_id} className="article_container">
                    <h3>
                        <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                    </h3>
                    <img src={article.article_img_url} alt={article.title} />
                    <p>By {article.author}</p>
                </div>
            ))
        ) : (
            <p>No articles available for this topic.</p>
        )}
    </ul>
</div>

    );
};

export default Home;
