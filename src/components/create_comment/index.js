import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import { firestore } from "../../firebase";
import "./create_comment.css";

export default function CreateComment({ postID, postComments }) {
  const [comment, setComment] = useState("");
  const [user] = useContext(UserContext).user;
  const [comments] = useState(postComments ? postComments : []);

  const commentOnPost = (e) => {
    e.preventDefault();

    // add the comment to the list of comments
    comments.push({
      message: comment,
      commenter: user.email.replaceAll("@gmail.com", ""),
      commenterPic: user.photoURL,
    });

    // update the database
    firestore.collection("posts").doc(postID).update({
      comments: comments,
    });

    // clear the field
    setComment("");
  };

  return (
    <form onSubmit={(e) => commentOnPost(e)} className="postComment">
      <img src={user.photoURL} alt=""></img>
      <input
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input type="submit" value="Comment" />
    </form>
  );
}
