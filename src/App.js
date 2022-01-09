import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }   
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();  // working with Browser History

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
        search={null}
        setSearch={null}
      />}>
        <Route index element={<Home posts={posts} />} />  {/* renders by default in place of Outlet */}
        <Route path="post">
          <Route index element={<NewPost   /* renders by default inside 'post' path */
            handleSubmit={null}
            postTitle={null}
            setPostTitle={null}
            postBody={null}
            setPostBody={null}
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
