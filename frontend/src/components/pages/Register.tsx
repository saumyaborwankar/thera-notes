import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

interface formDetail {
  name: String;
  email: String;
  password: String;
}

const Register = () => {
  const handleRegister = (data: formDetail) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center">
        <div className="login-modal p-6 pb-10 px-12 border-white rounded-xl bg-white shadow-xl">
          <h2 className="text-center py-4 text-3xl text-black">
            Hi! Welcome to Moovy
          </h2>
          <section className="w-[450px]">
            <Form
              className="flex flex-col gap-5"
              layout="vertical"
              onFinish={handleRegister}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your fullname"
                ></Input>
              </Form.Item>
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
                  Register
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p className="text-black text-center">
                Already a user?{" "}
                <Link to="/login">
                  <u>Login now</u>
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Register;
