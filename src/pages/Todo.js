import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import mapData from "../data/tokyo23.json";
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


  function pointsToPath(fromx, fromy, tox, toy, invertArc) {
    return 'M' + fromx + ',' + fromy + 'L' + tox + ',' + toy;
}

  const mapOptions = {
    chart: {
      // events: {
      //   load: function () {
      //     this.renderer
      //       .definition({
      //         tagName: 'marker',
      //         id: 'markerArrow',
      //         refY: 5,
      //         refX: 9,
      //         markerWidth: 11,
      //         markerHeight: 11,
      //         orient: 'auto',
      //         children: [{
      //           tagName: 'path',
      //           d: 'M 0 0 L 10 5 L 0 10 Z',
      //           fill: Highcharts.getOptions().colors[3],
      //           'stroke-width': 1,
      //           stroke: '#000000'
      //         }]
      //       });
      //   }
      // }
    },
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
        data: [
          ["13106", 1],
          ["13105", 10],
        ],
      },
      {
        name: 'London flight routes',
        type: 'mapline',
        lineWidth: 2,
        color: Highcharts.getOptions().colors[3],
        data: [{
              id: '13106',
              path: pointsToPath(342, 206, 243, 207)
          }]
      }
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
