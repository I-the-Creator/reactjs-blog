import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "./api/posts";
import { format } from "date-fns";
import DataContext from "./context/dataContext";

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate(); // working with Browser History

  // submit new Post after creating - receives the event from submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if posts exists - get the last posts - get its id and increase by 1, if not just set as 1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      // 'Create' - POST request to server
      const response = await api.post("/posts", newPost);
      // create new array with new post added - spread all existing posts and add new one, returned in response to POST request
      const allPosts = [...posts, response.data];
      setPosts(allPosts); // set the prop with new value
      // set PostTitle and PostBody in the controlled inputs back to empty string after we've submitted
      setPostTitle("");
      setPostBody("");
      navigate(`${process.env.REACT_APP_LOCAL_PATH}/`); // switch back to homepage
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        {" "}
        {/* handleSubmit receives the EVENT */}
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          placeholder="Enter the post title"
          required
          value={postTitle} // for controlled input
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          placeholder="Enter the post text"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
