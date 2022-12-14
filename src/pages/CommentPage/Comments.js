import React from 'react';

const Comments = (props) => {
    return (
        <>
            <ol className="commentlist">
                {
                    props.comments && props.comments.length > 0 ? (
                        props.comments.map(comment =>
                            <li className="depth-1" key={comment.id}>
                                <div className="avatar">
                                    <img className="avatar" src={comment.user.avatar_url} alt="" width="50" height="50" />
                                </div>
                                <div className="comment-content">
                                    <div className="comment-info">
                                        <cite>{comment.user.name}</cite>
    
                                        <div className="comment-meta">
                                            <time className="comment-time" dateTime={comment.date_formatted}>{comment.date_formatted}</time>
                                        </div>
                                    </div>
                                    <div className="comment-text">
                                        <p>{comment.comment}</p>
                                    </div>
                                </div>
                            </li>
                        )
                    ) : (
                        null
                    )
                }
            </ol>
        </>
    )
}

export default Comments;
