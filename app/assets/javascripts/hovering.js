var timer;

hoverToggling = function(element) {
  element.hover(function() {
    element.fadeIn();
    element.toggleClass("hovering");
  },
  function() {
    element.toggleClass("hovering")
  })
}

hoverListener = function(element) {
  if(!element.hasClass("hovering")) {
    element.fadeOut('slow')
  }
}


