import MaterialUISpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ShareIcon from "@mui/icons-material/Share";
import { AddReaction, DeliveryDining, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";

type Props = {
  uber: boolean;
  setUber: React.Dispatch<React.SetStateAction<boolean>>;
  headache: boolean;
  setHeadache: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpeedDial = ({ uber, setUber, headache, setHeadache }: Props) => {
  const actions = [
    {
      icon: (
        <Link to="/shops">
          <Store color={"primary"} />
        </Link>
      ),
      name: "雨の日に効く便利グッズ",
    },
    {
      icon: (
        <div
          onClick={() => {
            setUber((oldValue) => !oldValue);
          }}
        >
          {uber ? (
            <DeliveryDining color={"success"} />
          ) : (
            <DeliveryDining color={"disabled"} />
          )}
        </div>
      ),
      name: "ウーバーイーツ単価上昇マップ",
    },
    {
      icon: (
        <div
          onClick={() => {
            setHeadache((oldValue) => !oldValue);
          }}
        >
          {headache ? (
            <AddReaction color={"warning"} />
          ) : (
            <AddReaction color={"disabled"} />
          )}
        </div>
      ),
      name: "頭痛危険度マップ",
    },
    { icon: <ShareIcon color={"info"} />, name: "共有" },
  ];
  return (
    <MaterialUISpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </MaterialUISpeedDial>
  );
};

export default SpeedDial;
