import React from 'react';

const Comment = ({ comment, onDelete }) => {
    return (
        <li className="comment">
            <p><strong>{comment.author}</strong>: {comment.body}</p>
            <p>Posted on {new Date(comment.created_at).toLocaleString()}</p>
            <button onClick={() => onDelete(comment.comment_id)}>Delete</button>
        </li>
    );
};

export default Comment;
