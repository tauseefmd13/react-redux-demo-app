import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { postUpdated, selectPostById } from './postsSlice';

const EditPostForm = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const post = useSelector(state => selectPostById(state, postId));
    const users = useSelector(state => state.users);

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [userId, setUserId] = useState(post.user);

    const onSavePostClicked = () => {
        if (!title || !content) return;

        dispatch(
            postUpdated({
                id: postId,
                title: title,
                content: content,
                user: userId
            })
        )
        navigate(`/posts/${postId}`);
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
    ))

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                                Edit Post
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                            </h3>
                        </div>
                        <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="postTitle">Title:</label>
                                <input
                                className="form-control"
                                type="text"
                                id="postTitle"
                                name="postTitle"
                                placeholder="What's on your mind?"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postContent">Content:</label>
                                <textarea
                                rows="5"
                                className="form-control"
                                id="postContent"
                                name="postContent"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="postAuthor">Author:</label>
                                <select className="form-control" id="postAuthor" name="postAuthor" value={userId} onChange={(e) => setUserId(e.target.value)}>
                                    <option value="">Select User</option>
                                    {usersOptions}
                                </select>
                            </div>

                            <div>
                                <button type="button" className="btn btn-primary" onClick={onSavePostClicked}>
                                    Update Post
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPostForm;
