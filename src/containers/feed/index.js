import React from "react";
import { firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Post from "../post";

export default function Feed() {
  // load all posts
  const [posts, loading] = useCollectionData(
    firestore.collection("posts").orderBy("timestamp", "desc"),
    {
      idField: "postID",
    }
  );

  return (
    <div className="feed">
      {posts && !loading ? (
        posts.map((post) => (
          <Post
            key={post.postID}
            postID={post.postID}
            creator={post.creator}
            creatorPhoto={post.creatorPhoto}
            imageSrc={post.imageSrc}
            message={post.message}
            comments={post.comments}
          />
        ))
      ) : (
        <div>Your feed is empty!</div>
      )}
    </div>
  );
}
