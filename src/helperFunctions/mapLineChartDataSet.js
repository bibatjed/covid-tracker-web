import moment from "moment";

function colorChartPicker(labels) {
  switch (labels) {
    case "cases":
      return "red";
    case "deaths":
      return "black";
    default:
      return "green";
  }
}

export default function (lineChartDataSet) {
  //refactor thiiiiiis
  const labels = Object.keys(
    lineChartDataSet?.data?.timeline || lineChartDataSet.data
  );

  const DataSets = labels.map((labelsValue) => {
    const current =
      lineChartDataSet?.data?.timeline?.[labelsValue] ||
      lineChartDataSet.data[labelsValue];
    const dataSets = Object.entries(current).map(([key, value]) => ({
      t: moment(key).format("YYYY-MM-DD"),
      y: value,
    }));

    return {
      label: labelsValue,
      data: dataSets,
      borderColor: colorChartPicker(labelsValue),
    };
  });

  return {
    labels: Object.keys(
      lineChartDataSet?.data?.timeline?.cases || lineChartDataSet.data.cases
    ),
    datasets: DataSets,
  };
}
