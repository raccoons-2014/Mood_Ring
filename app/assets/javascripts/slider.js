var Slides = Slides || {};

Slides.show = function(slide) {
  // TODO: Show one slide, hide all the others.
  $('.slide').hide()
  $('#' + slide).show();
};
