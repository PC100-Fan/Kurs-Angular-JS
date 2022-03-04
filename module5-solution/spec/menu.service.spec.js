describe('menuservice', function () {

  var MenuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
      MenuService = $injector.get('MenuService');
    });
  });

  it('should return existing shortName', function() {
    // Original HTTP returns
    // {"id":1, "short_name":"A1", "name":"Won Ton Soup with Chicken",
    //  "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
    //  "price_small":2.55, "price_large":5.0, "small_portion_name":"pint",
    //  "large_portion_name":"quart", "created_at":"2022-02-26T21:04:08.744Z",
    //  "updated_at":"2022-02-26T21:04:08.744Z", "category_short_name":"A", "image_present":true}
    var shortName = "A1";
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json')
                .respond({"id":1,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart","created_at":"2022-02-26T21:04:08.744Z","updated_at":"2022-02-26T21:04:08.744Z","category_short_name":"A","image_present":true});
    MenuService.getMenuItem(shortName).then(function(response) {
      expect(response.short_name).toEqual(shortName);
    });

    $httpBackend.flush();
  });

  it('should return an error for non-existing shortName', function() {
    var shortName = "xy";
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json')
                .respond(500, '');
    MenuService.getMenuItem(shortName).then(function(response) {
      fail("Non-existing shortname should return an error!");
    }).catch(function (reason) {
      expect(parseInt(reason.status, 10)).toEqual(500);
    });

    $httpBackend.flush();
  });

});
