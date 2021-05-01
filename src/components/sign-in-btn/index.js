import React, { useContext, useEffect } from "react";
import "./index.css";
import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../contexts/user";

export default function SignInBtn() {
  const [user, setUser] = useContext(UserContext).user;

  useEffect(() => {
    console.log("User is: " + (user ? user.displayName : "null"));
  });

  const signIn = async () => {
    let signInUser = await signInWithGoogle();

    if (signInUser) {
      setUser(signInUser);
    }
  };

  return (
    <button type="button" className="signInBtn" onClick={signIn}>
      Sign In
    </button>
  );
}
