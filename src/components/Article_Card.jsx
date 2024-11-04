import '../styles/ArticleCard.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api/articles/${article_id}`);
                if (!response.ok) throw new Error('Failed to fetch article');
                const data = await response.json();
                setArticle(data.article);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
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
