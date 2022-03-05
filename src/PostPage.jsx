import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import api from "./api/posts";
import DataContext from "./context/dataContext";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate(); // working with Browser History

  const { id } = useParams(); // get 'id' from a path URL: from App.js router for this page
  const post = posts.find((post) => post.id.toString() === id); // get the post by id from posts array

  // Deleting Post
  const handleDelete = async (id) => {
    try {
      // Delete axios request - by id
      await api.delete(`/posts/${id}`);

      /*if the id got from postPage 'is not equal' post.id while iterating posts during filtering, 
      include it to postsList, otherwise filtering out post with id we have passed in */
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      /* useNavigate to update Browser History after deleting post
      - routed to Homepage after deleting */
      navigate(`${process.env.REACT_APP_LOCAL_PATH}/`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="PostPage">
      <article className="post">
        {/*if post is exist */}
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`${process.env.REACT_APP_LOCAL_PATH}/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {/*if post doesn't exist */}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to={`${process.env.REACT_APP_LOCAL_PATH}`}>
                Visit Our Homepage
              </Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
