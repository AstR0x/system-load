let secondRow = $('.second-row').children();

interval = setInterval(function() {
  $.get('core/etersoft.php', function (data) {
    data = JSON.parse(data);
    let i = 0;
    console.log(data);
    $.each(data, function (index, elem) {
      secondRow[i].innerHTML = elem;
      i++;
    });
  })
}, 2000);



