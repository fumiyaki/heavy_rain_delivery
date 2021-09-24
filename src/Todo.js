import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import mapData from "./data/alljapan.json";
import highchartsMap from "highcharts/modules/map";
highchartsMap(Highcharts);
export default function Todo() {
  const mapOptions = {
    title: {
      text: "d",
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, "#EFEFFF"],
        [0.67, "#4444FF"],
        [1, "#000022"],
      ],
    },
    series: [
      {
        mapData: mapData,
        name: "Norway",
        data: [],
      },
    ],
  };

  return (
    <div>
      <h2>Highcharts</h2>
      <HighchartsReact
        options={mapOptions}
        constructorType = { 'mapChart' }
        highcharts={Highcharts}
      />
    </div>
  );
}
