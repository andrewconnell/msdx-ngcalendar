(function () {
  'use strict';

  angular.module('ngCalendar')
    .service('ngCalendar.msGraphService', [
      '$http',
      '$q',
      msGraphService
    ]);

  /**
   * @constructor
   * @param  {Object} $http - Angular's $http service
   * @param  {Object} $q    - Angular's promise service
   */
  function msGraphService($http, $q) {

    return {
      getEvents: getEvents
    };

    /* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    /**
     * Returns a collection of items.
     * 
     * @returns   {Promise}      - Angular promise
     * @resolves  {Object[]} 	   - Collection of events from the current user's mailbox
     */
    function getEvents(pageSize, pageIndex) {
      var deferred = $q.defer();

      var query = 'https://graph.microsoft.com/v1.0/me/calendar/events' +
        '?$select=start,end,location,subject' +
        '&$filter=isAllDay eq false' +
        '&$orderby=start/dateTime desc';
      var getOptions = {
        url: query,
        headers: {
          'Accept': 'application/json;odata.metadata=minimal'
        }
      };

      $http(getOptions)
        .success(function (response) {
          deferred.resolve(response.value);
        });

      return deferred.promise;
    }

  } // function msGraphService()

})();