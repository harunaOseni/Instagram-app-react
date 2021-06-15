import React, { useEffect, useState } from "react";
import "./App.css";
import { Post } from "./components";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      //detects any changes made in authentication by user
      if (authUser) {
        //user has logged in...
        setAuthenticatedUser(authUser);

        
      } else {
        //user has logged out...
        setAuthenticatedUser(null);
      }
    });
  }, []);

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

  function updateEmail(event) {
    setEmail(event.target.value);
  }

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateUsername(event) {
    setUsername(event.target.value);
  }

  function signUp(event) {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  }

  return (
    <div className="app">
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <center className="app__signup">
              <img
                src="https:///www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="The Instagram logo"
              />

              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={updateUsername}
              />

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={updateEmail}
              />
              <Input
                type="text"
                value={password}
                onChange={updatePassword}
                placeholder="password"
              />
              <Button onClick={signUp}>Login</Button>
            </center>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          src="https:///www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="The Instagram Logo"
        />
      </div>
      <Button onClick={handleOpen}>Sign Up</Button>
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
