import React from "react";
import Webcam from "react-webcam";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import themeContext from "../themes";
const ImageToText = () => {
  const webcamRef = React.useRef(null);
  const [predicate, setPredicate] = React.useState(true);
  const [isCapturesNow, setIsCapturesNow] = React.useState(false);
  const theme = React.useContext(themeContext);
  const dataURLtoFile = (dataUrl, filename) => {
    let temp = dataUrl.split(","),
      mime = temp[0].match(/:(.*?);/)[1],
      bstr = atob(temp[1]),
      index = bstr.length,
      unit8Array = new Uint8Array(index);

    while (index--) {
      unit8Array[index] = bstr.charCodeAt(index);
    }

    return new File([unit8Array], filename, { type: mime });
  };

  const capture = React.useCallback(() => {
    setIsCapturesNow(true);
    let timeOut = setTimeout(() => setIsCapturesNow(false), 250);
    setIsCapturesNow(true);
    const webimageSrc = webcamRef.current.getScreenshot();
    let imgfile = dataURLtoFile(webimageSrc, "client.jpg");
    const formData = new FormData();
    formData.append("image", imgfile);
    (async () => {
      const response = await axios.post(
        "https://dffa-178-52-193-87.ngrok.io/api/upload_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPredicate(response.data.predicate);
      console.log(response.data);
    })();
    return () => clearTimeout(timeOut);
  }, [webcamRef, setPredicate]);

  return (
    <Grid container justifyContent="center" spacing={3} sx={{ p: 5 }}>
      <Grid item xs={12} md={10} lg={8}>
        <Webcam
          width="70%"
          style={{
            display: "block",
            margin: "auto",
            transform: " all .5s ease-in-out ",
            border: `2px solid ${theme.color}`,
            boxShadow: isCapturesNow ? ` 0 0 6px 1px ${theme.shadow}` : "",
            borderRadius: "2em",
          }}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: theme.borderColor, mt: 2 }}
        >
          {!predicate ? "لم يتم التعرف على الصورة" : predicate}
        </Typography>
      </Grid>
      <Grid item container justifyContent="center" xs={12}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="info"
            sx={{ display: "block", m: "auto" }}
            onClick={capture}
          >
            <Typography
              variant="button"
              sx={{
                color: "white",
                textShadow: ` 0 0 3px white`,
              }}
            >
              إلتقاط صورة
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImageToText;
