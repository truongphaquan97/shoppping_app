import { Form, Link, json, redirect, useSearchParams } from "react-router-dom";
import "./LoginPage.css";
import { useEffect, useRef } from "react";
import store from "../store/index";

//Trang Login/Sign up
const AuthPage = () => {
  //Lấy params
  const [searchParams] = useSearchParams();

  // //isLogin là trang đăng nhập
  // const isLogin = searchParams.get("mode") === "login";

  //ref để theo dõi input
  const formRef = useRef();

  //Hàm nảy xóa value input khi đăng ký thành công
  const resetHandler = () => {
    formRef.current.reset();
  };

  //resetHandler() chạy khi params thay đổi
  useEffect(() => {
    resetHandler();
  }, [searchParams]);

  return (
    <div className="wrap-login">
      <div
        className="login-page"
        style={{ backgroundImage: "url(./images/banner1.jpg)" }}
      >
        <div className="wrap-form">
          <Form method="post" className="form-login" ref={formRef}>
            <h2>Sign In</h2>

            <div className="wrap-row email">
              <label>Email</label>
              <input type="email" name="email" required></input>
            </div>
            <div className="wrap-row password">
              <label>Password</label>
              <input type="password" name="password" required></input>
            </div>

            <div className="btn-signup">
              <button>SIGN IN</button>
            </div>
            <div className="btn-toggle">
              <p>
                Create an account?
                <Link to="/register"> Sign up</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;

export const action = async ({ request }) => {
  //Dữ liệu lấy từ Form
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  //Lấy thông tin người dùng đã lưu
  const userArr = JSON.parse(localStorage.getItem("userArr")) ?? [];

  //Tiến hành validate
  const validateHandler = () => {
    //Lần lượt check email và mật khẩu xem có khới với thông tin đã đăng ký chưa
    if (!authData.email.includes("@")) {
      alert("Vui lòng điền email hợp lệ!");
      return false;
    }

    if (userArr) {
      console.log(userArr);
      const userLogin = userArr.find((user) => user.email === authData.email);

      if (!userLogin) {
        console.log(userLogin);
        alert("Email chưa đăng ký!");
        return false;
      }
    }

    if (authData.password.length < 8) {
      alert("Vui lòng điền mật khẩu dài hơn 8 ký tự!");
      return false;
    }

    if (userArr) {
      console.log(userArr);
      const passwordLogin = userArr.find(
        (user) => user.password === authData.password
      );

      if (!passwordLogin) {
        console.log(passwordLogin);
        alert("Mật Khẩu không đúng!");
        return false;
      }
    }
    return true;
  };

  //Gọi hàm validateHandler
  const isPassData = validateHandler();

  if (!isPassData) {
    return null;
  }

  //Lấy userCurrent để lưu vào store khi chạy action ở dưới
  const userCurrent = userArr.find((user) => user.email === authData.email);

  //Thực hiện action này để đăng nhập
  const saveStateStore = () => {
    store.dispatch({
      type: "ON_LOGIN",
      payload: { current: userCurrent },
    });
  };

  //Gọi hàm
  saveStateStore();

  //Lưu userCurrent vào localStorage để lấy tên người dùng
  localStorage.setItem("userCurrent", JSON.stringify(userCurrent));

  //Login thành công chuyển hướng sang HomePage
  return redirect("/");
};
