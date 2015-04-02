jQuery(function() {
  /**
   * Scrollreveal init
   * @type {Window.scrollReveal}
   */
  window.sr = new scrollReveal({
    reset: true,
    opacity: 1,
    move: '50px',
    //scale:    { direction: 'up', power: '0%' },
    mobile: true
  });

  jQuery("[data-sr]").css("visibility", "hidden");
});