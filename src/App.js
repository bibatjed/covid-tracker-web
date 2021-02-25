import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [maps, setMaps] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      const result = await axios.get(
        "https://corona.lmao.ninja/v3/covid-19/countries"
      );

      setMaps(result.data);
    }

    fetchMyAPI();
  }, []);

  return (
    <div style={{ width: '100%', height: '90vh'}}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        minZoom={2}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {maps.map((map) => {
          return (
            <Marker position={[map.countryInfo.lat, map.countryInfo.long]}>
              <Popup>
                <span style={{ display: "block" }}>Country: {map.country}</span>
                <span style={{ display: "block" }}>Cases: {map.cases}</span>
                <span style={{ display: "block" }}>Deaths: {map.deaths}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;
