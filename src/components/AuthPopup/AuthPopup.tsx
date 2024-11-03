import React, { useState } from "react";
import "./AuthPopup.css";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";
import ForgotPassword from "./ForgotPassword";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ToastContainer, toast } from "react-toastify";

interface AuthPopupProps {
  setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupFormData {
  name: String | null;
  email: String | null;
  password: String | null;
  weightInKg: Number | null;
  heightInCm: Number | null;
  goal: String | null;
  gender: String | null;
  dob: Date | null;
  activityLevel: String | null;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
  const [showSignup, setShowSignup] = React.useState<boolean>(false);
  const [signupformData, setSignupFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    weightInKg: 0.0, 
    heightInCm: 0.0,
    goal: "",
    gender: "",
    dob: new Date(),
    activityLevel: "",
  });

  const [showEmailPopup, setShowEmailPopup] =
    React.useState<boolean>(false);

  const [loginformData, setLoginFormData] = useState({
    email: "",
    password: "",
  });




  const handleLogin = () => {
    console.log(loginformData);
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginformData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.ok) {
          toast.success(data.message);
          setShowpopup(false);
          // window.location.reload();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = () => {
    console.log(signupformData);

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupformData),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.ok) {
          toast.success(data.message);

          setShowSignup(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="popup">
      <button
        className="close"
        onClick={() => {
          setShowpopup(false);
        }}
      >
        <AiOutlineClose />
      </button>

      {showSignup ? (
        // Register form
        <div className="authform">
          <div className="left">
            <Image src={Logo} alt="Logo" />
          </div>
          <div className="right">
            <h1>Signup to become a freak</h1>
            <form action="">
              <Input
                color="warning"
                placeholder="name"
                size="lg"
                variant="solid"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    name: e.target.value,
                  });
                }}
              />
              <Input
                color="warning"
                placeholder="email"
                size="lg"
                variant="solid"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    email: e.target.value,
                  });
                }}
              />
              <Input
                color="warning"
                placeholder="password"
                size="lg"
                variant="solid"
                type="password"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    password: e.target.value,
                  });
                }}
              />

              <Input
                color="warning"
                size="lg"
                variant="solid"
                type="number"
                placeholder="Weight in kg"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    weightInKg: parseFloat(e.target.value),
                  });
                }}
              />

              <Select
                color="warning"
                placeholder="Activity Level"
                size="lg"
                variant="solid"
                onChange={(
                  event: React.SyntheticEvent | null,
                  newValue: string | null
                ) => {
                  setSignupFormData({
                    ...signupformData,
                    activityLevel: newValue?.toString() || "",
                  });
                }}
              >
                <Option value="sedentary">Sedentary</Option>
                <Option value="light">Light</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="active">Active</Option>
                <Option value="veryActive">Very Active</Option>
              </Select>

              <Select
                color="warning"
                placeholder="Goal"
                size="lg"
                variant="solid"
                onChange={(
                  event: React.SyntheticEvent | null,
                  newValue: string | null
                ) => {
                  setSignupFormData({
                    ...signupformData,
                    goal: newValue?.toString() || "",
                  });
                }}
              >
                <Option value="weightLoss">Lose</Option>
                <Option value="weightMaintain">Maintain</Option>
                <Option value="weightGain">Gain</Option>
              </Select>

              <Select
                color="warning"
                placeholder="Gender"
                size="lg"
                variant="solid"
                onChange={(
                  event: React.SyntheticEvent | null,
                  newValue: string | null
                ) => {
                  setSignupFormData({
                    ...signupformData,
                    gender: newValue?.toString() || "",
                  });
                }}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>

              <label htmlFor="">Height</label>

              <Input
                color="warning"
                size="lg"
                variant="solid"
                type="number"
                placeholder="cm"
                onChange={(e) => {
                  setSignupFormData({
                    ...signupformData,
                    heightInCm: parseFloat(e.target.value),
                  });
                }}
              />

              <label htmlFor="">Date of Birth</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  defaultValue={dayjs(new Date())}
                  sx={{
                    backgroundColor: "white",
                  }}
                  onChange={(newValue) => {
                    setSignupFormData({
                      ...signupformData,
                      dob: new Date(newValue as any),
                    });
                  }}
                />
              </LocalizationProvider>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}
              >
                Signup
              </button>
            </form>
            <p>
              Already have an account?{" "}
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
      ) : showEmailPopup ? (
        <ForgotPassword setShowEmailPopup = {setShowEmailPopup}/>
      ) :  (
        // Login form
        <div className="authform">
          <div className="left">
            <Image src={Logo} alt="Logo" />
          </div>
          <div className="right">
            <h1>Login to become a freak</h1>
            <form action="">
              <Input
                color="warning"
                placeholder="email"
                size="lg"
                variant="solid"
                onChange={(e) => {
                  setLoginFormData({
                    ...loginformData,
                    email: e.target.value,
                  });
                }}
              />

              <Input
                color="warning"
                placeholder="password"
                size="lg"
                variant="solid"
                type="password"
                onChange={(e) => {
                  setLoginFormData({
                    ...loginformData,
                    password: e.target.value,
                  });
                }}
              />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                Login
              </button>
            </form>
            <div className="forgot-pass-signup-line">
              <span className="forgot-password" 
                onClick={()=>{
                  setShowEmailPopup(true)
                }}
              >Forgot password</span>
              <span>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setShowSignup(true);
                  }}
                >
                  Signup
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
