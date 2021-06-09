import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useDispatch } from "react-redux";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router";
import "./WebCamCapture.css";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebCamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imgSrc));
    history.push("./preview");
  }, [webcamRef]);
  return (
    <div className="webcamCapture">
      <Webcam
        className="webcamCapture__webcam"
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      ></Webcam>
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      ></RadioButtonUncheckedIcon>
    </div>
  );
}

export default WebCamCapture;
