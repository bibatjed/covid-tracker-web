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

      {props?.maps?.map((map, index) => {
        return (
          <Marker
            key={`${index}${map.countryInfo.lat}${map.countryInfo.long}`}
            position={[map.countryInfo.lat, map.countryInfo.long]}
          >
            <Popup key={index}>
              <span key={`${index}${map.country}`} style={{ display: "block" }}>
                Country: {map.country}
              </span>
              <span key={`${index}${map.cases}`} style={{ display: "block" }}>
                Cases: {map.cases}
              </span>
              <span
                key={`${index}${map.recovered}`}
                style={{ display: "block" }}
              >
                Recovered: {map.recovered}
              </span>
              <span key={`${index}${map.deaths}`} style={{ display: "block" }}>
                Deaths: {map.deaths}
              </span>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
