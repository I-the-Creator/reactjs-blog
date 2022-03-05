import useAxiosFetch from "../hooks/useAxiosFetch";

import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(""); // search term state
  const [searchResults, setSearchResults] = useState([]);

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
  

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
