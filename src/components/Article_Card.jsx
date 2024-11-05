import React from 'react';

const Article_Card = ({ article }) => {
    return (
        <div className="article-details">
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt={article.title} />
            <p>{article.body}</p>
            <p>By {article.author}</p>
            <p>Published on {new Date(article.created_at).toLocaleString()}</p>
            <p className="article-votes">Votes: {article.votes}</p>
        </div>
    );
};

export default Article_Card;
