import GoogleHeatMap from "../molecules/GoogleHeatMap";
import SpeedDial from "../molecules/SpeedDial";
import { useState } from "react";

const Home = () => {
  const [uber, setUber] = useState(true);
  const [headache, setHeadache] = useState(false);
  return (
    <>
      <GoogleHeatMap uber={uber} headache={headache} />
      <SpeedDial
        uber={uber}
        setUber={setUber}
        headache={headache}
        setHeadache={setHeadache}
      />
    </>
  );
};

export default Home;
