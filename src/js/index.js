setInterval(function ren() {
  renderCharts(getData());
  ReactDOM.render(<App/>, document.getElementById('root'));
  return ren;
}(), 2000);
