import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import Line from "./Components/LineChart";

import moment from "moment";

import { Container, Card, CardContent } from "@material-ui/core";
import axios from "axios";

function App() {
  const [maps, setMaps] = useState([]);
  const [dataSets, setDataSets] = useState();
  useEffect(() => {
    async function fetchMyAPI() {
      const result = await axios.get(
        "https://corona.lmao.ninja/v3/covid-19/countries"
      );

      setMaps(result.data);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    async function fetchLineChartData() {
      //find a better api
      const result = await axios.get(
        "https://corona.lmao.ninja/v3/covid-19/historical/all"
      ); 


      const labels = Object.keys(result.data);

      const DataSets = labels.map((labelsValue) => {
        const current = result.data[labelsValue];
        const dataSets = Object.entries(current).map(([key, value]) => ({
          t: moment(key).format("YYYY-MM-DD"),
          y: value,
        }));

        function color(labels) {
          switch (labels) {
            case "cases":
              return "red";
            case "deaths":
              return "black";
            default:
              return "green";
          }
        }

        return {
          label: labelsValue,
          data: dataSets,
          borderColor: color(labelsValue),
        };
      });

      const finalData = {
        labels: Object.keys(result.data.cases),
        datasets: DataSets,
      };

      setDataSets(finalData);
    }

    fetchLineChartData();
  }, []);

  return (
    <Container fixed>
      <Card>
        <MapContainer
          center={[0, 0]}
          zoom={1}
          style={{ height: "70vh", width: "100%" }}
          minZoom={1}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap={false}
          />

          {maps.map((map) => {
            return (
              <Marker position={[map.countryInfo.lat, map.countryInfo.long]}>
                <Popup>
                  <span style={{ display: "block" }}>
                    Country: {map.country}
                  </span>
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
      </Card>
      <Card style={{ marginTop: "8rem" }}>
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <Line data={dataSets} />
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
