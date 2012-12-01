jquery-i18n-googlespreadsheet
=============================

A simple i18n plugin which use Google spreadsheet as source data

## DEMO ##

http://sketchytechky.github.com/jquery-i18n-googlespreadsheet/

### Tests ###

http://sketchytechky.github.com/jquery-i18n-googlespreadsheet/tests/SpecRunner.html

## USAGE ##

Simplistic. Simplista.

    <!-- dependency -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script src="google-spreadsheet-javascript/google-spreadsheet.js"></script>
    <!-- real script -->
    <script src="i18ngss.js"> </script>
    
    <a href="#" class="translate-button" data-lang="EN">English</a>
    <a href="#" class="translate-button" data-lang="JP">Japanese</a>
    
    <!-- will grab the profile-lefttxt1 token from spreadsheet -->
    <span class="translate-token" data-translate-token="profile-lefttxt1"></span>

    <script>
        // will be whatever the column name
        var i = new $.i18n("https://docs.google.com/spreadsheet/pub?key=0Al0uCQDAjJijdENaMlQ0RlJBR3dQVUdrQ3BGVk9qYnc&output=html", ["EN", "JP"], "translate");

        i.setLocale('JP');  // set to jp (default as first)
        i.translate($('body'));
        // translate one token 
        var tranalste = i.translateToken('profile-lefttxt1');
    </script>


To create the spreadsheet, see example at:

https://docs.google.com/spreadsheet/pub?key=0Al0uCQDAjJijdENaMlQ0RlJBR3dQVUdrQ3BGVk9qYnc&output=html

And make sure it is published (see https://github.com/mikeymckay/google-spreadsheet-javascript/ for further info)

## Dependency ##

Pulled as submodule

- https://github.com/mikeymckay/google-spreadsheet-javascript/
