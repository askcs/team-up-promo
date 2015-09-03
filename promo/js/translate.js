/**
 * Created by Henk on 28/07/2015.
 */

var Translator = function(element, options)
{
  this.element = element;
  this.options = jQuery.extend({}, this.defaults, options);
  this.languages = null;
  this.init();
};

Translator.prototype = {
  defaults: {
    byHostName: true,
    picker: false,
    defaultLang: 'nl',
    langDir: "promo/js/locals/translate.json"
  },
  setLang: function(currentLang)
  {
    var langElements = jQuery('[data-translate]'),
      self = this;

    jQuery.each(langElements, function(i, val)
    {
      var target = jQuery(val),
        transAttr = target.data('translate'),
        translatedVal = self.languages[currentLang][transAttr.toString()];

      if (target.is("input, textarea"))
      {
        target.attr("placeholder", translatedVal);
      }
      else
      {
        target.text(translatedVal);
      }
    });
  },
  pick: function()
  {
    var self = this;

    jQuery(self.element).change(function() {
      var currentLang = jQuery("option:selected", this).val();
      self.setLang(currentLang);
    });
  },
  init: function ()
  {
    var self = this;

    jQuery.getJSON(self.options.langDir, function(languages)
    {
      var language = null;
      self.languages = languages;

      if(self.options.byHostName)
      {
        var hostName = window.location.hostname;
        Object.keys(self.languages).forEach(function (lang)
        {
          language = (hostName.indexOf('.' + lang) > -1)
            ? lang
            : self.options.defaultLang;
        });
      }
      if(self.options.picker)
      {
        self.pick();
      }
      self.setLang(language || self.options.defaultLang);
    });
  }
};

(function( $ ) {
  $.fn.translate = function(options)
  {
    new Translator(this, options);
    return this;
  };
}( jQuery ));
