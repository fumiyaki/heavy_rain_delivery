import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createStyles, makeStyles } from "@mui/styles";
import Chip from "@mui/material/Chip";
import { CardActionArea } from "@mui/material";

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
    pt: {
      paddingTop: "16px!important",
    }
  })
);

export default function Food(props) {
  const classes = useStyles();
  return (
    <div className={classes.pt}>
      <CardActionArea href={props.url}>
        <Card
          sx={{
            display: "flex",
            background:
              "linear-gradient(to right bottom, rgb(0, 127, 255), rgb(0, 89, 178) 120%)",
          }}
        >
          <Box
            className={classes.nocard}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <CardContent className={classes.nocard} sx={{ flex: "1 0 auto" }}>
              <Typography className={classes.root} component="div" variant="h5">
                {props.name} <Chip className={classes.root} label={props.label} variant="outlined" />
              </Typography>
              <Typography
                className={classes.number}
                component="div"
                variant="h5"
              >
                {props.yen} <span className={classes.small}>yen</span>
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={props.img}
          />
        </Card>
      </CardActionArea>
    </div>
  );
}
