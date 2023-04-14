import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPosts, fetchPostDetails } from "./redux/reducers/postsReducer";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [isLoaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   // fetchPosts();
  // }, []);

  const fetchPosts = () => {
    setLoaded(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const fetchPostDetails = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        alert(`Post body: ${data.body}`);
      })
      .catch((error) => console.error("Error fetching post details:", error));
  };

  const handleAddPost = () => {
    if (newPost.trim() === "") {
      alert("Please enter a valid post.");
      return;
    }

    const post = {
      title: newPost,
      body: newPost,
      userId: 1, // Assuming userId is always 1 for simplicity
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([data, ...posts]);
        setNewPost("");
      })
      .catch((error) => console.error("Error adding post:", error));
  };
  // const dispatch = useDispatch();
  // const posts = useSelector((state) => state.posts.posts);
  // // console.log(posts);
  // const [newPost, setNewPost] = useState("");

  // const handleFetchPosts = () => {
  //   setLoaded(true);
  //   dispatch(fetchPosts());
  // };

  // const handleFetchPostDetails = (postId) => {
  //   dispatch(fetchPostDetails(postId));
  // };

  // const handleAddPost = () => {
  //   if (newPost.trim() === "") {
  //     alert("Please enter a valid post.");
  //     posts([newPost, ...posts]);
  //     setNewPost("");
  //     return;
  //   }

  // const post = {
  //   title: newPost,
  //   body: newPost,
  //   userId: 1, // Assuming userId is always
  // };

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>
      <ul>
        {isLoaded
          ? posts.map((post) => (
              <li key={post.id} onClick={() => fetchPostDetails(post.id)}>
                {post.title}
              </li>
            ))
          : ""}
      </ul>
      <div>
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </div>
  );
};

export default App;
