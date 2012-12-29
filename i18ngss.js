/**
 * TODO proper header
 */
$((function ($) {
    //"use strict";

    /**
     * @constructor
     * @param callback {Function or 'translate'} 
     *     if translate, will automatically translate function on page
     */
    $.i18n = function (url, languages, callback) {
        var self = this;

        self.languages = languages;

        self.setLocale(languages[0]);
        /*
        self.translations = {
            'profile-lefttxt1' : {
                'EN' : 'Lorem ipsum',
                'JP' : '蟥お か'
            }
        };
        */
        $("body").on("click", ".translate-button", function () {
            self.setLocaleTranslate($(this).data('lang'));
            return false;
        });
        self.translations = {};
        if (!url) throw "No url given!";
        self.getTranslationFromGSS(url, languages, callback);

        return this;
    };
    $.i18n.prototype = {
        /**
          Create alert if field is missing
          @field
          */
        alert: 1,
        /**
          Use animation for text
          @field
          */
        animate : 1,
        languages : [],
        /**
          current language
          @field
          */
        lang : null,
        getTranslationFromGSS : function (url, languages, callback) {
            var self = this;

            var numLangs = languages.length;
            var googleSpreadsheet = new GoogleSpreadsheet();
            googleSpreadsheet.url(url);
            googleSpreadsheet.load(function(result) {
                //$('#results').html(JSON.stringify(result).replace(/,/g,",\n"));
                var tokenNow = '';
                // result.data is a flat array of elements on page
                // [(0,0),(0,1),(0,2),(0,3)....]
                $.each(result.data, function (i,e) {
                    // header
                    if (i<numLangs+1) {
                        if (i>0) {
                            if (e!=languages[i-1]) {
                                throw "Check spreadsheet: Column "+(i)+" was not in language "+languages[i-1];
                            }
                        }
                        return;
                    }

                    // body
                    var langIndex = i % (numLangs+1);
                    if (langIndex==0) {
                        tokenNow = e;
                        self.translations[tokenNow] = {};
                    } else {
                        self.translations[tokenNow][languages[langIndex-1]] = e;
                    }
                });

                if (callback === 'translate') {
                    self.translate($('body'));
                }
                else if (callback) {
                    callback();
                }
            });
        },
        setLocale : function (lang) {
            var self = this;
            self.lang = lang;
        },
        setLocaleTranslate : function (lang) {
            var self = this;
            self.setLocale(lang);
            self.translate($('body'));
        },
        /** display language bar 
            <div>
                <a href="#" class="translate-button" data-lang="CA"><img src="http://www.geonames.org/flags/x/ca.gif"/></a>
                <a href="#" class="translate-button" data-lang="JP"><img src="http://www.geonames.org/flags/x/jp.gif"/></a>
            </div>
          */
        displayBar : function (e, style) {
            var self = this;
            style = style || { height: '30px', 'padding': '3px' };
            var $e = $(e);
            if ($e.length==0) throw "No element "+e+" found!";
            $.each(this.languages, function (i,lang) {
                $e.append(
                  $('<a href="#" class="translate-button" data-lang="'+lang+'"></a>').append(
                      $('<img src="http://www.geonames.org/flags/x/'+lang.toLowerCase()+'.gif"/>').css(style)
                  )
                );
            });
        },
        translate : function ($e) {
            var self = this;
            var found = false;
            $e.find('.translate-token').andSelf('.translate-token').each(
                    function (i) {
                        var $this = $(this);
                        var token = $this.data('translate-token');
                        if (!token) {
                            //allow ("No data-translate-token property defined for element");
                            return;
                        }
                        if (!self.translations[token]) {
                            var msg = "No token "+token+" defined - please add to spreadsheet";
                            if (self.alert) {
                                alert(msg);
                            } else {
                                throw(msg);
                            }
                            return;
                        }

                        var txtTranslated = self.translations[token][self.lang];
                        
                        // animate on large block of text is no good (scroll issue)
                        var isAnimate = self.animate && !$this.data('noanimate');

                        if ($this.data('markdown')) {
                            txtTranslated = markdown.toHTML(txtTranslated);
                            if ($this.html() !== txtTranslated) {
                                if (isAnimate) {
                                    $this.fadeOut(function() {
                                        $(this).html(txtTranslated).fadeIn();
                                    });
                                } else {
                                    $this.html(txtTranslated);
                                }
                            }
                            
                        } else {
                            // allow new line
                            txtTranslated = txtTranslated.split("\n").join("<br/>");
                            if ($this.text() !== txtTranslated) {
                                if (isAnimate) {
                                    $this.fadeOut(function() {
                                        $(this).html(txtTranslated).fadeIn();
                                    });
                                } else {
                                    $this.html(txtTranslated);
                                }
                            }
                        }
                        found = true;
                    }
            );
            if (!found) throw("No translation target found!");
        }
    };
})(jQuery));
