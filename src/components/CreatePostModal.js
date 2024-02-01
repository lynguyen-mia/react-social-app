import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostModal = ({ editPost, edit }) => {
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadedFile, setUploadedFile] = useState();
  const [imagePreview, setImagePreview] = useState(false);
  const fileRef = useRef();

  const [isTitleTouched, setIsTitleTouched] = useState();
  const [isContentTouched, setIsContentTouched] = useState();
  const [isUploadTouched, setIsUploadTouch] = useState();

  const titleInvalid = isTitleTouched && !title;
  const contentInvalid = isContentTouched && !content;
  const uploadImageInvalid = isUploadTouched && !uploadedFile;

  let formIsValid = false;
  // New post case
  if (
    isTitleTouched &&
    isContentTouched &&
    Object.keys(editPost).length === 0
  ) {
    formIsValid = title && content && Boolean(uploadedFile);
  }

  // Edit post case
  if (editPost && Object.keys(editPost).length !== 0) {
    formIsValid = true;
  }

  useEffect(() => {
    if (editPost && Object.keys(editPost).length !== 0) {
      setTitle(editPost.title || "");
      setContent(editPost.content || "");
    }
  }, [editPost, edit]);

  function addImageBlurHandler(e) {
    const uploadedImage = e.target.files[0];
    setUploadedFile(uploadedImage);
    if (uploadedImage) {
      setImagePreview(true);
    } else {
      setImagePreview(false);
    }
  }

  function resetForm() {
    setTitle("");
    setContent("");
    setUploadedFile();
    fileRef.current.value = "";
    setImagePreview(false);
    setIsTitleTouched();
    setIsContentTouched();
    setIsUploadTouch();
    setError({});
  }

  async function onSubmitForm() {
    try {
      setIsTitleTouched(true);
      setIsContentTouched(true);
      setIsUploadTouch(true);

      const userJSON = localStorage.getItem("user");
      const user = JSON.parse(userJSON);
      const userId = user?.userId;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", uploadedFile);
      formData.append("userId", userId);
      let url = "https://node-social-nbqx.onrender.com/create-post";
      if (editPost && Object.keys(editPost).length !== 0) {
        url = `https://node-social-nbqx.onrender.com/edit-post/${editPost["_id"]}`;
      }
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        // headers: { "Content-Type": "multipart/form-data" } NOT INCLUDE THIS
        body: formData
      });
      if (res.status === 500) {
        const data = await res.json();
        setError(data);
        return;
      }
      resetForm();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="modal fade" id="create-post" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="create-post">
              {editPost && Object.keys(editPost).length !== 0
                ? "Edit Post"
                : "New Post"}
            </h5>
            <button
              type="button"
              className="close border-0 bg-transparent h4"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => resetForm()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              {error && (
                <div className="text-center text-danger mb-4">{error.msg}</div>
              )}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-control ${titleInvalid ? "invalid" : ""}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsTitleTouched(true)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="form-label">
                  IMAGE
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className={`form-control ${
                    uploadImageInvalid && Object.keys(editPost).length === 0
                      ? "invalid"
                      : ""
                  }`}
                  onChange={(e) => addImageBlurHandler(e)}
                  onBlur={() => setIsUploadTouch(true)}
                  ref={fileRef}
                />
                {!imagePreview && <div>Please choose an image.</div>}
                {uploadedFile && imagePreview && (
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt={uploadedFile.name}
                    className="w-50 object-fit-contain mt-3"
                  />
                )}
              </div>

              <div>
                <label htmlFor="content" className="form-label">
                  CONTENT
                </label>
                <textarea
                  type="text"
                  name="content"
                  className={`form-control ${contentInvalid ? "invalid" : ""}`}
                  style={{ height: "100px" }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onBlur={() => setIsContentTouched(true)}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => resetForm()}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onSubmitForm}
              className="btn btn-primary"
              data-bs-dismiss="modal"
              disabled={formIsValid ? false : true}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostModal;
