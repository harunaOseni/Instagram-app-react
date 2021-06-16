import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "../../firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUploader({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  function handleCaption(event) {
    setCaption(event.target.value);
  }

  function handleImageFile(event) {
    //  Get the first file user selects and set it to the image state
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }

  function handleUpload() {
    //pushing the image selected to firebase storage
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Tracking progress as we upload image to storage.
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //Catch any error in uploading
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              username: username,
              imageUrl: url,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  }
  return (
    <div className="image__uploadContainer">
      <progress value={progress} max="100" className="imageUpload__progress" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={handleCaption}
        value={caption}
      />
      <input type="file" onChange={handleImageFile} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUploader;
