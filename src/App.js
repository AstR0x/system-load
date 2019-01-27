import React, {Component} from 'react';
import Table from './components/Table';
import Charts from './components/Charts'
import './App.css';

function getData() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://77.246.159.121/core/data.php', false);
  xhr.send();
  if (xhr.status != 200) {
    console.log(xhr.status);
  } else {
    return (JSON.parse(xhr.responseText));
  }
}

function App() {
    return [
          <Table/> ,
          <Charts/>
    ]
  }

export default App
