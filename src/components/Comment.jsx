import React from 'react';
import '../styles/Comment.css';

const Comment = ({ comment, onDelete }) => {
    console.log("Deleting comment with id:", comment.comment_id);
    return (
        <li className="comment">
            <p><strong>{comment.author}</strong>: {comment.body}</p>
            <p>Posted on {new Date(comment.created_at).toLocaleString()}</p>
            <button className="del-button" onClick={() => onDelete(comment.comment_id)}>Delete</button>
        </li>
    );
};

export default Comment;
