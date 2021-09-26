import GoogleMapContainer from "./GoogleMapContainer";

const GoogleHeatMap = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  if (apiKey) {
    return <GoogleMapContainer apiKey={apiKey} />;
  } else {
    return <div>API Key Error</div>;
  }
};

export default GoogleHeatMap;
