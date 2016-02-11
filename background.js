function generatePasta(tag) {
  chrome.storage.sync.get(tag, function(items) {
    var possibleOptions = items[tag];
    console.log(possibleOptions);
    if (!possibleOptions) {
      var opt = {
        type: "basic",
        title: "Unknown Tag",
        message: "Tag '" + tag + "' not found",
        iconUrl: "icon.png"
      }
      chrome.notifications.create(opt);
    }
    var message =
      possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
    if (message) {
      copyToClipboard(message);
      var opt = {
        type: "basic",
        title: "Copied to Clipboard",
        message: "Message from tag '" + tag + "' copied",
        iconUrl: "icon.png"
      }
      chrome.notifications.create(opt);
    } else {
      console.log("No message");
    }
  });
}

function copyToClipboard(message) {
  const text = document.createElement("textarea");
  text.style.position = "fixed";
  text.style.opacity = 0;
  text.value = message;
  document.body.appendChild(text);
  text.select();
  document.execCommand("Copy");
  document.body.removeChild(text);
}

chrome.commands.onCommand.addListener(function(command) {
  console.log(command);
  if (command === "Get Tag") {
    if (!("webkitSpeechRecognition" in window)) {
      upgrade();
    }
    else {
      var recognition = new webkitSpeechRecognition();
      recognition.lang = "en";
      recognition.onresult = function(event) {
        console.log(event);
        if (event.results.length > 0) {
          console.log(event.results[event.results.length-1]);
          var result = event.results[event.results.length-1];
          if(result.isFinal) {
            var transcript = result[0].transcript.toUpperCase();
            console.log(transcript);
            generatePasta(transcript);
          };
        }
      }
      recognition.onerror = function(event) {
        console.log("error: " + event.error);
        if (event.error === "not-allowed") {
          var newURL = "microphone.html";
          chrome.tabs.create({ url: newURL });
        }
      };

      recognition.onend = function(event) {
        chrome.browserAction.setIcon({path: "icon.png"});
      };

      recognition.start();
      chrome.browserAction.setIcon({path: "mic.png"});
    };
  }
});
