'use strict';
$('form').hide();

$('.displayButton').click(function(){
    var id = $(this).attr('id');
    $('form').filter(`#${id}`).show();
    $('form').not(`#${id}`).hide();
  });
