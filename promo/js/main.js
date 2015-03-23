jQuery(function() {
  /**
   * Scrollreveal init
   * @type {Window.scrollReveal}
   */
  window.sr = new scrollReveal({
    reset: true,
    move: '50px',
    mobile: true
  });

  jQuery("[data-sr]").css("visibility", "hidden");
});