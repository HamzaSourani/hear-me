import React, { useState, useRef, useContext } from "react";
import { Grid, Typography, Paper, Button, List, ListItem } from "@mui/material";
import axios from "axios";
import themeContext from "../themes";
import ButtonRecorder from "./buttonRecorder/ButtonRecorder";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
const ToSignLanguage = () => {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState([]);
  const [words, setWords] = useState([]);
  const [wordindex, setWordindex] = useState(null);
  const [isReplay, setIsReplay] = useState(false);
  const theme = useContext(themeContext);

  const video = useRef(null);

  const getTextHandler = async () => {
    const response = await axios.get(
      `http://127.0.0.1:45/api/Hearme/?sen=${text}`
    );
    const { filter, words } = response.data;

    setFilter(filter);
    setWords(words);
    let i = 0;
    let videoSrc = words.map((src) => `/assets/${src}.mp4`);

    video.current.src = videoSrc[0];
    video.current.play();
    setWordindex(0);
    const playVideo = () => {
      i++;
      if (i === words.length) {
        // video.current.pause();
        video.current.src = "/assets/سلام.mp4";
        setIsReplay(true);
      } else {
        video.current.src = videoSrc[i];
        // video.current.load();
        video.current.play();
        setWordindex(i);
      }
    };

    video.current.addEventListener("ended", playVideo, false);
  };
  const playVideos = () => {
    let i = 0;
    let videoSrc = words.map((src) => `/assets/${src}.mp4`);

    video.current.src = videoSrc[0];
    video.current.load();
    video.current.play();

    setWordindex(0);
    const playVideo = () => {
      i++;
      if (i === words.length) {
        video.current.pause();
        video.current.src = videoSrc[0];
        setIsReplay(true);
      } else {
        video.current.src = videoSrc[i];
        video.current.load();
        video.current.play();
        setWordindex(i);
      }
    };

    video.current.addEventListener("ended", playVideo, false);
  };
  const handleSubmit = () => {
    getTextHandler();
    setText("");
    setIsReplay(false);
  };
  const start = () => playVideos();
  const play = () => video.current.play();
  const pause = () => video.current.pause();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <Paper
          sx={{
            p: "80px 30px",
            mt: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            border: `1px solid ${theme.borderColor}`,
            borderWidth: "0 0 1px ",
            borderRadius: "1em",
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
          >
            <Grid item xs={12} md={8}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Grid
                  item
                  container
                  spacing={3}
                  alignItems="center"
                  justifyContent="center"
                  xs={12}
                >
                  <Grid item xs={9}>
                    <input
                      style={{
                        display: "inline-block",
                        width: " 100%",
                        minHeight: "3rem",
                        backgroundColor: "rgba(0,0,0,0)",
                        border: `2px solid ${theme.borderColor}`,
                        color: "white",
                      }}
                      placeholder=" قم بإدخال نص من اجل التحويل"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />

                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      color="info"
                      sx={{ mt: 1 }}
                    >
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
                  <Grid item alignSelf="flex-start" xs={3}>
                    <ButtonRecorder setText={setText} />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      padding: "16px",
                      borderRight: `2px solid ${theme.color}`,
                    }}
                  >
                    <List sx={{ display: "flex", flexWrap: "wrap" }}>
                      <ListItem sx={{}}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.borderColor,
                          }}
                        >
                          النص المعالج:
                        </Typography>
                      </ListItem>

                      {filter.map((item, index) => {
                        return (
                          <ListItem key={index} sx={{ flexBasis: "8%" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                color: theme.color,
                              }}
                            >
                              {item}
                            </Typography>
                          </ListItem>
                        );
                      })}
                    </List>
                    <List sx={{ display: "flex", flexWrap: "wrap" }}>
                      <ListItem sx={{ flexBasis: "8%" }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: theme.borderColor,
                          }}
                        >
                          الكلمات:
                        </Typography>
                      </ListItem>
                      {words.map((item, index) => {
                        return (
                          <ListItem key={index} sx={{ flexBasis: "8%" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                color:
                                  wordindex === index ? "white" : theme.color,
                              }}
                            >
                              {item}
                            </Typography>
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <video
                ref={video}
                src="/assets/0.mp4"
                width="100%"
                style={{ border: `2px solid ${theme.color}` }}
              ></video>
              {isReplay && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-around"
                  sx={{
                    border: `2px solid ${theme.color}`,
                    borderWidth: "0px 2px 2px",
                  }}
                >
                  <IconButton onClick={pause}>
                    <PauseCircleOutlineIcon sx={{ color: theme.borderColor }} />
                  </IconButton>
                  <IconButton onClick={start}>
                    <Typography sx={{ color: theme.borderColor }}>
                      start
                    </Typography>
                  </IconButton>
                  <IconButton onClick={play}>
                    <PlayCircleOutlineIcon sx={{ color: theme.borderColor }} />
                  </IconButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ToSignLanguage;
