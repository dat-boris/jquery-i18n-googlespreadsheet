jquery-i18n-googlespreadsheet
=============================

A simple i18n plugin which use Google spreadsheet as source data

## DEMO ##

http://sketchytechky.github.com/jquery-i18n-googlespreadsheet/

## USAGE ##

Simplistic. Simplista.

    <link href="i18ngss.css" rel="stylesheet"/>
    <script src="i18ngss.js"> </script>
    
    <!-- will grab the profile-lefttxt1 token from spreadsheet -->
    <h1 class="translate-token">profile-lefttxt1</h1>

    <script>
        // will be whatever the column name
        var i = $.i18n("https://docs.google.com/spreadsheet/pub?key=0Al0uCQDAjJijdENaMlQ0RlJBR3dQVUdrQ3BGVk9qYnc&output=html", ["EN", "JP"]);
        i.setLocale('JP');  // set to jp (default as first)
        i.translateDOM($('body'));
        var tranalste = i.translateToken('profile-lefttxt1');
    </script>


## Dependency ##

Pulled as submodule

- https://github.com/mikeymckay/google-spreadsheet-javascript/
