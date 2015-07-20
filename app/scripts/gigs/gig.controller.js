;(function (){

  'use strict';

  angular.module('app')
    .controller('GigCtrl', ['$scope', '$http', '$state', 'PARSE', 'GigFactory','$stateParams', '$cacheFactory', '$window',
    function ($scope, $http, $state, PARSE, GigFactory, $stateParams, $cacheFactory, $window){

       var cache = $cacheFactory.get('$http');

      // $scope.gigs = [];

      GigFactory.get().success( function (response) {
        $scope.gigs = response.results;
      });
    

      $scope.addGig = function (gigObj) {
        $scope.gigs = {};
        GigFactory.add(gigObj).success( function (results) {
          gigObj.objectId = results.objectId;
          // $scope.events.push(eventObj);
          cache.remove(PARSE.URL + 'classes/gigs');
          

        });
      };

//       $scope.editGig = function (id, index) {
//         GigFactory.edit(id).sucess( function(){

//           $state.go('portal');
// }
//           )};

      $scope.deleteMe = function(id) {
      var deleteVenue = $window.confirm('Are you sure you want to delete?');
      if (deleteVenue) {
        GigFactory.del(id).success( function (response) {
          cache.remove(PARSE.URL + 'classes/gigs');
          // $state.reload();
        });
    }
  };


     
    


    }]);
}());