var replyApp = angular.module("replyApp", []);

replyApp.controller("OptionsController", ["$scope", function ($scope) {

  angular.element(document).ready(function () {
    $scope.retrieveStorage();
  });

  $scope.savePasta = function(tag, pasta) {
    chrome.storage.sync.set(createObj(tag, pasta), $scope.retrieveStorage);
  };

  $scope.retrieveStorage = function() {
    chrome.storage.sync.get(null, function(items) {
      console.log(items);
      $scope.tags = Object.keys(items);
      $scope.tags.sort();
      $scope.items = items;
      $scope.$apply();
    });
  };

  $scope.addPasta = function() {
    if ($scope.newTag && $scope.newPasta) {
      var t = $scope.newTag.toUpperCase();
      var p = $scope.newPasta;
      chrome.storage.sync.get(t, function(items) {
        if (Object.keys(items).length === 0) {
          var pasta = [];
          pasta.push(p);
          $scope.savePasta(t, pasta);
        } else {
          items[t].push(p);
          $scope.savePasta(t, items[t]);
        }
      });
      $scope.newPasta = "";
      $scope.newTag = "";
    }
  };

  $scope.deletePasta = function(tag, pasta) {
    chrome.storage.sync.get(tag, function(items) {
      var pastas = items[tag];
      var arrayLength = pastas.length;
      for (i = 0; i < arrayLength; i++) {
        if (pasta === pastas[i]) {
          pastas.splice(i,1);
        }
      }
      if (pastas.length === 0) {
        $scope.deleteTag(tag);
      } else {
        $scope.savePasta(tag, pastas);
      }
    });
  };

  $scope.deleteTag = function(tag) {
    chrome.storage.sync.remove(tag, function() {
      $scope.retrieveStorage();
    });
  };
}]);

function createObj(tag, pastas) {
  var obj = {};
  obj[tag] = pastas;
  console.log(obj);
  return obj;
}
