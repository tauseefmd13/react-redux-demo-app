import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { postAdded } from './postsSlice';

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector(state => state.users);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const onSavePostClicked = () => {
      if (!title || !content) return;
      
      dispatch(
        postAdded(title, content, userId)
      )

      setTitle('');
      setContent('');
      
      navigate(`/`);
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
                        Create Post
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
                          <button type="button" className="btn btn-primary" onClick={onSavePostClicked}>Save Post</button>
                        </div>
                      </form>
                    </div>
                  </div>
              </div>
            </div>
        </>
    )
}

export default AddPostForm;
