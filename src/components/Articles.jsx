import '../styles/ArticleCard.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Article_Card from './Article_Card';
import Comments from './Comments';

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [triggerFetchComments, setTriggerFetchComments] = useState(false);

    const api = axios.create({
        baseURL: 'https://nc-news-rhi4.onrender.com'
    });

    // Fetch article
    const fetchArticle = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/articles/${article_id}`);
            setArticle(response.data.article);
        } catch (error) {
            console.error(error.message, "Fetching Err");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [article_id]);

    if (loading) return <div>Loading...</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div className='article-container'>
            <Article_Card article={article} />
            <Comments article_id={article_id} triggerFetchComments={triggerFetchComments} setTriggerFetchComments={setTriggerFetchComments} />
        </div>
    );
};

export default Article;
