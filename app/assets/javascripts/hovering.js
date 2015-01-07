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

<<<<<<< HEAD
hoverCrossout = function(element1, element2) {
  if (!element1.is(":visible")) {
    element2.fadeIn("slow");
  }
}
=======

>>>>>>> hover toggling functions added
