var replyApp = angular.module("replyApp", []);

replyApp.controller("OptionsController", ["$scope", function ($scope) {

  angular.element(document).ready(function () {
    $scope.retrieveStorage();
  });

  if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia({audio: true}, function() {},
      function(){console.log("Can't access microphone")});
  }

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
    if (confirmDelete()) {
      chrome.storage.sync.get(tag, function(items) {
          var pastas = items[tag];
          var arrayLength = pastas.length;
          for (i = 0; i < arrayLength; i++) {
            if (pasta === pastas[i]) {
              pastas.splice(i,1);
            }
          }
          $scope.savePasta(tag, pastas);
      });
    }
  };

  $scope.deleteTag = function(tag) {
    if (confirmDelete()) {
      chrome.storage.sync.remove(tag, function() {
        $scope.retrieveStorage();
      });
    }
  };

}]);

function createObj(tag, pastas) {
  var obj = {};
  obj[tag] = pastas;
  console.log(obj);
  return obj;
}

function confirmDelete() {
  return confirm("Are you sure you want to delete?");
}
