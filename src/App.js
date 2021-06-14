import React from "react";
import "./App.css";
import { Post } from "./components";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https:///www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="The Instagram Logo"
        />
      </div>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
