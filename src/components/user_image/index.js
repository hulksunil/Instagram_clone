import React from "react";

export default function UserImage(props) {
  const user = props.user;
  const [showMenu, setShowMenu] = [props.showMenu, props.setShowMenu];
  return (
    <button className="userImgSection" onClick={() => setShowMenu(!showMenu)}>
      <img src={user.photoURL} alt="" />
    </button>
  );
}
