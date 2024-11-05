import '../styles/ArticleCard.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const api = axios.create({
        baseURL : 'https://nc-news-rhi4.onrender.com'
    })

    const fetchArticle = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/articles/${article_id}`);            
            setArticle(response.data.article);
            
        } catch (error) {
            console.error(error.message,"Fetching Err");
        }finally{
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
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt={article.title} />
            <p>{article.body}</p>
            <p>By {article.author}</p>
            <p>Published on {new Date(article.created_at).toLocaleString()}</p>
            <p className="article-votes">Votes: {article.votes}</p>
        </div>
    );
}

export default Article;
