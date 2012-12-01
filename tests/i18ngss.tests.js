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
        expect( $h1.text() ).toEqual('Lorem ipsum');
      });
    });


    describe('change to japanese', function () {
      it('should be in japanese', function() {
        i18n.setLocalTranslate('JP');
        expect( $h1.text() ).toEqual('蟥お か');
      });
    });
  });
});
