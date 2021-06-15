import React, { useEffect, useState } from "react";
import "./App.css";
import { Post } from "./components";
import { db } from "./firebase";
import Modal from "@material-ui/core/Modal";

function App() {
  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPost(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>I am a modal</h2>
        </div>
      </Modal>
      <div className="app__header">
        <img
          src="https:///www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="The Instagram Logo"
        />
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.data.username}
          caption={post.data.caption}
          imageUrl={post.data.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
