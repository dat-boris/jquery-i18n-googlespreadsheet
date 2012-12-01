describe("i18n-googlespreadsheet", function() {
  var $h1, i18n;

  describe("basic translation", function() {
    beforeEach(function() {
      clock = sinon.useFakeTimers();

      loadFixtures('index.html');

      $el = $('#jasmine-fixtures');
      $h1 = $('#testh1');
      i18n = new $.i18n("https://docs.google.com/spreadsheet/pub?key=0Al0uCQDAjJijdENaMlQ0RlJBR3dQVUdrQ3BGVk9qYnc&output=html", ["EN", "JP"]);
      i18n.setLocale('EN');  // set to jp (default as first)
      i18n.translate($h1);
      //var tranalste = i.translateToken('profile-lefttxt1');
    });

    afterEach(function() {
      clock.restore();
    });

    describe('initial translation', function() {
      it('should be in english', function() {
        expect( $h1.text() ).toEqual('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum');
      });
    });


    describe('change to japanese', function () {
      it('should be in japanese', function() {
        i18n.setLocalTranslate('JP');
        expect( $h1.text() ).toEqual('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum');
      });
    });
  });
});
