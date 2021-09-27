import { useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import RenderMap from "./RenderMap";

type Props = {
  apiKey: string;
  uber: boolean;
  headache: boolean;
};

const GoogleMapContainer = ({ apiKey, uber, headache }: Props) => {
  const [currentLocation, setCurrentLocation] =
    useState<{ lat: number; lng: number }>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["visualization"],
  });
  useEffect(() => {
    if (navigator.geolocation) {
      console.log("Geolocation is supported!");
      var startPos;
      var geoSuccess = function (position: GeolocationPosition) {
        startPos = position;
        setCurrentLocation({
          lat: startPos.coords.latitude,
          lng: startPos.coords.longitude,
        });
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    } else {
      console.log("Geolocation is not supported for this Browser/OS.");
    }
  }, []);
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <RenderMap
      currentLocation={currentLocation}
      uber={uber}
      headache={headache}
    ></RenderMap>
  ) : (
    <div>Loading...</div>
  );
};

export default GoogleMapContainer;
