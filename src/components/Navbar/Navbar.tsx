"use client";
import React from "react";
import "./Navbar.css";
import Logo from "@/assets/logo.png";
import { IoIosBody } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import AuthPopup from "../AuthPopup/AuthPopup";

const Navbar = () => {
  const [isLoggedin, setIsloggedin] = React.useState<boolean>(false);

  const [showpopup, setShowpopup] = React.useState<boolean>(false);

  const checkLogin = async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + "/auth/checklogin", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          setIsloggedin(true);
        } else {
          setIsloggedin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    checkLogin();
  }, [showpopup]);

  return (
    <nav>
      <Image src={Logo} alt="logo" />
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/profile">
        <IoIosBody />
      </Link>
      {isLoggedin ? (
        <button>Logout</button>
      ) : (
        <button
          onClick={() => {
            setShowpopup(true);
          }}
        >
          Login
        </button>
      )}
      {showpopup && <AuthPopup setShowpopup={setShowpopup} />}
    </nav>
  );
};

export default Navbar;
