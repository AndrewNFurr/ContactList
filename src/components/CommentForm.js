import React, { useState } from 'react';

const CommentForm = ({
    handleClick,
}) => {
    const [comment, setComment] = useState('')

    return <form onSubmit={(event) => {
        event.preventDefault();
        if (comment) {
        handleClick(comment)
        setComment('')
    }
    }}>
        <textarea
            type='text'
            value={comment}
            rows="10"
            columns="80"
            onChange={() => {setComment(event.target.value)}}
            placeholder="Comment"
            />
        <button>Comment on Contact</button>
    </form>
}

export default CommentForm