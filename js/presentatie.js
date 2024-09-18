const slideConfig = [
    {id: 'slide-1'},
    {id: 'slide-2', animations: 4},
    {id: 'slide-3'},
    {id: 'slide-4', animations: 1},
    {id: 'slide-5'},
    {id: 'slide-6'}
]

document.addEventListener('alpine:init', () => {
    Alpine.data('presentatie', () => ({
        currentIndex: Alpine.$persist(0),
        isFullScreen: false,
        speakerNotes: false,
        direction: 'right',
        slides: slideConfig,
        getSlideIndicator: function(){
            return (this.currentIndex + 1) + " / " + this.slides.length;
        },
        fastForwardEnabled: function(){
            return this.slides[this.currentIndex].animations ? false : true;
        },
        toggleFullScreen() {
          if (!this.isFullScreen) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
          this.isFullScreen = !this.isFullScreen;
        },
        trigger_slide_animation(){
            location.hash = this.currentIndex + 1;
            let iframe = document.getElementById('slide-content-' + this.currentIndex);
            iframe.contentWindow.postMessage('initialize', '*');
        },
        nextSlide() {
          if (this.slides[this.currentIndex].animations){
            this.slides[this.currentIndex].animations += -1;
            this.trigger_slide_animation();
            return;
          }
          this.fastForward();
        },
        previousSlide() {
          this.direction = 'left';
          this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
          this.trigger_slide_animation();
        },
        fastForward(){
          this.direction = 'right';
          this.currentIndex = (this.currentIndex + 1) % this.slides.length;
          this.trigger_slide_animation();
        },
        resetPresentation(){
            if (confirm("Presentatie resetten?")){
                this.currentIndex = 0;
                setTimeout(function(){
                    location.reload();
                },1000);
            }
        },
        openNotes(){
            this.speakerNotes = true;
        }
      }));

    window.addEventListener('message', function(event) {
        console.log('Message from iframe:', event.data);
        if (event.data === 'next') {
            document.getElementById("presentatie-container").dispatchEvent(new CustomEvent('next'));
        }
        if (event.data === 'previous') {
            document.getElementById("presentatie-container").dispatchEvent(new CustomEvent('previous'));
        }
    });

    setTimeout(function(){
        let check = "<h1>Error response</h1>";
        document.querySelectorAll('.speaker-notes').forEach(note => {
            if (note.innerHTML.includes(check)){
                note.innerHTML = "...";
            }
        });
    },1000);
});