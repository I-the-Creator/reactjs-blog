import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import api from "./api/posts";
import { format } from "date-fns";
import DataContext from "./context/dataContext";

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);

  const { id } = useParams(); // get 'id' from a path URL: from App.js router for this page
  const post = posts.find((post) => post.id.toString() === id); // get the post by id from posts array
  const navigate = useNavigate(); // working with Browser History

  // when this loads we need to pull-in this data and set the state for that
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  // Updating/editing post -  PUT request
  const handleEdit = async (id) => {
    // get the date and time
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      // map through all currently existing posts - create new array
      // if post id === id of edited post  - return response.data spread (new post information)
      // if not - post stay unchanged in new array
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );

      setEditTitle("");
      setEditBody("");
      navigate(`${process.env.REACT_APP_LOCAL_PATH}/`); // switch back to homepage
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      {/* if we have an editTitle - post will need to exist to have set an editTitle*/}
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            {" "}
            {/* handleSubmit receives the EVENT */}
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              placeholder="Enter the post title"
              required
              value={editTitle} // for controlled input
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              placeholder="Enter the post text"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {/* if we do not have the editTitle  - post not exist*/}
      {!editTitle && (
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
    </main>
  );
};

export default EditPost;
