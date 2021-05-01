import React, { useContext, useState } from "react";
import { UserImage } from "../../components";
import { UserContext } from "../../contexts/user";
import { signOut } from "../../services/auth";
import "./index.css";

export default function ImageDropdown() {
  const [user, setUser] = useContext(UserContext).user;
  const [showMenu, setShowMenu] = useState(false);

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div style={{ position: "relative" }}>
      {showMenu ? (
        <>
          <UserImage
            user={user}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          />
          <div className="dropDownMenu">
            <small>{user.displayName}</small>

            <button onClick={logout}>Sign out</button>
          </div>
        </>
      ) : (
        <UserImage user={user} setShowMenu={setShowMenu} showMenu={showMenu} />
      )}
    </div>
  );
}
