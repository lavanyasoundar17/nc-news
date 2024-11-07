import {useState,useEffect} from 'react'
import axios  from 'axios';

const Article_Card = ({ article }) => {
    const [votes, setVotes] =useState(article.votes);
    const [hasVoted, setHasVoted] = useState(false);
    const[error, setError] = useState(null);

    useEffect(() => {
        const votedArticles = JSON.parse(localStorage.getItem('votedArticles')) || [];
        if (votedArticles.includes(article.article_id)) {
            setHasVoted(true); 
        }
    }, [article.article_id]);

    const handleVote = async () => {
        if (hasVoted) return;  

        setVotes(votes + 1);  
        try {
            await axios.patch(`https://nc-news-rhi4.onrender.com/api/articles/${article.article_id}`, { inc_votes: 1 });

            const votedArticles = JSON.parse(localStorage.getItem('votedArticles')) || [];
            votedArticles.push(article.article_id);
            localStorage.setItem('votedArticles', JSON.stringify(votedArticles));

            setHasVoted(true);  
        } catch (err) {
            setError('Failed to update vote. Please try again.');
        }
    };

    return (
        <div className="article-details">
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt={article.title} />
            <p>{article.body}</p>
            <p>By {article.author}</p>
            <p>Published on {new Date(article.created_at).toLocaleString()}</p>
            <p className="article-votes">Votes: {votes}</p>
            <button onClick={handleVote} disabled={hasVoted}>
                {hasVoted ? "Voted" : "Vote"}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Article_Card;
