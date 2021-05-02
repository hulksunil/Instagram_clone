import React, { useContext, useState } from "react";
import { Comment, CreateComment } from "../../components";
import { UserContext } from "../../contexts/user";
import "./index.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function Post(props) {
  const [user] = useContext(UserContext).user;

  const [isHearted, setIsHearted] = useState(false);

  const likePost = () => {
    setIsHearted(!isHearted);
  };

  const creatorPhoto = props.creatorPhoto;
  const creator = props.creator;
  const imageSrc = props.imageSrc;
  const message = props.message;
  const comments = props.comments;
  const postID = props.postID;
  return (
    <div className="post">
      <div className="post_top">
        <img src={creatorPhoto} alt="" width={30} />
        <p>{creator}</p>
      </div>
      <img src={imageSrc} alt="" />
      <div className="post_bottom">
        <button onClick={likePost} className="heartButton">
          {isHearted ? <BsHeartFill size={18} /> : <BsHeart size={18} />}
        </button>
        <p className="captionMsg">
          <b>{creator}</b> {message}
        </p>
      </div>
      <div className="commentsSection">
        {/* We can use the index here since it will never change */}

        {comments && comments.length > 0 ? (
          <div className="postComments">
            {comments.map((comment, index) => (
              <Comment
                key={index}
                photo={comment.commenterPic}
                commenter={comment.commenter}
                comment={comment.message}
              />
            ))}
          </div>
        ) : (
          <p className="noComments">No comments. Be the first to comment</p>
        )}

        {/* Let them comment if they're signed in */}
        {user ? (
          <CreateComment postID={postID} postComments={comments} />
        ) : null}
      </div>
    </div>
  );
}
