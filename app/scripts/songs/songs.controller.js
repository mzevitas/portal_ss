;(function (){

  'use strict';

  angular.module('app')
    .controller('SongCtrl', ['$scope', '$http', '$state', 'PARSE', 'SongsFactory','$stateParams', '$cacheFactory', '$filter', '$window',
    function ($scope, $http, $state, PARSE, SongsFactory, $stateParams, $cacheFactory, $filter, $window){

       var cache = $cacheFactory.get('$http');



      SongsFactory.get().success( function (response) {
        $scope.songs = response.results;
      });
    

      $scope.addSong = function (songObj) {
        $scope.songs = {};
        SongsFactory.add(songObj).success( function (results) {
          songObj.objectId = results.objectId;

          cache.remove(PARSE.URL + 'classes/songs');
          

        });
      };


      var orderBy = $filter('orderBy');
      $scope.predicate = 'songtitle';
      $scope.reverse = false;
      $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
      };

   


      $scope.deleteMe = function(id) {
      var deleteVenue = $window.confirm('Are you sure you want to delete?');
      if (deleteVenue) {
        SongsFactory.del(id).success( function (response) {
          cache.remove(PARSE.URL + 'classes/songs');
          $state.reload();
        });
    }
  };


     
    


    }]);
}());