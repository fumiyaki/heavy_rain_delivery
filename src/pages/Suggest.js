import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";
import Chip from "@mui/material/Chip";
import { CardActionArea } from "@mui/material";
import Food from "./Food";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      color: "white",
    },
    small: {
      fontSize: "16px",
    },
    nocard: {
      paddingBottom: "0px!important",
    },
    number: {
      color: "white",
      paddingTop: "12px!important",
      paddingBottom: "12px!important",
    },
  })
);

export default function Suggest() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        こんな今日にぴったりのアイテム
      </Typography>
      <Food url={"https://amzn.to/3EQvPnB"} name={"Uber Eats リュック"} yen={6800} img={"ryukku.png"} label={"鞄"} />
      <Food url={"https://amzn.to/3EPNmw8"} name={"はじめてのUber Eats入門講座"} yen={680} img={"book.jpg"} label={"本"} />
      <Food url={"https://amzn.to/3zI1qEj"} name={"Uber Eats 速乾 帽子"} yen={629} img={"hat.png"} label={"帽子"} />
      <Food url={"https://amzn.to/3ERZJYr"} name={"レインコート"} yen={2980} img={"raincoat.png"} label={"服"} />
      <Food url={"https://amzn.to/3EUOjUa"} name={"レインスーツ 上下"} yen={3750} img={"zyouge.png"} label={"服"} />
      <Food url={"https://amzn.to/3i8M31L"} name={"自転車用シューズカバー"} yen={1380} img={"shose.png"} label={"自転車"} />
      <Food url={"https://amzn.to/2XYCaga"} name={"空気入れ"} yen={1336} img={"kuuki.png"} label={"自転車用フロアポンプ"} />
    </div>
  );
}
