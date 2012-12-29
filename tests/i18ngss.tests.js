describe("i18n-googlespreadsheet", function() {
  var $h1, i18n;
  var async = new AsyncSpec(this);

  describe("basic translation", function() {
    async.beforeEach(function(done) {
      //clock = sinon.useFakeTimers();

      loadFixtures('index.html');

      $el = $('#jasmine-fixtures');
      $h1 = $('#testh1');
      i18n = new $.i18n("https://docs.google.com/spreadsheet/pub?key=0Al0uCQDAjJijdENaMlQ0RlJBR3dQVUdrQ3BGVk9qYnc&output=html", ["CA", "JP"], function () {
          i18n.animate = 0;  // supress animation, or else need async tests
          i18n.translate($h1);
          done();
      });
      i18n.setLocale('CA');  // set to jp (default as first)
      //var tranalste = i.translateToken('profile-lefttxt1');
    });

    afterEach(function() {
      //clock.restore();
    });

    describe('initial translation', function() {
      it('should be in english', function() {
        expect( $h1.text() ).toEqual('Lorem ipsum');
      });
    });


    describe('change to japanese', function () {
      it('should be in japanese', function() {
        i18n.setLocaleTranslate('JP');
        expect( $h1.text() ).toEqual('蟥お か');
      });
    });

    describe('change button', function () {
        async.it('should translate on click', function (done) {
            expect( $h1.text() ).toEqual('Lorem ipsum');
            $("#JPbutton").click();
            setTimeout(function() {
                expect( $h1.text() ).toEqual('蟥お か');
                done();
            },1000);
        });
    });

    describe('Markdown Japanese translation', function () {
      it('markdown list should be working', function() {
        i18n.setLocaleTranslate('JP');
        var exp = expect( $("#markdown-test").html() );
        exp.toMatch(/<li>世界を旅/);
        exp.toMatch(/Web site<br> www.lettersinthesky@org/);
      });
    });


    /**
      TODO test:
      1. throw error on token not found
      */
  });
});
