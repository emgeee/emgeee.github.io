---
title: "Buffering Audio in Parallel on Mobile with Web Audio API"
layout: "post"
date: "2014-06-01 04:02:00"
description: 
tags: [mobile, hacks, web audio]
---

### Introduction
The HTML audio element is pretty powerful, unfortunately, mobile browsers tend to restrict it by not letting you play more than one audio stream at once. Furthermore, these browsers will also restrict buffering multiple audio tracks making seamless audio switching difficult at best. While these restrictions are fine for most applications, some apps require many sounds to be played in quick succession. Games with sound effects are the biggest victim of this policy and the most commonly used strategy to circumvent it is to use [audio sprites](https://hacks.mozilla.org/2012/04/html5-audio-and-audio-sprites-this-should-be-simple/). Below, I will discuss an alternate method that makes use of XMLHttpRequests and the experimental Web Audio API to buffer audio files in parallel then seamless switch between them.


### Solution
The first thing we need to do is setup our Web Audio API context. Because the spec has yet to be finalized, it may be necessary to use a vendor prefix:

```javascript
if ('webkitAudioContext' in window) {
  var myAudioContext = new webkitAudioContext();
} else {
  var myAudioContext = new AudioContext();
}
```

Here, we simple check to see if the prefixed version exists, if not we use the non prefixed version.


The XMLHttpRequest object has received some major updates in the last few years. In addition to being able to send and receive text, it can now do the same with [arraybuffers](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer), [blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob), and documents. Using the wonderful [Async.js](https://github.com/caolan/async) library, we simultaneously download multiple audio files as arraybuffers and save them for playback later:

```javascript
var songUrls = [ /* list of song URLs to buffer */ ];
var songData = [];
async.map(songUrls, function (url, cb) {
  request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.addEventListener('load', function (event) {
    try {
      var request = event.target;
      var source = myAudioContext.createBufferSource();
      source.buffer = myAudioContext.createBuffer(request.response, false);
      return cb(null, source);
    } catch (err) {
      return cb(err);
    }
  }, false);
  request.send();
}, function (err, result) {
  if (err) {
    $('#message').text("Error Buffering: " + err);
    return;
  }
  songData = result;
});
```

You'll notice that once the array buffer is finished downloading we immediately create a new [AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode) and populate it with the downloaded data using the createBuffer method (bonus: the preferred way to do this step is to use the [decodeAudioData()](http://docs.webplatform.org/wiki/apis/webaudio/AudioContext/decodeAudioData) method because it's asynchronous and has better error handling).
  
  
At this point, we now have an array of audio buffers so let's look at how to play them back. The Web Audio API is based on the concept of nodes which allow you to channel data through various transformation functions before finally outputting it. For the sake of this tutorial, all we care about is playback so all we need to do is connect one of the buffers to the output device. We do that using the **connect()**  method:

```javascript
songData[0].connect(myAudioContext.destination);
```

Although we can start playing the audio now, it is not ideal to do so because audio buffers cannot be restarted. To get around this, we first clone the audio buffer we want to playback:

```javascript
source = myAudioContext.createBufferSource(); source.buffer = songData[0].buffer; source.connect(myAudioContext.destination); source.start(0);
```

Now, if we want to restart the track or switch to a new track, we can do so by calling **source.stop(0)**  then clone the next audio buffer and start playing it.


A working implementation of this method can be found at  [http://emgeee.com/projects/web\_audio\_test](http://emgeee.com/projects/web_audio_test)


### Limitations

While the method described overcome some of the limitations imposed by mobile browsers, it is still constrained by the need for some sort of user interaction before the audio can start playing. On the bright side, we can at least buffer the audio before hand so that when the user does hit play, the audio will start immediately. Normal HTML5 <audio> elements on mobile aren't allowed to buffer until after the user hits play.


Unlike the <audio> element, this method is also limited by XSS policies imposed by the browser. This means you will only be able to use it to stream media from the same domain or from a server that has CORS enabled.


### Conclusion

This post describes a method for buffering audio in parallel and playing it back using the experimental Web Audio API.  I expect this method will become more robust in the future as the API is further standardized across browsers. I have tested this solution on both Chrome 35 for Android and Mobile Safari running on IOS7 with great results. Unfortunately, the stock Android browser does not support Web Audio, which is particularly unfortunate because that is what is used to run hybrid Cordova apps. For those looking to target IOS exclusively, however, I see this as a viable solution.


### Useful links

- [https://developer.apple.com/library/safari/documentation/audiovideo/conceptual/using\_html5\_audio\_video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html](https://developer.apple.com/library/safari/documentation/audiovideo/conceptual/using_html5_audio_video/PlayingandSynthesizingSounds/PlayingandSynthesizingSounds.html)
- [https://developer.mozilla.org/en-US/docs/Web/API](https://developer.mozilla.org/en-US/docs/Web/API)

### Full Sample Code

<script src="https://gist.github.com/emgeee/44ef1c5e65fa85d85a8a.js"></script>

