import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import themeContext from "../themes";
const Home = () => {
  const theme = useContext(themeContext);
  const loremIpsum = [
    `إنه ليس مجرد مترجم تقليدي ، نظامنا متاح دائمًا كموقع ويب ، سنقوم ببناء واجهة برمجة تطبيقات لاستخدامها لدمج لغة الإشارة مع التطبيقات الأخرى ، وسيكون النظام قادرًا على ترجمة المقالات ونتطلع لاستخدامها للترفيه ، سيكون للموقع القدرة على إنشاء غرفة دردشة بين المستخدمين (الصم و السليم) ، وسيحتوي النظام على قاموس شخصي يمكّنه من إضافة الكلمات التي يستخدمها أكثر من غيره دون أن يكون في النظام نحن على استعداد لإنشاء خلفيات مختلفة اعتمادًا على موقع المستخدم لأننا نعلم أن لغات الإشارة تختلف من منطقة إلى أخرى ، لذلك نحاول جمع مجموعة بيانات لكل منطقة من خلال التواصل مع مراكز لغة الإشارة المحلية. `,
  ];
  return (
    <Grid container justifyContent="center" sx={{ m: "60px 0" }}>
      <Grid item xs={10} lg={8}>
        <Card
          sx={{
            p: 5,
            borderRadius: "1em",
            backgroundColor: "rgba(0,0,0,0.5)",
            border: `1px solid ${theme.borderColor}`,
            borderWidth: "0 0 1px ",
          }}
        >
          <CardMedia
            sx={{
              background: "radial-gradient(#37b5f0, #09f3c6e6)",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "1em",
            }}
          >
            <Avatar sx={{ width: 300, height: 300 }}>
              <img
                src="./images/signlanguage1.jpg"
                alt="signlanguage"
                width="100%"
              />
            </Avatar>
          </CardMedia>
          <CardContent>
            <Typography
              variant="body1"
              sx={{
                color: theme.color,
              }}
            >
              {loremIpsum}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
