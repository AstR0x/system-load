var cpuCtx = document.getElementById('cpuChart').getContext('2d');
var memoryCtx = document.getElementById('memoryChart').getContext('2d');
var loadAverageCtx = document.getElementById('loadAverageChart').getContext('2d');
let time = performance.now();
var cpuData = [];
var memoryData = [];
var timeData = [];
var oneMinute = [];
var fiveMinutes = [];
var fifteenMinutes = [];

var cpuChart = new Chart(cpuCtx, {
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

  // Configuration options go here
  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          stepSize: 10
        },
        scaleLabel: {
          display: true,
          labelString: "Percentages",
          fontColor: "black"
        }
      }]
    }
  }
});

var memoryChart = new Chart(memoryCtx, {
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
          max: 500,
          stepSize: 100
        },
        scaleLabel: {
          display: true,
          labelString: "Megabytes",
          fontColor: "black"
        }
      }]
    }
  }
});

var loadAverageChart = new Chart(loadAverageCtx, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [{
      label: "1 minute",
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderColor: 'rgb(255, 99, 132)',
      data: oneMinute,
    },
      {
        label: "5 minutes",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgb(65, 99, 222)',
        data: fiveMinutes,
      },
      {
        label: "15 minutes",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgb(145, 44, 132)',
        data: fifteenMinutes,
      },]
  },

  // Configuration options go here
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


function App(props) {
  return (
      <table className="system-load-table">
        <tbody>
        <tr className="first_row">
          <th>CPU</th>
          <th>Total memory</th>
          <th>Free memory</th>
          <th>1 minute</th>
          <th>5 minutes</th>
          <th>15 minutes</th>
        </tr>
        <tr className="second-row">
          <th>{props.data['CPU']}%</th>
          <th>{(props.data['TotalMemory'] / 1024).toFixed(2) + ' МБ'}</th>
          <th>{(props.data['FreeMemory'] / 1024).toFixed(2) + ' МБ'}</th>
          <th>{props.data['oneMinute']}</th>
          <th>{props.data['fiveMinutes']}</th>
          <th>{props.data['fifteenMinutes']}</th>
        </tr>
        </tbody>
      </table>
  );
}

setInterval(function () {
  $.get('core/data.php', function (data) {
    data = JSON.parse(data);
    if (timeData.length >= 10) {
      timeData.shift();
      cpuData.shift();
      memoryData.shift();
      oneMinute.shift();
      fiveMinutes.shift();
      fifteenMinutes.shift();
    }
    cpuData.push(data['CPU'] / 1);
    memoryData.push((data['FreeMemory'] / 1024).toFixed(2));
    timeData.push(new Date().toLocaleTimeString());
    oneMinute.push(data['oneMinute']);
    fiveMinutes.push(data['fiveMinutes']);
    fifteenMinutes.push(data['fifteenMinutes']);
    cpuChart.update();
    memoryChart.update();
    loadAverageChart.update();
    ReactDOM.render(<App data={data}/>, document.getElementById('root'));
  });
}, 2000);









