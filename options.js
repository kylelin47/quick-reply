var replyApp = angular.module('replyApp', []);

replyApp.controller('optionsController', function ($scope) {
  angular.element(document).ready(function () {
    $scope.addStorage({'a': 'lmao', 'c': 'gg', 'b': 'lol'},
      $scope.retrieveStorage);
  });

  $scope.retrieveStorage = function() {
    var pastaStorage = document.getElementById('pastas');
    chrome.storage.sync.get(null, function(items) {
      console.log(items);
      var keys = Object.keys(items);
      keys.sort();
      var arrayLength = keys.length;
      for (var i = 0; i < arrayLength; i++) {
        $scope.addPasta(items[keys[i]], pastaStorage);
      }
    });
  };

  $scope.addStorage = function(items, callback) {
    chrome.storage.sync.set(items, callback);
  };

  $scope.addPasta = function(pasta, location) {
    var node = document.createElement("blockquote");
    var textnode = document.createTextNode(pasta);
    node.appendChild(textnode);
    location.appendChild(node);
  };
});
