import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { selectSinglePost, fetchPostById } from './postsSlice';
import Loader from '../../components/Loader';
import { getToken, htmlParser } from '../../helpers/Common';
import Comments from '../../pages/CommentPage/Comments';
import CommentForm from '../../pages/CommentPage/CommentForm';

const SinglePostPage = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();

    const singlePost = useSelector(selectSinglePost);
    console.log(singlePost);

    useEffect(() => {
        dispatch(fetchPostById({ postId:postId }))
    }, [postId, dispatch]);

    if (!singlePost) {
        return (
          <div className="text-center">
            <h3>Post not found!</h3>
          </div>
        )
    }

    let post = singlePost?.data;
    
    return (
        <>
            <div className="row mb-3">
                <div className="col-md-12">
                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                </div>
            </div>
            {!post ? (
                <Loader isLoading={true} />
            ) : (
                <>
                    <div className="card mb-3 h-100">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={post.image_url} className="card-img-top" alt={post.title} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">
                                        <PostAuthor userId={post.user.name} />
                                    </p>
                                    <p className="card-text">                            
                                        <TimeAgo timestamp={post.date_formatted} />
                                    </p>

                                    <p className="card-text">{htmlParser(post.content)}</p>

                                    {
                                        post.tags && post.tags.length > 0 ? (
                                                <p>
                                                    {
                                                        post.tags.map((tag,index) => (
                                                            <Link key={index} to={`/tag/${tag.slug}`} className="btn btn-sm btn-secondary custom-tags">{tag.name}</Link>
                                                        ))
                                                    }
                                                </p>
                                        ) : null
                                    }

                                    <div className="row">
                                        {
                                            post.prev_post !== null ? (
                                                <div className="col-6">
                                                    <Link to={`/posts/${post.prev_post.slug}`} className="card-link">
                                                        <p>Previous Article</p>
                                                        <h6>{post.prev_post.title}</h6>
                                                    </Link>
                                                </div>
                                            ) : (
                                                null
                                            )
                                        }
                                    
                                        {
                                            post.next_post !== null ? (
                                                <div className="col-6">
                                                    <Link to={`/posts/${post.next_post.slug}`} className="card-link">
                                                        <p>Next Article</p>
                                                        <h6>{post.next_post.title}</h6>
                                                    </Link>
                                                </div>
                                            ) : (
                                                null
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body">
                        {
                            post.approved_comments && post.approved_comments.length > 0 ? (
                                    <>
                                        <h3>{post.approved_comments.length} Comments</h3>

                                        <Comments comments={post.approved_comments} />
                                    </>
                                ): (
                                    null
                                )
                        }

                        {
                            getToken() ? <CommentForm post={post} /> : (
                                <Link to="/login">Login to comment</Link>
                            )
                        }
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default SinglePostPage;
