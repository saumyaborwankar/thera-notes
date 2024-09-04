import {
  Button,
  Form,
  Grid,
  Input,
  InputNumber,
  message,
  Space,
  Tag,
} from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { useLoginMutation } from "../../store/rtk-api/authApi";
import { setLoggedIn, setUserDetails } from "../../store/slice/userSlice";
import z from "zod";
import TheraNotesLogo from "../../assets/png/TN.png";
import { createSchemaFieldRule } from "antd-zod";
import { Icons } from "../atoms/Icons";
import GoogleIcon from "../../assets/png/google.png";
import { HR } from "flowbite-react";
import DividerWithText from "../atoms/DividerWithText";
import { BlockButton } from "../atoms/BlockButton";
import BackgroundImage from "../../assets/png/womanWithQuote.png";
import TheraNotesFullLogo from "../../assets/png/logo-no-background.png";
import { CheckBreakPoint } from "../atoms/CheckBreakpoint";
import { PRIMARY_COLOR } from "../atoms/constants";
interface formDetail {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const [triggerLogin, { data, isSuccess, isError }] = useLoginMutation();

  const handleLogin = (data: formDetail) => {
    console.log(data);
    // triggerLogin({ email: data.email, password: data.password });
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

  const PasswordSchema = z.object({
    password: z.string(),
    email: z.string().email({ message: "Email not valid" }),
  });
  const rule = createSchemaFieldRule(PasswordSchema);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const LoginForm = () => {
    return (
      <div className="h-full w-full mt-10">
        <img
          src={screens.lg && screens.md ? TheraNotesFullLogo : TheraNotesLogo}
          className={
            screens.lg && screens.md
              ? "w-[150px] h-[75px] mr-auto ml-auto mt-5 pt-5"
              : "w-[70px] h-[75px] mr-auto ml-auto mt-5 pt-5"
          }
        ></img>
        <h2 className="text-center py-4 text-3xl text-black font-bold">
          Welcome back
        </h2>
        <div className="text-slate-500 w-1/2 m-auto text-center mb-5">
          Streamline Your Notes: Save Time, Improve Care, and Stay Organized
        </div>

        <div className="w-1/2 m-auto">
          {screens.xs || !screens.md || !screens.xl || !screens.xxl ? (
            <div className="flex-col justify-between w-full mb-5">
              <BlockButton icon={<Icons.google className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Google"}
              </BlockButton>
              <div className="h-2"> </div>
              <BlockButton icon={<Icons.apple className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Apple"}
              </BlockButton>
            </div>
          ) : (
            <div className="flex justify-between w-full mb-5">
              <BlockButton icon={<Icons.google className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Google"}
              </BlockButton>
              <div className="w-6"> </div>
              <BlockButton icon={<Icons.apple className="mr-2 h-4 w-4" />}>
                {screens.xs ? "" : "Sign in with Apple"}
              </BlockButton>
            </div>
          )}

          <DividerWithText />

          <Form
            layout="vertical"
            onFinish={handleLogin}
            style={{ width: "100%" }}
          >
            <Form.Item label="Email" name="email" rules={[rule]}>
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
              style={{ marginTop: "-10px" }}
              rules={[rule]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter the password"
                autoComplete="current-password"
              ></Input>
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <a>Forgot password?</a>
              <Form.Item style={{ width: "40%" }}>
                <BlockButton
                  block
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "500",
                    backgroundColor: PRIMARY_COLOR,
                    height: "36px",
                  }}
                >
                  Sign In
                </BlockButton>
              </Form.Item>
            </div>
          </Form>
          <div>
            <p className="text-black text-center">
              Not registered yet?{" "}
              <Link to="/register">
                <u>Register now</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* <CheckBreakPoint /> */}
      {screens.lg ? (
        <div className="flex h-screen">
          <img src={BackgroundImage} className="w-1/2 "></img>
          <LoginForm />
        </div>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Login;
