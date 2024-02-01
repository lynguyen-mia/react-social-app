import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState([]);

  async function onRegister(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

    const res = await fetch("https://node-social-nbqx.onrender.com/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, name: name, password: password })
    });

    const data = await res.json();
    if (res.status === 500) {
      setErrors(data.errors);
      console.log(data.errors);
      return;
    }
    navigate("/login");
  }
  return (
    <div className="card mx-auto mt-5" style={{ width: "500px" }}>
      <form className="p-4">
        {errors &&
          errors.map((error, i) => {
            return (
              <div className="text-center text-danger" key={i}>
                {error.msg}
              </div>
            );
          })}
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            YOUR E-MAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${
              errors.map((e) => e.path).includes("email") ? "invalid" : ""
            }`}
            ref={emailRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            YOUR NAME
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${
              errors.map((e) => e.path).includes("name") ? "invalid" : ""
            }`}
            ref={nameRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${
              errors.map((e) => e.path).includes("password") ? "invalid" : ""
            }`}
            placeholder="Password must have at least 6 characters"
            ref={passwordRef}
          />
        </div>

        <button
          type="submit"
          className="btn text-white"
          style={{ backgroundColor: "#5f3dc4" }}
          onClick={onRegister}
        >
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default Register;
