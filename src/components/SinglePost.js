import { Link, useNavigate } from "react-router-dom";
import convertDate from "../utils/convert-date";

const SinglePost = ({ post, onEditPost }) => {
  const navigate = useNavigate();

  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  const userId = user?.userId;

  async function onDeletePost() {
    const confirm = window.confirm("Do you want to delete this post?");
    if (confirm) {
      const res = await fetch(
        `https://node-social-nbqx.onrender.com/delete/${post._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId })
        }
      );
      if (res.status === 200) {
        return navigate("/");
      }
    }
  }
  return (
    <div id="single-post" className="w-75 p-3">
      <div className="text-secondary mb-2">
        Post by {post.userId.name} on {convertDate(post.date)}
      </div>
      <h2 className="fs-4">{post.title}</h2>
      <div className="d-flex gap-3 justify-content-end">
        <Link to={`/product/${post._id}`}>VIEW</Link>
        {userId === post.userId._id ? (
          <button
            data-bs-toggle="modal"
            data-bs-target="#create-post"
            className="action-btn"
            onClick={() => onEditPost(post._id)}
          >
            EDIT
          </button>
        ) : (
          ""
        )}
        {userId === post.userId._id ? (
          <button className="action-btn text-danger" onClick={onDeletePost}>
            DELETE
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SinglePost;
