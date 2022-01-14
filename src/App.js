import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');   // search term state
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();  // working with Browser History
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
        console.log(response.data);
      } catch (err) {
        if(err.response) {
        // Not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.data.message);
        console.log(err.response.status);
        console.log(err.response.headers);
        } else {
          // No response or 404 or any other error
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPosts();
  }, []);

  // Search
  useEffect(() => {
    // filtering the posts by search term, searching in body and title 
    const filteredResults = posts.filter(post => 
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

      /*  set searchResults state by reversing filtered search results
      so the newest posts will be at the top */
      setSearchResults(filteredResults.reverse());
;  }, [posts, search])

  // submit new Post after creating - receives the event from submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if posts exists - get the last posts - get its id and increase by 1, if not just set as 1
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      // 'Create' - POST request to server
      const response = await api.post('/posts', newPost);
      // create new array with new post added - spread all existing posts and add new one, returned in response to POST request
      const allPosts = [...posts, response.data];
      setPosts(allPosts);  // set the prop with new value
      // set PostTitle and PostBody in the controlled inputs back to empty string after we've submitted
      setPostTitle(''); 
      setPostBody('');
      navigate('/'); // back to homepage
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  // Deleting Post
  const handleDelete = (id) => {
    /*if the id got from postPage 'is not equal' post.id while iterating posts during filtering, 
    include it to postsList, otherwise filtering out post with id we have passed in */
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    /* useNavigate to update Browser History after deleting post
     - routed to Homepage after deleting */
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/" element={<Layout 
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home posts={searchResults} />} />  {/* renders by default in place of Outlet */}
        <Route path="post">
          <Route index element={<NewPost   /* renders by default inside 'post' path */
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage   /* if we provided a post id with url: '/post/id', goes to useParams()*/
            posts={posts}
            handleDelete={handleDelete}
          />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />  {/* wildcard 'catch-all' other routes - renders Missing component*/}
      </Route>
    </Routes>

  );
}

export default App;
