import React, { useEffect, useState } from "react";
import "./App.css";
import { Post, ImageUploader } from "./components";
import { db, auth } from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Input } from "@material-ui/core";

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
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      //detects any changes made in authentication by user
      if (authUser) {
        //user has logged in...
        //Set authenticated users info to app state ==> "authenticated user"
        setAuthenticatedUser(authUser);
        console.log(authUser);
      } else {
        //user has logged out...
        //Set app state ==> "authenticated user" to "null"
        setAuthenticatedUser(null);
      }
    });
  }, [authenticatedUser, username]);

  useEffect(() => {
    //Getting the snapshot of each post and updating our application posts state
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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

  function userSignOut() {
    auth.signOut();
  }

  function open__signIn() {
    setOpenSignIn(true);
  }

  function close__signIn() {
    setOpenSignIn(false);
  }

  function signUp(event) {
    event.preventDefault(); //Prevent refresh on submit action
    //Using firebase authentication to sign up user with email and password
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        //Getting access to the authenticated users information
        //and updating the users generated profile name in app.
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message)); //Alert if any error was found with information on the error.

    //close sign up modal
    handleClose();
    setEmail("");
    setPassword("");
    setUsername("");
  }

  function signIn(event) {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(`We have an error, ${error}`));

    close__signIn();
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
      <Modal open={openSignIn} onClose={close__signIn}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <center className="app__signup">
              <img
                src="https:///www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="The Instagram logo"
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
              <Button onClick={signIn}>Login</Button>
            </center>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          src="https:///www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="The Instagram Logo"
          className="appLogo__header"
        />
        {authenticatedUser ? (
          <Button onClick={userSignOut}>Log Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={open__signIn}>Sign In</Button>
            <Button onClick={handleOpen}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app__feed">
        <div className="app__posts">
          {posts.map((post) => (
            <Post
              key={post.id}
              postId={post.id}
              username={post.data.username}
              caption={post.data.caption}
              imageUrl={post.data.imageUrl}
            />
          ))}
        </div>
        <div className="app__widget">
          <div className="widget">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Finstagram&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              title="Facebook Page"
              width="340"
              height="1500"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
        </div>
      </div>
      {authenticatedUser?.displayName ? (
        <ImageUploader username={authenticatedUser.displayName} />
      ) : (
        <h1>LOG IN TO UPLOAD POST</h1>
      )}
    </div>
  );
}

export default App;
