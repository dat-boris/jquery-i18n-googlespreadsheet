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

        self.setLocale(languages[0]);
        /*
        self.translations = {
            'profile-lefttxt1' : {
                'EN' : 'Lorem ipsum',
                'JP' : '蟥お か'
            }
        };
        */
        $(".translate-button").click(function () {
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
                                throw "Column "+(i)+" was not in language "+languages[i-1];
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
        translate : function ($e) {
            var self = this;
            var found = false;
            $e.find('.translate-token').andSelf('.translate-token').each(
                    function (i) {
                        var $this = $(this);
                        var token = $this.data('translate-token');
                        if (!token)
                            throw("No data-translate-token property defined for element");
                        if (!self.translations[token]) {
                            var msg = "No token "+token+"defined in spreadsheet!";
                            if (self.alert) {
                                alert(msg);
                            } else {
                                throw(msg);
                            }
                            return;
                        }
                        var txtTranslated = self.translations[token][self.lang];
                        if (self.animate) {
                            $this.fadeOut(function() {
                                $(this).text(txtTranslated).fadeIn();
                            });
                        } else {
                            $this.text(txtTranslated);
                        }
                        found = true;
                    }
            );
            if (!found) throw("No translation target found!");
        }
    };
})(jQuery));
