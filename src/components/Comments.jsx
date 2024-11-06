import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({ article_id, triggerFetchComments, setTriggerFetchComments }) => {
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({}); // Track errors by comment ID

    const api = axios.create({
        baseURL: 'https://nc-news-rhi4.onrender.com'
    });

    const fetchComments = async () => {
        setCommentLoading(true);
        try {
            const response = await api.get(`/api/articles/${article_id}/comments`);
            setComments(response.data.comments);
        } catch (error) {
            console.error(error.message, "Fetching Err");
        } finally {
            setCommentLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [article_id, triggerFetchComments]);

    const handleDeleteComment = async (comment_id) => {
        try {
            await api.delete(`/api/comments/${comment_id}`);
            setTriggerFetchComments((prev) => !prev);
        } catch (error) {
            setErrorMessages(prevErrors => ({
                ...prevErrors,
                [comment_id]: "Error deleting comment" 
            }));
        }
    };

    return (
        <section className="comments-section">
            <h3>Comments</h3>
            {commentLoading ? (
                <p>Loading comments...</p>
            ) : (
                comments.length > 0 ? (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.comment_id}>
                                <Comment 
                                    comment={comment} 
                                    onDelete={() => handleDeleteComment(comment.comment_id)} 
                                />
                                {/* Display error message for this specific comment if it exists */}
                                {errorMessages[comment.comment_id] && (
                                    <p className="error-message">{errorMessages[comment.comment_id]}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet</p>
                )
            )}
            <CommentForm article_id={article_id} setTriggerFetchComments={setTriggerFetchComments} />
        </section>
    );
};

export default Comments;
