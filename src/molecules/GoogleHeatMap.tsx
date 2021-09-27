import GoogleMapContainer from "./GoogleMapContainer";

type Props = { uber: boolean; headache: boolean };

const GoogleHeatMap = ({ uber, headache }: Props) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  if (apiKey) {
    return (
      <GoogleMapContainer uber={uber} headache={headache} apiKey={apiKey} />
    );
  } else {
    return <div>API Key Error</div>;
  }
};

export default GoogleHeatMap;
