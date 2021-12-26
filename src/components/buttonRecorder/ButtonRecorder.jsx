import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import MicNoneIcon from "@mui/icons-material/MicNone";
import "./buttonRecorder.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const ButtonRecorder = ({ setText }) => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  useEffect(() => {
    if (listening === false) setText(transcript);
  }, [listening, setText, transcript]);
  if (!browserSupportsSpeechRecognition)
    return <p>your browser does not support speech recognition </p>;
  return (
    <>
      <Button
        id="recorderbtn"
        className="recordContaner"
        variant="contained"
        sx={{ ".MuiButton-endIcon": { ml: 0 } }}
        color="info"
        endIcon={<MicNoneIcon style={{ fontSize: "35px", color: "white" }} />}
        onClick={() => SpeechRecognition.startListening({ language: "ar-LB" })}
      >
        <div
          className={`${listening ? "recordContainer" : "unrecordContaner"}`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Button>
    </>
  );
};

export default ButtonRecorder;
