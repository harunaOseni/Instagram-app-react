import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post() {
  return (
    <div className="post">
      {/* header --> avatar + username */}
      <div className="post__top">
        <Avatar className="post__avatar" src="https://pbs.twimg.com/profile_images/1401944008939745281/58R8IehR_400x400.jpg" />
        <h4>Username</h4>
      </div>

      {/* image */}
      <img
        src="https://i.insider.com/5e9dcd4215ea4b57a81e3704?width=1200&format=jpeg"
        className="post__image"
        alt=""
      />

      {/* username + caption */}
      <h4 className="post__text">
        <strong>they_call_me_seni </strong>
        The Founders of instagram coding the amazing product!
      </h4>
    </div>
  );
}

export default Post;
