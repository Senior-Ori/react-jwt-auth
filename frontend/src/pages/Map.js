import React, { useEffect, useState } from "react";
import PageContent from "../components/PageContent";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "../components/DraggableMarker";
import useDummyJsonFetch from "../hooks/useDummyJsonFetch";

function MapPage() {
  // State to manage whether the button has been clicked
  const [isClicked, setIsclicked] = useState(false);

  // Handler function to toggle the isClicked state
  const onClickHandler = () => {
    setIsclicked((prev) => !prev);
  };

  // Use the useEffect hook to apply styles directly to the map container element
  useEffect(() => {
    // Access the map container using its DOM ID
    const mapElement = document.getElementById("map-container");
    // If the element exists, update its borderRadius style based on isClicked state
    if (mapElement) {
      mapElement.style.borderRadius = isClicked ? "2rem" : "1rem";
    }
  }, [isClicked]); // This effect depends on the isClicked state

  const center = { lat: 33.104427, lng: 35.102861 };
  const jsonUrl = "mypolygons.json";
  const {
    data: polygonData,
    isLoading: polygonIsLoading,
    error: polygonError,
  } = useDummyJsonFetch({ url: jsonUrl });

  const polyList =
    polygonData &&
    Object.entries(polygonData).map(([key, value]) => (
      <Polygon
        key={crypto.randomUUID()}
        pathOptions={{ color: "purple" }}
        positions={value.shape}
      >
        <Tooltip
          direction="top"
          position={{ lat: value.origin[0], lng: value.origin[1] }}
          opacity={1}
          permanent
        >
          {value.title} ,[{value.origin}]
        </Tooltip>
        <Popup minWidth={400}>
          <h1>{value.massege}</h1>
        </Popup>
      </Polygon>
    ));

  if (polygonIsLoading) return <div>Loading...</div>;
  if (polygonError)
    return (
      <>
        <h3>Error loading the polygons, Error: </h3>
        <p>{String(polygonError)}</p>
      </>
    );

  polygonData && console.log(polygonData);
  return (
    <PageContent title="This is a map!">
      <MapContainer
        id="map-container"
        style={{ borderRadius: "1rem" }}
        center={[center.lat, center.lng]}
        zoom={6}
        scrollWheelZoom={true}
      >
        {polyList}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker center={center} />
      </MapContainer>
      <button onClick={onClickHandler}>
        {isClicked ? "yes" : "no"} {/* Display text based on isClicked state */}
      </button>
    </PageContent>
  );
}

export default MapPage;
