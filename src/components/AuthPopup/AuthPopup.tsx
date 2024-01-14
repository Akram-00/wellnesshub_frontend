import React from "react";
import "./AuthPopup.css";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

const AuthPopup = () => {
  const [showSignup, setShowSignup] = React.useState<boolean>(false);

  const handleLogin = () => {};
  const handleSignup = () => {};

  return (
    <div className="popup">
      {showSignup ? (
        <div className="authform">
          <div className="left">
            <Image src={Logo} alt="Logo" />
          </div>
          <div className="right">
            <h1>Login to change you life</h1>
            <form action="">
              {/* Name */}
              <Input
                color="warning"
                size="lg"
                variant="outlined"
                placeholder="email"
                type="email"
              />
              <Input
                color="warning"
                size="lg"
                variant="outlined"
                placeholder="password"
                type="password"
              />

              <div className="form_input_leftright">
                <Input
                  variant="outlined"
                  color="warning"
                  type="number"
                  placeholder="Age"
                />
                <Input
                  variant="outlined"
                  color="warning"
                  type="number"
                  placeholder="Weight"
                />
              </div>

              <Select
                color="warning"
                placeholder="Gender"
                size="lg"
                variant="outlined"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
<br />
              <label htmlFor="Height">Height</label>
              <div className="form_input_leftright">
                <Input
                  variant="outlined"
                  color="warning"
                  type="number"
                  placeholder="ft"
                />
                <Input
                  variant="outlined"
                  color="warning"
                  type="number"
                  placeholder="in"
                />
              </div>

              <button
                onClick={() => {
                  handleSignup();
                }}
              >
                Sign Up
              </button>
            </form>
            <p>
              Already have an Account{" "}
              <button
                onClick={() => {
                  setShowSignup(false);
                }}
              >
                Login
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="authform">
          <div className="left">
            <Image src={Logo} alt="Logo" />
          </div>
          <div className="right">
            <h1>Login to change your life</h1>
            <form action="">
              <Input
                color="warning"
                size="lg"
                variant="outlined"
                placeholder="email"
                type="email"
              />
              <Input
                color="warning"
                size="lg"
                variant="outlined"
                placeholder="password"
                type="password"
              />
              <button
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
            </form>
            <p>
              Don't have an Account{" "}
              <button
                onClick={() => {
                  setShowSignup(true);
                }}
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
