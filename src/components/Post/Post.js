import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import firebase from "firebase";

function Post({ username, caption, imageUrl, postId, users }) {
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
        .orderBy("timestamp", "desc")
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

  function handlePostComment(event) {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      username: users.displayName,
    });

    setComment("");
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

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      <form className="post__commentBox">
        <input
          type="text"
          className="comment__input"
          placeholder="Add a comment..."
          disabled={!users}
          value={comment}
          onChange={handleComment}
        />
        <button
          className="comment__button"
          disabled={!comment}
          type="submit"
          onClick={handlePostComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
