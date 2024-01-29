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

  const handleLogout = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // Include credentials (cookies)
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(anyDataYouWantToSend), // You can include a request body if needed
    });

    if (response.ok) {
      // Logout was successful
      // Clear any client-side storage or state related to authentication if needed

      // Reload the page
      window.location.reload();
    } else {
      // Logout failed, handle the error
      const errorData = await response.json(); // You can extract more information from the error response if needed
      console.error('Logout failed:', errorData);
      // Handle logout failure, maybe show an error message to the user
    }
  } catch (error) {
    console.error('Logout failed', error);
    // Handle logout failure, maybe show an error message to the user
  }
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
        <button
          onClick={async ()=>{
            await handleLogout()
            setIsloggedin(false)
          }}
        >Logout</button>
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
