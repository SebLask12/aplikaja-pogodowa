export default chartConfig = {
  type: "line",
  data: {
    labels: timeArr,
    datasets: [
      {
        label: "Temperature [℃]",
        data: tempArr,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
      {
        label: "Humidity [%]",
        data: humidityArr,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  },
};
