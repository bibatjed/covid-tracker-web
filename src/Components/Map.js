import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map(props) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
      style={{ height: "70vh", width: "100%" }}
      minZoom={1}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={false}
      />

      {props?.maps?.map((map) => {
        return (
          <Marker position={[map.countryInfo.lat, map.countryInfo.long]}>
            <Popup>
              <span style={{ display: "block" }}>Country: {map.country}</span>
              <span style={{ display: "block" }}>Cases: {map.cases}</span>
              <span style={{ display: "block" }}>
                Recovered: {map.recovered}
              </span>
              <span style={{ display: "block" }}>Deaths: {map.deaths}</span>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
