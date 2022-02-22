import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from './context/dataContext';

const EditPost = () => {

    const { posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle } = useContext(DataContext);

    const { id } = useParams();  // get 'id' from a path URL: from App.js router for this page
    const post = posts.find(post => (post.id).toString() === id)  // get the post by id from posts array
    
    // when this loads we need to pull in this data and set the state for that
    useEffect(() => {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])
    return (
        <main className="NewPost">
            {/* if we have an editTitle - post will need to exist to have set an editTitle*/}
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>  {/* handleSubmit receives the EVENT */}
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            type="text"
                            id="postTitle"
                            placeholder="Enter the post title"
                            required
                            value={editTitle}   // for controlled input
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
            } 
            {/* if we do not have the editTitle  - post not exist*/}
            {!editTitle && 
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            } 
        </main>
    )
}

export default EditPost
