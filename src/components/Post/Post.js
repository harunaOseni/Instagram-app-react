import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";

function Post({ username, caption, imageUrl, postId }) {
  //Where our comments for each posts will be stored
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  console.log(comments);

  function handleComment(event) {
    setComment(event.target.value);
  }

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

      <form>
        <input
          type="text"
          className="comment__input"
          placeholder="Add a comment..."
          value={comment}
          onChange={handleComment}
        />
      </form>
    </div>
  );
}

export default Post;
