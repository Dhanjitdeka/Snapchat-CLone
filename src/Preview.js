import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Preview.css";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { db, storage } from "./firebase";
import firebase from "firebase";
import { v4 as uuid } from "uuid"; //we need an unique id to upload our images to the database
import { selectUser } from "./features/appSlice";
function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);
  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  const sendPost = () => {
    const id = uuid(); //generates a random string
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false, //after 10 secs we will change it to true so that user cant see the picture
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(), //this gives us consistent timestamp regardless of our timezone
            });
            history.push("./chats");
          });
      }
    );
  };
  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close"></CloseIcon>
      <div className="preview__toolbarRight">
        <TextFieldsIcon></TextFieldsIcon>
        <CreateIcon></CreateIcon>
        <NoteIcon></NoteIcon>
        <MusicNoteIcon></MusicNoteIcon>
        <AttachFileIcon></AttachFileIcon>
        <CropIcon></CropIcon>
        <TimerIcon></TimerIcon>
      </div>

      <img src={cameraImage}></img>
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview__sendIcon"></SendIcon>
      </div>
    </div>
  );
}

export default Preview;
