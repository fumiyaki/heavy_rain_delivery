import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
createStyles({
  root: {
    color: "white",
  },
}),
);

export default function Suggest() {
const classes = useStyles();
  return (
    <div>
      <Typography variant="h4" gutterBottom component="div">商品購入</Typography>
    <Card sx={{ display: 'flex', background: "linear-gradient(to right bottom, rgb(0, 127, 255), rgb(0, 89, 178) 120%)"}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography className={classes.root} component="div" variant="h5">
            HERMESの革製Tシャツ
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            上着
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <Button variant="outlined">購入</Button>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="download.png"
        alt="Live from space album cover"
      />
    </Card>
    </div>
  );
}
