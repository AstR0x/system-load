import React from 'react'
import Chart from 'chart.js'
import URL from '../address'

class Charts extends React.Component {
  constructor(props) {
    super(props);

    const data = this.getData();

    this.state = {
      cpuData: [data['CPU']],
      memoryData: [data['FreeMemory']],
      timeData: [new Date().toLocaleTimeString()],
      oneMinuteData: [data['oneMinute']],
      fiveMinutesData: [data['fiveMinutes']],
      fifteenMinutesData: [data['fifteenMinutes']],
      data: data
    };

    this.changeCharts();
  }

  componentDidMount() {
    const cpuCtx = document.getElementById('cpuChart').getContext('2d');
    const memoryCtx = document.getElementById('memoryChart').getContext('2d');
    const loadAverageCtx = document.getElementById('loadAverageChart').getContext('2d');

    this.cpuChart = new Chart(cpuCtx, {
      type: 'line',
      data: {
        labels: this.state.timeData,
        datasets: [{
          label: "CPU",
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.state.cpuData,
        }]
      },

      options: {
        legend: {
          labels: {
            fontColor: "white",
            fontSize: 18
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.5
            },
            ticks: {
              fontColor: "white",
              fontSize: 12,
            }
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.5
            },
            ticks: {
              fontColor: "white",
              fontSize: 12,
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

    this.memoryChart = new Chart(memoryCtx, {
      type: 'line',
      data: {
        labels: this.state.timeData,
        datasets: [{
          label: "Free memory",
          backgroundColor: 'rgba(16, 115, 181, 0.2)',
          borderColor: 'rgb(16, 115, 181)',
          data: this.state.memoryData,
        }]
      },

      options: {
        legend: {
          labels: {
            fontColor: "white",
            fontSize: 18
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 12,
            },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.5
            },
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.5
            },
            ticks: {
              fontColor: "white",
              fontSize: 12,
              min: 0,
              max: this.state.data['TotalMemory'],
              stepSize: this.state.data['TotalMemory'] / 4,
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

    this.loadAverageChart = new Chart(loadAverageCtx, {
      type: 'line',
      data: {
        labels: this.state.timeData,
        datasets: [{
          label: "1 minute",
          backgroundColor: 'rgba(255, 99, 132, 0.05)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.state.oneMinuteData,
        },
          {
            label: "5 minutes",
            backgroundColor: 'rgba(65, 99, 222, 0.05)',
            borderColor: 'rgb(65, 99, 222)',
            data: this.state.fiveMinutesData,
          },
          {
            label: "15 minutes",
            backgroundColor: 'rgba(145, 44, 132, 0.05)',
            borderColor: 'rgb(145, 44, 132)',
            data: this.state.fifteenMinutesData,
          },]
      },

      options: {
        legend: {
          labels: {
            fontColor: "white",
            fontSize: 18
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 12,
            },
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.5
            },
          }],
          yAxes: [{
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 0.5
            },
            ticks: {
              fontColor: "white",
              fontSize: 12,
              min: 0,
              stepSize: 0.50
            }
          }]
        }
      }
    });
  }

  getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL, false);
    xhr.send();
    if (xhr.status != 200) {
      console.log(xhr.status);
    } else {
      return (JSON.parse(xhr.responseText));
    }
  }

  changeCharts() {
    setInterval(() => {
      this.data = this.getData();
      if (this.state.timeData.length >= 10) {
        this.state.timeData.shift();
        this.state.cpuData.shift();
        this.state.memoryData.shift();
        this.state.oneMinuteData.shift();
        this.state.fiveMinutesData.shift();
        this.state.fifteenMinutesData.shift();
      }

      this.state.cpuData.push(this.data['CPU'] / 1);
      this.state.memoryData.push((this.data['FreeMemory']).toFixed(2));
      this.state.timeData.push(new Date().toLocaleTimeString());
      this.state.oneMinuteData.push(this.data['oneMinute']);
      this.state.fiveMinutesData.push(this.data['fiveMinutes']);
      this.state.fifteenMinutesData.push(this.data['fifteenMinutes']);
      this.loadAverageChart.update();
      this.cpuChart.update();
      this.memoryChart.update();
    }, 3000)
  }

  render() {
    return (
        <div className="canvas-block">
          <div className="cpu-and-memory-charts">
            <div className='canvasCpu-block'>
              <canvas id="cpuChart"></canvas>
            </div>
            <div className='canvasMemory-block'>
              <canvas id="memoryChart"></canvas>
            </div>
          </div>
          <div className="loadAver">
            <canvas id="loadAverageChart"></canvas>
          </div>
        </div>
    );
  }
}

export default Charts