(function () {
  'use strict';

  angular.module('ngCalendar')
    .controller('ngCalendar.calendarController', [
      '$location',
      '$routeParams',
      'ngCalendar.msGraphService',
      calendarController
    ]);

  function calendarController($location, $routeParams, dataService) {
    var vm = this;

    // collection of items
    vm.items = [];

    // activate the controller
    _init();

    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    /**
     * Init the controller.
     */
    function _init() {
      // get all the items
      _getItems();
    }

    /**
     * Retrieve a list of items form Microsoft Graph API.
     * 
     * @returns {Promise}    - Angular promise
     * @resolves {Object[]}  - Collection of items from the Microsoft Graph API
     */
    function _getItems() {
      return dataService.getEvents()
        .then(function (items) {
          vm.items = items;
        });
    }

  } // function calendarController()

})();