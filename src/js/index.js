function App(props) {
  return (
      <table className="system-load-table" width="100%">
        <tbody>
        <tr className="first_row">
          <th>CPU</th>
          <th>Total memory</th>
          <th>Free memory</th>
          <th>5 minute</th>
          <th>10 minute</th>
          <th>15 minute</th>
        </tr>
        <tr className="second-row">
          <th>{props.data['CPI']}</th>
          <th>{(props.data['TotalMemory'] / 1024).toFixed(2) + ' МБ'}</th>
          <th>{(props.data['FreeMemory'] / 1024).toFixed(2) + ' МБ'}</th>
          <th>{props.data['5minute']}</th>
          <th>{props.data['10minute']}</th>
          <th>{props.data['15minute']}</th>
        </tr>
        </tbody>
      </table>
  );
}

setInterval(function () {
  $.get('core/data.php', function (data) {
    data = JSON.parse(data);
    ReactDOM.render(<App data={data}/>, document.getElementById('root'));
  });
}, 500);









