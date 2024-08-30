import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { useLoginMutation } from "../../store/rtk-api/authApi";
import { setLoggedIn, setUserDetails } from "../../store/slice/userSlice";

interface formDetail {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const [triggerLogin, { data, isSuccess, isError }] = useLoginMutation();

  const handleLogin = (data: formDetail) => {
    triggerLogin({ email: data.email, password: data.password });
  };

  const navigate = useNavigate();

  useEffect(() => {
    console.log({ isSuccess, isError, data });
    if (isSuccess && data) {
      message.success("Succesfully logged in.");
      dispatch(setLoggedIn(true));
      dispatch(setUserDetails(data.user));
      navigate(`/`);
    }
    if (isError) {
      message.error("Login failed, please check credentials.");
    }
  }, [isSuccess, isError, data]);

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="login-modal p-6 pb-10 px-12 border-white rounded-xl bg-white shadow-xl">
          <h2 className="text-center py-4 text-3xl text-black">
            Welcome back to Moovy!
          </h2>
          <section className="w-[450px]">
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="username"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="current-password"
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    backgroundColor: "black",
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p className="text-black text-center">
                Not registered yet?{" "}
                <Link to="/register">
                  <u>Register now</u>
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
