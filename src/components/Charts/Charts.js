import React, {Component} from 'react'
import Chart from '../../../node_modules/chart.js/src/chart'

class Charts extends Component {

    state = {
      cpuData: [this.props.data.CPU],
      memoryData: [this.props.data.FreeMemory],
      timeData: [new Date().toLocaleTimeString()],
      oneMinuteData: [this.props.data.oneMinute],
      fiveMinutesData: [this.props.data.fiveMinutes],
      fifteenMinutesData: [this.props.data.fifteenMinutes],
    };

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
              max: this.props.data.TotalMemory,
              stepSize: this.props.data.TotalMemory / 4,
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

  shouldComponentUpdate(nextProps, nextState) {
    this.changeCharts();
    return false;
  }

  changeCharts() {
    if (this.state.timeData.length >= 10) {
      this.state.timeData.shift();
      this.state.cpuData.shift();
      this.state.memoryData.shift();
      this.state.oneMinuteData.shift();
      this.state.fiveMinutesData.shift();
      this.state.fifteenMinutesData.shift();
    }

    this.state.cpuData.push(this.props.data['CPU'] / 1);
    this.state.memoryData.push((this.props.data['FreeMemory']).toFixed(2));
    this.state.timeData.push(new Date().toLocaleTimeString());
    this.state.oneMinuteData.push(this.props.data['oneMinute']);
    this.state.fiveMinutesData.push(this.props.data['fiveMinutes']);
    this.state.fifteenMinutesData.push(this.props.data['fifteenMinutes']);
    this.loadAverageChart.update();
    this.cpuChart.update();
    this.memoryChart.update();
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