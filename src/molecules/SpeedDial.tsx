import MaterialUISpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { Store } from "@mui/icons-material";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: (
      <Link to="/shops">
        <Store />
      </Link>
    ),
    name: "UberEats",
  },
  { icon: <SaveIcon />, name: "memue" },
  { icon: <PrintIcon />, name: "Food Panda" },
  { icon: <ShareIcon />, name: "Didi food" },
];

const SpeedDial = () => {
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
