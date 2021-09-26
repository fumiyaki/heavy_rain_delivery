import { Typography } from "@mui/material";
import Food from "../molecules/Food";

const Shop = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        こんな今日にぴったりのアイテム
      </Typography>
      <Food
        url={"https://amzn.to/3EQvPnB"}
        name={"Uber Eats リュック"}
        yen={6800}
        img={"ryukku.png"}
        label={"鞄"}
      />
      <Food
        url={"https://amzn.to/3EPNmw8"}
        name={"はじめてのUber Eats入門講座"}
        yen={680}
        img={"book.jpg"}
        label={"本"}
      />
      <Food
        url={"https://amzn.to/3zI1qEj"}
        name={"Uber Eats 速乾 帽子"}
        yen={629}
        img={"hat.png"}
        label={"帽子"}
      />
      <Food
        url={"https://amzn.to/3ERZJYr"}
        name={"レインコート"}
        yen={2980}
        img={"raincoat.png"}
        label={"服"}
      />
      <Food
        url={"https://amzn.to/3EUOjUa"}
        name={"レインスーツ 上下"}
        yen={3750}
        img={"zyouge.png"}
        label={"服"}
      />
      <Food
        url={"https://amzn.to/3i8M31L"}
        name={"自転車用シューズカバー"}
        yen={1380}
        img={"shose.png"}
        label={"自転車"}
      />
      <Food
        url={"https://amzn.to/2XYCaga"}
        name={"空気入れ"}
        yen={1336}
        img={"kuuki.png"}
        label={"自転車用フロアポンプ"}
      />
    </div>
  );
};

export default Shop;
