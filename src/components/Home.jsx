import { useState, useEffect } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import '../styles/Home.css';
import axios from 'axios';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const initialSortOption = searchParams.get("sort_by") || "created_at";
    const initialOrder = searchParams.get("order") || "desc";
    const initialTopic = searchParams.get("topic") || "";

    const [sortOption, setSortOption] = useState(initialSortOption);
    const [order, setOrder] = useState(initialOrder);

    const api = axios.create({
        baseURL : 'https://nc-news-rhi4.onrender.com'
    });

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
            setArticles(response.data.articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSearchParams({
            sort_by: sortOption,
            order: order,
            topic: selectedTopic || ""
        });
        fetchArticles(sortOption, order, selectedTopic);
    }, [sortOption, order, selectedTopic]);

    useEffect(() => {
        fetchTopics(); 
    }, []);

    return (
        <div className='home-container'>
            <div className="dropdown-container">
                <div className="sort-dropdown">
                    <label>Sort by: </label>
                    <select 
                        onChange={(e) => {
                            const [sortBy, sortOrder] = e.target.value.split('|');
                            setSortOption(sortBy);
                            setOrder(sortOrder);
                        }} 
                        value={`${sortOption}|${order}`}
                    >
                        <option value="created_at|desc">Date (Newest)</option>
                        <option value="created_at|asc">Date (Oldest)</option>
                        <option value="comment_count|desc">Comment Count (High to Low)</option>
                        <option value="comment_count|asc">Comment Count (Low to High)</option>
                        <option value="votes|desc">Votes (High to Low)</option>
                        <option value="votes|asc">Votes (Low to High)</option>
                    </select>
                </div>

                <div className="topic-dropdown">
                    <label>Select Topic: </label>
                    <select onChange={(e) => setSelectedTopic(e.target.value)} value={selectedTopic}>
                        <option value="">All Topics</option>
                        {topics.map((topic) => (
                            <option key={topic.slug} value={topic.slug}>
                                {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
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
            )}
        </div>
    );
};

export default Home;
