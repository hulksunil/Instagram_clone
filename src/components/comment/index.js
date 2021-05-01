import React from "react";
import "./index.css";

export default function Comment({ photo, commenter, comment }) {
  return (
    <div className="comment">
      <img src={photo} alt="" />
      <small>
        <b>{commenter}</b> {comment}
      </small>
    </div>
  );
}
