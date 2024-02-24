"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "./AuthPopup.css";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import dayjs from "dayjs";

interface ForgotPasswordProps {
  setShowEmailPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  setShowEmailPopup,
}) => {
  const [showOTPPopup, setShowOTPPopup] = React.useState<any>(false);
  const [showPasswordPopup, setShowPasswordPopup] = React.useState<any>(false);

  const [formData, setFormData] = React.useState<any>({
    email: "",
    passwords: {
      password1: "",
      password2: "",
    },
    otp: "",
  });

  // get email show otp popup
  const sendOTP = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/sendotp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
          credentials: "include",
        }
      );
      console.log(formData.email);
      const data = await response.json();
      if (data.ok) {
        toast.success(data.message);
        setShowOTPPopup(true);
      } else {
        console.log("data is not ok");
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in sending Email");
    }
  };
  // get otp show password popup
  const matchOTP = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/otpverfication",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            otp: formData.otp,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        toast.success(data.message);
        setShowOTPPopup(false);
        setShowPasswordPopup(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in otp verification");
    }
  };
  // get password change password return to login page
  const setPassword = async (password: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API + "/auth/resetpasswordbyotp",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: password,
            email: formData.email,
          }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.ok) {
        toast.success(data.message);
        setShowEmailPopup(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in sending Email");
    }
  };
  // compare password run setPassword()
  const passwordCompare = async () => {
    const { password1, password2 } = formData.passwords;
    console.log(password1, password2);
    if (password1 == password2) {
      await setPassword(password2);
    } else {
      toast.error("Incorrect passwords");
    }
  };

  return (
    <div className="authform">
      <div className="left">
        <Image src={Logo} alt="Logo" />
      </div>
      {showOTPPopup ? (
        <div className="right">
          <h1>Enter your OTP here</h1>
          <form action="">
            <Input
              color="warning"
              placeholder="OTP"
              value={formData.otp}
              size="lg"
              variant="solid"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  otp: e.target.value,
                });
              }}
            />

            <button
              onClick={async (e) => {
                e.preventDefault();
                await matchOTP();
              }}
            >
              Submit
            </button>
          </form>
        </div>
      ) : showPasswordPopup ? (
        <div className="right">
          <h1>Enter your Password here</h1>
          <form action="">
            <Input
              color="warning"
              placeholder="Enter your password"
              size="lg"
              variant="solid"
              value={formData.passwords.password1}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  passwords: {
                    ...formData.passwords,
                    password1: e.target.value,
                  },
                });
              }}
            />
            <Input
              color="warning"
              placeholder="Enter your password again"
              size="lg"
              variant="solid"
              value={formData.passwords.password2}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  passwords: {
                    ...formData.passwords,
                    password2: e.target.value,
                  },
                });
              }}
            />

            <button
              onClick={async (e) => {
                e.preventDefault();
                await passwordCompare();
              }}
            >
              Change Password
            </button>
          </form>
        </div>
      ) : (
        <div className="right">
          <h1>Enter your Email here</h1>
          <form action="">
            <Input
              color="warning"
              placeholder="email"
              value={formData.email}
              size="lg"
              variant="solid"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />

            <button
              onClick={async (e) => {
                e.preventDefault();
                await sendOTP();
              }}
            >
              Send OTP
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
