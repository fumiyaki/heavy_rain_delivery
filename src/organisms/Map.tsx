import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "../data/tokyo23.json";
import highchartsMap from "highcharts/modules/map";
highchartsMap(Highcharts);

const setLocation = (position: GeolocationPosition) => {
  // 緯度・経度を取得
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  // 緯度・経度を表示
  console.log(lat, lon);
};

// エラー時に呼び出される関数
const showErr = (positionError: GeolocationPositionError) => {
  if (positionError.code === 1) {
    alert("位置情報の利用が許可されていません");
  } else if (positionError.code === 2) {
    alert("デバイスの位置が判定できません");
  } else if (positionError.code === 3) {
    alert("タイムアウトしました");
  } else {
    alert(positionError.message);
  }
};

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

const Map = () => {
  const mapOptions: Highcharts.Options = {
    title: {
      text: "ここここおここここｋ",
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
        type: "heatmap",
        animation: {
          defer: 1000,
        },
        dataLabels: {
          enabled: true,
          color: "#FFFFFF",
        },
        mapData: mapData,
        name: "単価",
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
};

export default Map;
