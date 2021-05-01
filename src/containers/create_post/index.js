import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../contexts/user";
import { firestore, storage, firebase } from "../../firebase";
import "./index.css";
import { BiImageAdd } from "react-icons/bi";

function CreatePost() {
  const initialPost = { message: "", picture: "" };
  const [post, setPost] = useState(initialPost);
  const [user] = useContext(UserContext).user;
  const [progress, setProgess] = useState(0);

  const imagePreview = useRef();
  const displayImagePreview = (e) => {
    if (e.target.files[0]) {
      // we will only do one image (better to do for more but too much extra hassle)

      // place in useState
      setPost({ ...post, picture: e.target.files[0] });
      // display preview
      let selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      imagePreview.current.src = selectedImageSrc;
    } else {
      imagePreview.current.src = undefined;
      setPost({ ...post, picture: "" });
    }
  };

  const submitPost = () => {
    // upload picture first
    let picture = post.picture;
    console.log(picture);
    // the upload task
    const uploadTask = storage.ref(`images/${picture.name}.jpg`).put(picture);

    // what to do when finished the upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgess(progress);
      },
      null,
      () =>
        storage
          .ref(`images/${picture.name}.jpg`)
          .getDownloadURL()
          .then((imageUrl) => {
            // we have the image url so now we can update firestore
            firestore.collection("posts").add({
              message: post.message,
              imageSrc: imageUrl,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              creator: user.email.replaceAll("@gmail.com", ""),
              creatorPhoto: user.photoURL,
            });

            console.log("got a url: " + imageUrl);

            // clear the form
            setPost(initialPost);

            setProgess(0);
          })
    );
  };

  return (
    <div className="createPostSection">
      <h2>Create Post</h2>
      <textarea
        value={post.message}
        placeholder="Enter Caption Message Here"
        rows={4}
        onChange={(e) => setPost({ ...post, message: e.target.value })}
      ></textarea>
      {/* The picture */}
      <div
        className="imagePreview"
        style={{ display: post.picture ? "block" : "none" }}
      >
        <img ref={imagePreview} alt="" width={120}></img>
      </div>
      <div className="createPostSection_bottom">
        <label htmlFor="imageInput">
          <BiImageAdd size={30} />
          {/* Select Images */}
        </label>
        <input
          id="imageInput"
          type="file"
          onChange={displayImagePreview}
          accept="image/*"
        />
        <input
          disabled={!post.message || !post.picture}
          type="submit"
          value={progress === 0 ? "Upload" : `${progress}% Uploading`}
          onClick={submitPost}
        />
      </div>
    </div>
  );
}

export default CreatePost;
