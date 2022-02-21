import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";
import useWindowSize from "../hooks/useWindowSize";

import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(""); // search term state
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate(); // working with Browser History
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     } catch (err) {
  //       if(err.response) {
  //       // Not in the 200 response range
  //       console.log(err.response.data);
  //       console.log(err.response.data.message);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //       } else {
  //         // No response or 404 or any other error
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   }

  //   fetchPosts();
  // }, []);

  // Search
  useEffect(() => {
    // filtering the posts by search term, searching in body and title
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    /*  set searchResults state by reversing filtered search results
      so the newest posts will be at the top */
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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

  // Updating/editing post -  PUT request
  const handleEdit = async (id) => {
    // get the date and time
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    console.log(editTitle, editBody);
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      // map through all currently existing posts - create new array
      // if post id === id of edited post  - return response.data spread (new post information)
      // if not - post stay unchanged in new array
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      console.log(response.data);
      setEditTitle("");
      setEditBody("");
      navigate(`${process.env.REACT_APP_LOCAL_PATH}/`); // switch back to homepage
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

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
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
