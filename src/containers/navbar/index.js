import React, { useContext } from "react";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";
import instagram from "../../instagram.svg";
import ImageDropdown from "../image_dropdown";
import "./index.css";

function Navbar() {
  const [user] = useContext(UserContext).user;

  return (
    <header className="navbar">
      <a href="home">
        <img src={instagram} className="App-logo" width={40} alt="logo" />
      </a>
      {user ? <ImageDropdown /> : <SignInBtn />}
    </header>
  );
}

export default Navbar;
