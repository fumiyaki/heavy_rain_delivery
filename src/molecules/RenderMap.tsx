import { GoogleMap, HeatmapLayer, Marker } from "@react-google-maps/api";
import { useCallback } from "react";
import { dataSets } from "../dataSets";

type Props = {
  currentLocation: { lat: number; lng: number } | undefined;
  uber: boolean;
  headache: boolean;
};
const RenderMap = ({ currentLocation, uber, headache }: Props) => {
  const onLoad = useCallback((map: google.maps.Map) => {}, []);
  let mapDatas = dataSets.data
    .filter((prefTestData) => prefTestData.length !== 0)
    .map((prefTestData) => {
      const data = {
        location: new google.maps.LatLng(
          prefTestData[0].lat,
          prefTestData[0].lon
        ),
        weight: prefTestData[0].uber_bonus,
      };
      console.log({ data });

      return data;
    });
  mapDatas.push({
    location: new google.maps.LatLng(35.7067, 139.8683),
    weight: 0,
  });
  console.log({ mapDatas });

  const options = {
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
  };

  const center = { lat: 35.68944, lng: 139.73167 };
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const headacheGradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];
  const headacheMapData = dataSets.data
    .filter((prefTestData) => prefTestData.length !== 0)
    .map((prefTestData) => {
      const data = {
        location: new google.maps.LatLng(
          prefTestData[0].lat + 1 * 0.001,
          prefTestData[0].lon
        ),
        weight:
          prefTestData[0].headache !== null ? prefTestData[0].headache : 0,
      };
      return data;
    });

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
      onLoad={onLoad}
    >
      {uber && <HeatmapLayer options={{ radius: 100 }} data={mapDatas} />}
      {headache && (
        <HeatmapLayer
          options={{ radius: 100, gradient: headacheGradient }}
          data={headacheMapData}
        />
      )}

      {currentLocation && (
        <Marker
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={currentLocation}
        />
      )}
    </GoogleMap>
  );
};

export default RenderMap;

// "arpress": 1019, // 気圧
// "date": "2021-09-26T03:00:00+09:00", // Date
// "feelidx": 5, // 体感インデックス　1が厳しい寒さ　10が厳しい暑さ
// "feeltmp": 20, //
// "prec": 0,
// "rhum": 72,// 湿度
// "temp": 19.5,
// "wndspd": 2.1, //風力
// "name": "千代田区",
// "bonus": 0,　０〜６まで　０はボーナス０　６はボーナス1.6
// "pollen": 8,　０〜１０
// "uv": 7,　紫外線０〜１０
// "pm": 3,　PM2.5　０〜１０
// "flood": 1　フラッド　河の反乱被害　リスク０〜１０
