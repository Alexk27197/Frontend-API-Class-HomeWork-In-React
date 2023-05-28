import React, { useState, useEffect } from "react";
import "./Posts.css";
import Navbar from "../Navbar/Navbar";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComments = (postId) => {
    setCurrentPostId(postId);
    setShow((prevShow) => (prevShow = true));
    if (currentPostId === postId) {
      setComments([]);
    } else {
      fetchComments(postId);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      setComments(data);

      console.log(show);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", margin: "20px" }}>Posts</h1>
      <div className="posts-container">
        {posts.map((post) => (
          <div
            onClick={() => toggleComments(post.id)}
            className="post"
            key={post.id}
          >
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>

            {currentPostId === post.id && (
              <div
                className={`comment-container ${
                  show ? "show" : "comment-hide hide"
                }`}
              >
                <h2 className={show ? "show" : "comment-hide hide"}>
                  Comments:
                </h2>
                {comments.map((comment) => (
                  <div
                    className={`comment ${show ? "show" : "comment-hide hide"}`}
                    key={comment.id}
                  >
                    <h3>{comment.name}</h3>
                    <p>{comment.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
