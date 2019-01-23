function getData() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'core/data.php', false);
  xhr.send();
  if (xhr.status != 200) {
    console.log(xhr.status);
  } else {
    var Data = JSON.parse(xhr.responseText);
  }
  return Data;
}