import React from "react";
import PageContent from "../components/PageContent";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DraggableMarker from "../components/DraggableMarker";
import useDummyJsonFetch from "../hooks/useDummyJsonFetch";

function MapPage() {
  const center = { lat: 51.505, lng: -0.09 };
  const jsonUrl = "mypolygons.json";
  const {
    data: polygonData,
    isLoading: polygonIsLoading,
    error: polygonError,
  } = useDummyJsonFetch({ url: jsonUrl });
  if (polygonIsLoading) return <div>Loading...</div>;
  if (polygonError)
    return (
      <>
        <h1>Error loading the polygons, Error: </h1>
        <p>{String(polygonError)}</p>
      </>
    );

  polygonData && console.log(polygonData);
  return (
    <PageContent title="This is a map!">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker center={center} />
      </MapContainer>
    </PageContent>
  );
}

export default MapPage;
