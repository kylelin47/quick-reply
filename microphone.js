navigator.webkitGetUserMedia({
    audio: true,
}, function(stream) {
    stream.stop();
}, function() {
    console.log("No microphone");
});
