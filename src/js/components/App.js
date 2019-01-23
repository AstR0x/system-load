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
