import { useEffect, useState } from "react";
import Line from "./Components/LineChart";

import Select from "./Components/Select";

import Map from "./Components/Map";

import mapLineChartDataSet from "./helperFunctions/mapLineChartDataSet";

import Countries from "./Countries.json";

import APIClass from "./API";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";

function App() {
  const [maps, setMaps] = useState([]);
  const [dataSets, setDataSets] = useState();

  const [selectedCountry, setSelectedCountry] = useState("Global");

  useEffect(() => {
    async function fetchMyAPI() {
      const covidCountryResult = await APIClass.getCovidAffectedCountries();
      setMaps(covidCountryResult.data);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    async function fetchLineChartData(selectedCountry) {
      const lineChartResult = await APIClass.getCovidHistorical(
        selectedCountry
      );

      const chartDataSets = mapLineChartDataSet(lineChartResult);

      setDataSets(chartDataSets);
    }

    fetchLineChartData(selectedCountry);
  }, [selectedCountry]);

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <Container fixed>
      <Card>
        <Map maps={maps} />
      </Card>
      <Card style={{ marginTop: "8rem" }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="space-between"
          >
            <Box>
              <Typography variant="h2" style={{ textAlign: "center" }}>
                Covid Daily Chart
              </Typography>
            </Box>
            <Box width="50%" alignSelf="center" marginBottom="5rem">
              <Select
                value={selectedCountry}
                onChange={handleChange}
                selectItems={Countries}
              />
            </Box>
            <Box>
              <Line data={dataSets} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
