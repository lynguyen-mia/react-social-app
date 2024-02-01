import { useState } from "react";
import CreatePostModal from "../components/CreatePostModal";
import Posts from "../components/Posts";

const Feed = () => {
  const [editPost, setEditPost] = useState({});

  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  const userId = user?.userId;

  async function onEditPost(postId) {
    const res = await fetch(
      `https://node-social-nbqx.onrender.com/fetch-post/${postId}`,
      {
        // method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
        // body: JSON.stringify({ userId })
      }
    );

    if (res.status === 500) {
      console.log("Couldn't fetch the post");
    }

    const data = await res.json();
    setEditPost(data.data);
  }

  return (
    <div className="mt-4 mb-5">
      <div className="d-flex flex-column align-items-center w-50 mx-auto mb-4">
        {userId && (
          <form className="d-flex mb-3 justify-content-center">
            <input
              type="text"
              className="form-control w-75"
              name="status"
              placeholder="I am new"
            />
            <button type="submit" className="btn">
              Update
            </button>
          </form>
        )}
        {userId && (
          <button
            type="button"
            className="btn bg-warning d-inline"
            data-bs-toggle="modal"
            data-bs-target="#create-post"
            onClick={() => setEditPost({})}
          >
            NEW POST
          </button>
        )}
      </div>

      {/* POSTS */}
      <Posts editFn={onEditPost} />

      {/* Create/edit modal: MUST put here so that there's 1 modal at a time */}
      <CreatePostModal editPost={editPost} />
    </div>
  );
};

export default Feed;
