/**
 * TODO proper header
 */
(function ($) {
    //"use strict";

    /**
     * @constructor
     * @param callback {Function or 'translate'} 
     *     if translate, will automatically translate function on page
     */
    $.i18n = function (url, languages, callback) {
        var self = this;

        self.alert = 1;  // for non-computer literate people knowning what to debug

        //TODO: get the data from the spreadsheet
        self.translations = {
            'profile-lefttxt1' : {
                'EN' : 'Lorem ipsum',
                'JP' : '蟥お か'
            }
        };
        self.setLocale(languages[0]);

        if (callback === 'translate') {
            self.translate($('body'));
        }
        else if (callback) {
            callback();
        }

        //auto-translate
        return this;
    };
    $.i18n.prototype = {
        setLocale : function (lang) {
            var self = this;
            self.lang = lang;
        },
        setLocalTranslate : function (lang) {
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
                        $this.text(self.translations[token][self.lang]);
                        found = true;
                    }
            );
            if (!found) throw("No translation target found!");
        }
    };
})(jQuery)
