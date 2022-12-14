import "./Login.scss";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/user";
import Button from "@mui/material/Button";
import Img from "../../assets/sanitizers.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const person = useSelector((state) => state.user.value);

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user && email && pwd) {
      dispatch(login({ name: user, email: email }));
      setUser("");
      setPwd("");
      setEmail("");
      navigate("/");
    } else {
      alert("please input all required fields");
    }
  };

  return (
    <div className="LoginContainer">
      <main className="Loginsection">
        <div className="side-img">
          <img className="img" src={Img} alt="" />
        </div>
        <div className="LoginForm">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <Button
              variant="contained"
              size="small"
              color="success"
              className="signIn"
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <div
                className="router"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </div>
            </span>
            <span
              className="resetlink"
              onClick={() => {
                navigate("/resetpassword");
              }}
            >
              forgot Password
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
