function renderMessage(message) {
  document.getElementById('message').textContent = message;
}

function generatePasta() {
  return "sup dude";
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
  renderMessage("Copied to clipboard!");
}

document.addEventListener('DOMContentLoaded', function() {
  var message = generatePasta();
  console.log(message);
  copyToClipboard(message);
});
