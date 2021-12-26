import React, { useState } from "react";
import { Grid, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import themeContext from "../themes";

const FileToText = () => {
  const [imgsSrc, setImgsSrc] = useState([]);
  const [isNoFile, setIsNoFile] = useState(true);
  const [imFile, setImFile] = useState([]);
  const [predicate, setPredicate] = useState([]);
  const [img_length, setimg_length] = useState();
  const papersLoad = [
    { paper1: 1 },
    { paper2: 2 },
    { paper3: 3 },
    { paper4: 4 },
  ];
  const theme = React.useContext(themeContext);
  let srcArray = [];
  let imgfiles = [];

  let i;

  const handleImgUpload = (e) => {
    setIsNoFile(false);

    for (i = 0; i < e.target.files.length; i++) {
      srcArray[i] = window.URL.createObjectURL(e.target.files[i]);
      imgfiles[i] = e.target.files[i];
      setPredicate((predicate) => [...predicate, true]);
    }
    setimg_length(e.target.files.length);

    setImFile([...imgfiles]);
    setImgsSrc([...srcArray]);
  };

  const fetchImgsDescribe = async () => {
    for (i = 0; i < img_length; i++) {
      const formData = new FormData();
      formData.append(`image`, imFile[i]);

      const response = await axios.post(
        "https://dffa-178-52-193-87.ngrok.io/api/upload_image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPredicate((predicate) => [...predicate, response.data.predicate]);
    }

    console.log(predicate);
  };
  const submitImgs = () => {
    setPredicate([]);
    fetchImgsDescribe();
  };

  return (
    <Grid container justifyContent="center" sx={{ m: "50px auto" }}>
      <Grid item container justifyContent="center" xs={12} spacing={2}>
        <Grid item>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleImgUpload}
            multiple
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="info" component="span">
              <Typography
                variant="button"
                sx={{
                  color: "white",
                  textShadow: ` 0 0 3px white`,
                }}
              >
                إختيار ملفات
              </Typography>
            </Button>
          </label>
        </Grid>
        <Grid item>
          <Button variant="contained" color="info" onClick={submitImgs}>
            <Typography
              variant="button"
              sx={{
                color: "white",
                textShadow: ` 0 0 3px white`,
              }}
            >
              إرسال
            </Typography>
          </Button>
        </Grid>
      </Grid>
      {isNoFile && (
        <Grid
          item
          container
          sx={{
            p: 5,
          }}
          spacing={5}
          xs={12}
        >
          {papersLoad.map((paper, index) => {
            return (
              <Grid
                key={index}
                item
                xs={11}
                sm={6}
                md={4}
                lg={3}
                sx={{ height: "15rem" }}
              >
                <Paper
                  style={{
                    width: "100%",
                    height: "100%",
                    border: `2px solid ${theme.color}`,
                  }}
                  key={paper}
                  alt=""
                ></Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
      <Grid
        item
        container
        sx={{
          p: 5,
        }}
        spacing={5}
        xs={12}
      >
        {imgsSrc.map((src, index) => {
          return (
            <Grid
              key={index}
              item
              xs={11}
              sm={6}
              md={4}
              lg={3}
              sx={{ height: "15rem" }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  border: `2px solid ${theme.color}`,
                }}
                src={src}
                alt=""
              />
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: theme.borderColor }}
              >
                {predicate[index]
                  ? predicate[index]
                  : "لم يتم العرف على الصورة"}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default FileToText;
