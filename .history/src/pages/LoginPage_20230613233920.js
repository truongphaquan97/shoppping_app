import { Form } from "react-router-dom";
import "./Login.css";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div className="wrap-login">
      <div
        className="login-page"
        style={{ backgroundImage: "url(./images/banner1.jpg)" }}
      >
        <div className="wrap-form">
          <Form className="form-login">
            <h2>Sign Up</h2>
            <div className="wrap-row full-name">
              <label>Full Name</label>
              <input type="text" name="fullName" required></input>
            </div>
            <div className="wrap-row email">
              <label>Email</label>
              <input type="email" name="email" required></input>
            </div>
            <div className="wrap-row password">
              <label>Password</label>
              <input type="password" name="password"></input>
            </div>
            <div className="wrap-row phone">
              <label>Phone</label>
              <input></input>
            </div>
            <div className="btn-signup">
              <button>SIGN UP</button>
            </div>
            <div className="btn-toggle">
              <p>
                Login?<button>Click</button>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
