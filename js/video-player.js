function start_playback(){
  const video = document.getElementById('video');
  video.play();
  setTimeout(function(){
    if (video.requestFullscreen)
        video.requestFullscreen();
    else if (video.webkitRequestFullscreen)
        video.webkitRequestFullscreen();
    else if (video.msRequestFullScreen)
        video.msRequestFullScreen();
  },1000);
  setTimeout(function(){
    video.playbackRate = 15;
  },2000);
}

window.onload = function () {
  const video = document.getElementById('video');
  video.muted = true;
  video.onended = function(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      const video = document.getElementById('video');
      video.currentTime = 0; // Zet de video terug naar het begin
      video.load(); // Herlaad de video om de poster te tonen
  }
  video.onclick = start_playback;
  let trigger_animation = false;
  let played = false;
  window.addEventListener('message', function() {
      if (!trigger_animation) {
        trigger_animation = true;
        return;
      }
      if (!played){
        start_playback();
        played = true;
      }
    });
}