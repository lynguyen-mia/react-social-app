import SinglePost from "./SinglePost";
import openSocket from "socket.io-client";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Posts = ({ editFn }) => {
  const [postsArr, setPostsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(postsArr);

  function createPost(post) {
    setPostsArr((prevState) => {
      const updatedPosts = [...prevState, post.data];
      return updatedPosts;
    });
  }

  function updatePost(post) {
    setPostsArr((prevState) => {
      const updatedPosts = [...prevState];
      const postIndex = updatedPosts.findIndex((p) => p._id === post.data._id);

      if (postIndex !== -1) {
        updatedPosts[postIndex] = post.data;
      }
      return updatedPosts;
    });
  }

  function deletePost(post) {
    setPostsArr((prevState) => {
      const updatedPosts = [...prevState];
      const postIndex = updatedPosts.findIndex((p) => p._id === post.data);
      if (postIndex !== -1) {
        updatedPosts.splice(postIndex, 1);
      }
      return updatedPosts;
    });
  }

  useEffect(() => {
    async function fetchPosts() {
      // fetch posts from database
      setIsLoading(true);
      const res = await fetch(
        "https://node-social-nbqx.onrender.com/fetch-posts",
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        }
      );

      if (res.status === 500) {
        console.log("Couldn't fetch posts");
      }
      const data = await res.json();
      const posts = data.data;

      const socket = openSocket("https://node-social-nbqx.onrender.com/");
      socket.on("posts", (post) => {
        if (post.action === "create") {
          // console.log(post);
          createPost(post);
        } else if (post.action === "update") {
          // console.log(post);
          updatePost(post);
        } else if (post.action === "delete") {
          deletePost(post);
        }
      });

      setPostsArr(posts);
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center gap-4">
      {isLoading && <Loader />}
      {!isLoading && !postsArr && (
        <div className="text-center">No posts found.</div>
      )}
      {!isLoading &&
        postsArr &&
        postsArr.length > 0 &&
        postsArr.map((post) => (
          <SinglePost key={post._id} post={post} onEditPost={editFn} />
        ))}
    </div>
  );
};

export default Posts;
