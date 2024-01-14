"use client";
import React from "react";
import "./Navbar.css";
import Logo from "@/assets/logo.png";
import { IoIosBody } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import AuthPopup from "../AuthPopup/AuthPopup";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const [showpopup, setShowpopup] = React.useState<boolean>(false);

  return (
    <nav>
      <Image src={Logo} alt="logo" />
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/profile">
        <IoIosBody />
      </Link>
      {isLoggedIn ? (
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
