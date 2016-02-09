function renderMessage(message) {
  document.getElementById('message').textContent = message;
}

function generatePasta() {
  //get active tags list from local.get. callback, get all from sync
  //check if each tag[i] in active tags list
  chrome.storage.sync.get(null, function(items) {
    var tags = Object.keys(items);
    var arrayLength = tags.length;
    var possibleOptions = [];
    for (var i = 0; i < arrayLength; i++) {
     possibleOptions = possibleOptions.concat(items[tags[i]]);
    }
    var message =
      possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
    if (message) {
      copyToClipboard(message);
      renderMessage("Copied to clipboard!");
    }

  });
}

function copyToClipboard(message) {
  const text = document.createElement('textarea');
  text.style.position = 'fixed';
  text.style.opacity = 0;
  text.value = message;
  document.body.appendChild(text);
  text.select();
  document.execCommand('Copy');
  document.body.removeChild(text);
}

document.addEventListener('DOMContentLoaded', function() {
  generatePasta();
});
