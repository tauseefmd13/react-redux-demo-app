import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { htmlParser } from '../../helpers/Common';
import { selectAllPosts, fetchPosts } from './postsSlice';
import Loader from '../../components/Loader';
import SearchBox from '../../components/SearchBox';
import Pagination from '../../components/Pagination';

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const getLatestPost = useCallback((search, pageNumber) => {
        dispatch(fetchPosts({
            search: search,
            pageNumber: pageNumber,
        }))
    }, [dispatch]);

    useEffect(() => {
        if (postStatus === 'idle') {
            getLatestPost(search, pageNumber);
        }
    }, [postStatus, search, pageNumber, getLatestPost]);

    // handle pagination
    const handlePagination = (e, pageNumber) => {
        e.preventDefault();

        setPageNumber((pageNumber) => pageNumber + 1);
        getLatestPost(search, pageNumber);
    }

    // handle search
    const handleSearch = (e) => {
        e.preventDefault();
        const { value } = e.target;
        
        if(value !== "") {
            setSearch(value);
            getLatestPost(value, pageNumber);
        } else {
            setSearch("");
            getLatestPost("", pageNumber);
        }
    }
    
    let renderedContent;
    if (postStatus === 'loading') {
        renderedContent = <Loader isLoading={true} />
    } else if (postStatus === 'succeeded') {
        // // Sort posts in reverse chronological order by datetime string
        // const orderedPosts = posts
        // .slice()
        // .sort((a, b) => b.date.localeCompare(a.date))

        const orderedPosts = posts?.data?.data;
        renderedContent = orderedPosts?.map(post => (
            <div className="card mb-3 h-100" key={post.id}>
                <div className="row">
                    <div className="col-md-4">
                        <img src={post.image_url} className="card-img-top" alt={post.title} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <Link to={`/posts/${post.slug}`}>
                                <h5 className="card-title">{post.title}</h5>
                            </Link>
                            <p className="card-text">
                                <PostAuthor userId={post.user.name} />
                            </p>
                            <p className="card-text">                            
                                <TimeAgo timestamp={post.date_formatted} />
                            </p>
                            <p className="card-text">
                                {htmlParser(post.content).substring(0, 400)+"..."}
                            </p>
                            <Link to={`/posts/${post.slug}`} className="btn btn-primary btn-sm">
                                View Post
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        ))
    } else if (postStatus === 'failed') {
        renderedContent = <div>{error}</div>
    }

    return (
        <>
            {/* <div className="row mb-3">
                <div className="col-md-12">
                    <Link to={'/posts/create'} className="btn btn-primary btn-sm float-end">Create Post</Link>
                </div>
            </div> */}

            <SearchBox
                search={search}
                handleSearch={handleSearch}
            />

            {renderedContent}

            {<Pagination data={posts?.data} handlePagination={handlePagination} />}
        </>
    )
}

export default PostsList;
