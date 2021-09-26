import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import { CardActionArea } from "@mui/material";

type Props = {
  url: string;
  name: string;
  yen: number;
  img: string;
  label: string;
};

const useStyles = makeStyles({
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
  },
});

export default function Food({ img, label, name, url, yen }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.pt}>
      <CardActionArea href={url}>
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
                {name}{" "}
                <Chip
                  className={classes.root}
                  label={label}
                  variant="outlined"
                />
              </Typography>
              <Typography
                className={classes.number}
                component="div"
                variant="h5"
              >
                {yen} <span className={classes.small}>yen</span>
              </Typography>
            </CardContent>
          </Box>
          <CardMedia component="img" sx={{ width: 151 }} image={img} />
        </Card>
      </CardActionArea>
    </div>
  );
}
