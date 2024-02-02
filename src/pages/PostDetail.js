import { useLoaderData } from "react-router-dom";
import convertDate from "../utils/convert-date";

const PostDetail = () => {
  const post = useLoaderData();
  console.log(`https://node-social-nbqx.onrender.com/${post.image}`);
  return (
    <div className="container mt-5 text-center">
      {!post && <div>No post found.</div>}

      {post && (
        <div className="d-flex flex-column align-items-center">
          <div>
            <h1 className="fs-4">{post.title}</h1>
            <div>
              Created by {post.userId.name} on {convertDate(post.date)}
            </div>
            <div className="hr-lines"></div>
          </div>

          <img
            src={`https://node-social-nbqx.onrender.com/${post.image}`}
            alt={post.title}
            className="w-50 mb-3"
          />

          <div>{post.content}</div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;

export async function loader({ request, params }) {
  const prodId = params.productId;

  const res = await fetch(
    `https://node-social-nbqx.onrender.com/fetch-post/${prodId}`,
    {
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    }
  );

  if (res.status === 500) {
    console.log("Couldn't fetch the post");
  }

  const data = await res.json();
  return data.data;
}
