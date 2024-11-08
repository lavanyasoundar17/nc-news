import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Comments = ({ article_id, triggerFetchComments, setTriggerFetchComments }) => {
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({}); // Store error messages for each comment

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

    const handleAddComment = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    const handleDeleteComment = async (comment_id) => {
        try {
            await api.delete(`/api/comments/${comment_id}`);
            setComments((prevComments) => prevComments.filter(comment => comment.comment_id !== comment_id));
        } catch (error) {
            console.error("Error deleting comment", error);

            // Update the errorMessages state for the specific comment
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [comment_id]: "Unable to delete comment. Please try again later."
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
                                {errorMessages[comment.comment_id] && (
                                    <p style={{ color: 'red', fontSize: '14px' }}>
                                        {errorMessages[comment.comment_id]}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet</p>
                )
            )}
            <CommentForm 
                article_id={article_id} 
                handleAddComment={handleAddComment}
            />
        </section>
    );
};

export default Comments;
