import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import mapData from "./data/tokyo23.json";
import highchartsMap from "highcharts/modules/map";
highchartsMap(Highcharts);

function setLocation(pos){

	// 緯度・経度を取得
	let lat = pos.coords.latitude;
	let lon = pos.coords.longitude;

	// 緯度・経度を表示
	console.log(lat,lon);
}

// エラー時に呼び出される関数
function showErr(err){
	switch(err.code){
		case 1 : alert("位置情報の利用が許可されていません"); break;
		case 2 : alert("デバイスの位置が判定できません"); break;
		case 3 : alert("タイムアウトしました"); break;
		default : alert(err.message);
	}
}

// geolocation に対応しているか否かを確認
if("geolocation" in navigator){
	var opt = {
		"enableHighAccuracy": true,
		"timeout": 10000,
		"maximumAge": 0,
	};
	navigator.geolocation.getCurrentPosition(setLocation, showErr, opt);
}else{
	alert("ブラウザが位置情報取得に対応していません");
}

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
      <h2>Tokyo 23Cities</h2>
      <HighchartsReact
        options={mapOptions}
        constructorType = { 'mapChart' }
        highcharts={Highcharts}
      />
    </div>
  );
}
