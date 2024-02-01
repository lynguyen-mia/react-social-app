import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();

  async function onLogin(e) {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const res = await fetch("https://node-social-nbqx.onrender.com/login", {
        method: "POST",
        credentials: "include", // send cookies with its request
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
      });

      const data = await res.json();
      if (res.status === 500 || res.status === 401) {
        setErrors(data.errors);
        console.log(data.errors);
        return;
      }
      // Store user id in local storage
      localStorage.setItem("user", JSON.stringify(data.userData));

      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password must have at least 6 characters"
            className={`form-control ${
              errors.map((e) => e.path).includes("password") ? "invalid" : ""
            }`}
            ref={passwordRef}
          />
        </div>

        <button
          type="submit"
          className="btn text-white"
          style={{ backgroundColor: "#5f3dc4" }}
          onClick={onLogin}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
