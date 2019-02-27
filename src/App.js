import React, {Component} from 'react';
import Table from './components/Table/Table';
import Charts from './components/Charts/Charts';
import Loader from './components/Loader/Loader'
import URL from './address';
import './App.css';

class App extends Component {

  state = {
    isLoading: true,
    data: {
      'CPU': 0,
      'TotalMemory': 0,
      'FreeMemory': 0,
      'oneMinute': 0,
      'fiveMinutes': 0,
      'fifteenMinutes': 0,
    }
  };

  componentDidMount() {
    this.setState({
      data: this.getData(),
      isLoading: false,
    });

    this.working = setInterval(() => {
      this.setState({
        data: this.getData(),
      })
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.working);
  }

  getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL, false);
    xhr.send();
    if (xhr.status !== 200) {
      console.log(xhr.status);
    } else {
      return (JSON.parse(xhr.responseText));
    }
  }

  render() {
    if(!this.state.isLoading) {
      return (
          <React.Fragment>
            <Table data={this.state.data}/>
            <Charts data={this.state.data}/>
          </React.Fragment>
      )
    }
    return (
        <Loader/>
    )
  }
}

export default App
