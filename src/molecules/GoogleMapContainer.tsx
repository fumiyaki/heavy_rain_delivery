import { useLoadScript } from "@react-google-maps/api";
import RenderMap from "./RenderMap";

type Props = {
  apiKey: string;
};

const GoogleMapContainer = ({ apiKey }: Props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ["visualization"],
  });
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? <RenderMap></RenderMap> : <div>Loading...</div>;
};

export default GoogleMapContainer;
