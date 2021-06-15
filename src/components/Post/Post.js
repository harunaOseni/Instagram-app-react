import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import db from "../../firebase";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      {/* header --> avatar + username */}
      <div className="post__top">
        <Avatar className="post__avatar" />
        <h4>{username}</h4>
      </div>

      {/* image */}
      <img src={imageUrl} className="post__image" alt="" />

      {/* username + caption */}
      <h4 className="post__text">
        <strong>{username} </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;
