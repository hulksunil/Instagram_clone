import React, { useContext } from "react";
import { CreatePost, Feed } from "../../containers";
import Navbar from "../../containers/navbar";
import { UserContext } from "../../contexts/user";
import "./index.css";

function Home() {
  const [user] = useContext(UserContext).user;

  return (
    <div className="homePage">
      <Navbar />
      <section className="mainContent">
        {user ? (
          <CreatePost />
        ) : (
          <div className="notLoggedinMessage">
            <p>You're missing out! Sign in to create a post</p>
          </div>
        )}
        <Feed />
      </section>
    </div>
  );
}

export default Home;
