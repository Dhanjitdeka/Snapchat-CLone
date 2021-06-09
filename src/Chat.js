import { Avatar } from "@material-ui/core";
import React from "react";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import "./Chat.css";
import { selectImage } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { db } from "./firebase";

function Chat({ id, username, timestamp, imageUrl, read, profilePic }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function open() {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        // if we dont set merge as true it will delete the whole data
        // and replace it with read:true
        { merge: true }
      );
      history.push("/chats/view");
    }
  }
  return (
    <div className="chat" onClick={open}>
      <Avatar className="chat__avatar" src={profilePic}></Avatar>
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          {/* we have to use a module called react-timeago to convert our 
          full date and time into just seconds/minutes/hrs ago */}
          <ReactTimeago
            date={new Date(timestamp?.toDate()).toUTCString()}
          ></ReactTimeago>
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon"></StopRoundedIcon>}
    </div>
  );
}

export default Chat;
