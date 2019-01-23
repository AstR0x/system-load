const cpuCtx = document.getElementById('cpuChart').getContext('2d');
const memoryCtx = document.getElementById('memoryChart').getContext('2d');
const loadAverageCtx = document.getElementById('loadAverageChart').getContext('2d');
const cpuData = [];
const memoryData = [];
const timeData = [];
const oneMinuteData = [];
const fiveMinutesData = [];
const fifteenMinutesData = [];

const cpuChart = new Chart(cpuCtx, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [{
      label: "CPU",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: cpuData,
    }]
  },

  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          stepSize: 20
        },
        scaleLabel: {
          display: true,
          labelString: "PERCENTAGES",
          fontColor: "#c0c0c0"
        }
      }]
    }
  }
});

const memoryChart = new Chart(memoryCtx, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [{
      label: "Free memory",
      backgroundColor: 'rgb(16, 115, 181)',
      borderColor: 'rgb(16, 115, 181)',
      data: memoryData,
    }]
  },

  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: getData()['TotalMemory'] / 1024,
          stepSize: getData()['TotalMemory'] / 4096
        },
        scaleLabel: {
          display: true,
          labelString: "MEGABYTES",
          fontColor: "#c0c0c0"
        }
      }]
    }
  }
});

const loadAverageChart = new Chart(loadAverageCtx, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [{
      label: "1 minute",
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(255, 99, 132)',
      data: oneMinuteData,
    },
      {
        label: "5 minutes",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgb(65, 99, 222)',
        data: fiveMinutesData,
      },
      {
        label: "15 minutes",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgb(145, 44, 132)',
        data: fifteenMinutesData,
      },]
  },

  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 0.50
        }
      }]
    }
  }
});

function renderCharts(data) {
  if (timeData.length >= 10) {
    timeData.shift();
    cpuData.shift();
    memoryData.shift();
    oneMinuteData.shift();
    fiveMinutesData.shift();
    fifteenMinutesData.shift();
  }
  cpuData.push(data['CPU'] / 1);
  memoryData.push((data['FreeMemory'] / 1024).toFixed(2));
  timeData.push(new Date().toLocaleTimeString());
  oneMinuteData.push(data['oneMinute']);
  fiveMinutesData.push(data['fiveMinutes']);
  fifteenMinutesData.push(data['fifteenMinutes']);
  cpuChart.update();
  memoryChart.update();
  loadAverageChart.update();
}



