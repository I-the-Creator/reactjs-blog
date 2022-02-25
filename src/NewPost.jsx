import { useContext } from 'react';
import DataContext from './context/dataContext';

const NewPost = () => {

    const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } = useContext(DataContext);

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>  {/* handleSubmit receives the EVENT */}
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    placeholder="Enter the post title"
                    required
                    value={postTitle}   // for controlled input
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
                <button type="submit">
                    Submit
                </button>
            </form>
        </main>
    )
}

export default NewPost
