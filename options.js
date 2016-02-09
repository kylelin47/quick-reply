var replyApp = angular.module('replyApp', []);

replyApp.controller('OptionsController', ['$scope', function ($scope) {
  angular.element(document).ready(function () {
    $scope.addStorage({lmao: ['ayy', 'bby'], gg: ['sup']},
      $scope.retrieveStorage);
  });

  $scope.retrieveStorage = function() {
    chrome.storage.sync.get(null, function(items) {
      console.log(items);
      $scope.tags = Object.keys(items);
      $scope.tags.sort();
      $scope.items = items;
      $scope.$apply();
    });
  };

  $scope.addStorage = function(items, callback) {
    chrome.storage.sync.set(items, callback);
  };
}]);
