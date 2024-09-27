$(function() {
    $('.episode').on('mouseenter', function() {
      $(this).find('.description').stop().css({
        'display': 'initial'
      }, 500);
    }).on('mouseleave', function() {
      $(this).find('.description').stop().css({
        'display': 'none'
      }, 500)
    })
  
  })
  