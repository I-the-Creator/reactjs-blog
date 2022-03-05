import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import EditPost from "./EditPost";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            {/* renders by default in place of Outlet */}
            <Route path="post" index element={<NewPost />} /> {/* renders by default inside 'post' path */}
            <Route path="/post/:id" element={<PostPage />} /> {/* if we provided a post 'id' with url: '/post/id', goes to useParams()*/}
            <Route path="edit/:id" index element={ <EditPost />} /> {/* renders by default inside 'edit' path */ }
            <Route path="about" element={<About />} />
            <Route path="*" element={<Missing />} />{/* wildcard 'catch-all' other routes - renders Missing component*/}
        </Route>
      </Routes>
    
  );
}

export default App;
