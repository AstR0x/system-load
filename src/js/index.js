setInterval(function () {
  renderCharts(getData());
  ReactDOM.render(<App data={getData()}/>, document.getElementById('root'));
}, 2000);
