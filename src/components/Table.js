import React from 'react';
import URL from '../address'

class Table extends React.Component {
  constructor(props) {
    super(props)

    const data = this.getData();

    this.state = {
      CPU: data['CPU'],
      totalM: data['TotalMemory'],
      freeM: data['FreeMemory'],
      oneMin: data['oneMinute'],
      fiveMin: data['fiveMinutes'],
      fifteenMin: data['fifteenMinutes'],
    };
    this.changeData();
  }

  changeData() {
    setInterval(() => {
      this.data = this.getData();
      this.setState({
        CPU: this.data['CPU'],
        totalM: this.data['TotalMemory'],
        freeM: this.data['FreeMemory'],
        oneMin: this.data['oneMinute'],
        fiveMin: this.data['fiveMinutes'],
        fifteenMin: this.data['fifteenMinutes']
      })
    }, 2000)
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

  render() {
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
            <th>{this.state.CPU}%</th>
            <th>{(this.state.totalM).toFixed(2) + ' МБ'}</th>
            <th>{(this.state.freeM).toFixed(2) + ' МБ'}</th>
            <th>{this.state.oneMin}</th>
            <th>{this.state.fiveMin}</th>
            <th>{this.state.fifteenMin}</th>
          </tr>
          </tbody>
        </table>
    )
  }
}

export default Table