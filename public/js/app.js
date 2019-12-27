'use strict';
$('form').hide();

$('.displayButton').click(function(){
    var id = $(this).attr('id');
    console.log('444444', id);
    $('form').filter(`#${id}`).show();
    $('form').not(`#${id}`).hide();
  });

$('.updateButton').click(function(){
  $('form').show();
});
