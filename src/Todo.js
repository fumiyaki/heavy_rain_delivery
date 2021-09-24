import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "./data/tokyo23.json";
import highchartsMap from "highcharts/modules/map";
highchartsMap(Highcharts);

function setLocation(pos) {
  // 緯度・経度を取得
  let lat = pos.coords.latitude;
  let lon = pos.coords.longitude;

  // 緯度・経度を表示
  console.log(lat, lon);
}

// エラー時に呼び出される関数
function showErr(err) {
  switch (err.code) {
    case 1:
      alert("位置情報の利用が許可されていません");
      break;
    case 2:
      alert("デバイスの位置が判定できません");
      break;
    case 3:
      alert("タイムアウトしました");
      break;
    default:
      alert(err.message);
  }
}

// geolocation に対応しているか否かを確認
if ("geolocation" in navigator) {
  var opt = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };
  navigator.geolocation.getCurrentPosition(setLocation, showErr, opt);
} else {
  alert("ブラウザが位置情報取得に対応していません");
}

export default function Todo() {
  const mapOptions = {
    title: {
      text: "",
    },
    mapNavigation: {
      enabled: true,
    },

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
        },
      ],
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "bottom",
    },
    colorAxis: {
      min: 1,
      type: "logarithmic",
      minColor: "#EEEEFF",
      maxColor: "#000022",
      stops: [
        [0, "#EFEFFF"],
        [0.67, "#4444FF"],
        [1, "#000022"],
      ],
    },
    series: [
      {
        animation: {
          duration: 1000,
        },
        dataLabels: {
          enabled: true,
          color: "#FFFFFF",
        },
        mapData: mapData,
        name: "単価",
        states: {
          hover: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        data: [
          ["13106", 1],
          ["13105", 10],
        ],
      },
      {
        type: "mapline",
        name: "Separators",
        data: Highcharts.geojson(mapData, "mapline"),
        nullColor: "gray",
        showInLegend: false,
        enableMouseTracking: false,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        options={mapOptions}
        constructorType={"mapChart"}
        highcharts={Highcharts}
      />
    </div>
  );
}
