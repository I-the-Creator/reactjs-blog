import { useParams, Link } from "react-router-dom";
import { useContext } from 'react';
import DataContext from './context/dataContext';

const PostPage = () => {

    const { posts, handleDelete } = useContext(DataContext);

    const { id } = useParams();  // get 'id' from a path URL: from App.js router for this page
    const post = posts.find(post => (post.id).toString() === id)  // get the post by id from posts array

    return (
        <main className="PostPage">
            <article className="post">
                {/*if post is exist */}
                {post &&   
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`${process.env.REACT_APP_LOCAL_PATH}/edit/${post.id}`}>
                            <button className="editButton">Edit Post</button>
                        </Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {/*if post doesn't exist */}
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing</p>
                        <p>
                            <Link to={`${process.env.REACT_APP_LOCAL_PATH}`}>Visit Our Homepage</Link>
                        </p>
                    </>

                }  
            </article>

        </main>
    )
}

export default PostPage
