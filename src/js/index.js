var cpuCtx = document.getElementById('cpuChart').getContext('2d');
var memoryCtx = document.getElementById('memoryChart').getContext('2d');
let time = performance.now();
var cpuData = [];
var memoryData = [];
var timeData = [];


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
  options: {}
});

var memoryChart = new Chart(memoryCtx, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [{
      label: "Free memory",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: memoryData,
    }]
  },

  // Configuration options go here
  options: {}
});


function App(props) {
  return (
      <table className="system-load-table">
        <tbod>
        <tr className="first_row">
          <th>CPU</th>
          <th>Total memory</th>
          <th>Free memory</th>
          <th>1 minute</th>
          <th>5 minute</th>
          <th>15 minute</th>
        </tr>
        <tr className="second-row">
          <th>{props.data['CPU']}</th>
          <th>{(props.data['TotalMemory'] / 1024).toFixed(2) + ' МБ'}</th>
          <th>{(props.data['FreeMemory'] / 1024).toFixed(2) + ' МБ'}</th>
          <th>{props.data['1minute']}</th>
          <th>{props.data['5minute']}</th>
          <th>{props.data['15minute']}</th>
        </tr>
        </tbod>
      </table>
  );
}

setInterval(function () {
  $.get('core/data.php', function (data) {
    data = JSON.parse(data);
    cpuData.push(data['CPU'] / 1);
    memoryData.push((data['FreeMemory'] / 1024).toFixed(2));
    timeData.push(((performance.now() - time) / 1000).toFixed(2));
    cpuChart.update();
    memoryChart.update();
    ReactDOM.render(<App data={data}/>, document.getElementById('root'));
  });
}, 400);









