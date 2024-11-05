import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ article_id, setTriggerFetchComments }) => {
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);

    const api = axios.create({
        baseURL: 'https://nc-news-rhi4.onrender.com'
    });

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !username.trim()) return; 

        try {
            const response = await api.post(`/api/articles/${article_id}/comments`, {
                username,
                body: newComment
            });
            setNewComment("");
            setUsername(""); 
            setTriggerFetchComments((prev) => !prev);
        } catch (error) {
            console.error("Error posting comment:", error.response ? error.response.data : error);
            setError("Error posting comment");
        }
    };

    return (
        <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
            />
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
            />
            <button type="submit">Post Comment</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default CommentForm;
