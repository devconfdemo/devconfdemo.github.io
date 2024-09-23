const slideConfig = [
    {id: '1-titel'},
    {id: '2-proloog', animations: 5},
    {id: '3-welkom'},
    {id: '4-tijdlijn'},
    {id: '5-appengine2'},
    {id: '6-problem-statement'},
    {id: '7-serverless-oplossing'},
    {id: '8-serverless-probleem'},
    {id: '9-ruis'},
    {id: '10-IaC-controlflow'},
    {id: '11-monolitisch-model'},
    {id: '12-modeleren-data-flow'},
    {id: '13-CQRS'},
    {id: '14-transactie'},
    {id: '15-model'},
    {id: '16-track-and-trace'},
    {id: '17-api'},
    {id: '18-deployment'},
    {id: '19-de-demo'},
    {id: '20-het-ontwerp', animations: 1},
    {id: '21-aggregate-document', animations: 1, reset_animations: 1},
    {id: '22-command', animations: 1, reset_animations: 1},
    {id: '23-event', animations: 1, reset_animations: 1},
    {id: '24-trigger', animations: 1,reset_animations: 1},
    {id: '25-flow', animations: 1, reset_animations: 1},
    {id: '26-view-model', animations: 1, reset_animations: 1},
    {id: '27-view-mapper', animations: 1, reset_animations: 1},
    {id: '28-view-queries', animations: 1,reset_animations: 1},
    {id: '29-scenario', animations: 1, reset_animations: 1},
    {id: '30-pipeline', animations: 1, reset_animations: 1},
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
          } else if (this.slides[this.currentIndex].reset_animations){
            this.slides[this.currentIndex].animations = this.slides[this.currentIndex].reset_animations;
            let iframe = document.getElementById('slide-content-' + this.currentIndex);
            iframe.contentWindow.location.reload();
          }
          this.fastForward();
        },
        previousSlide() {
            if (this.slides[this.currentIndex].reset_animations){
            this.slides[this.currentIndex].animations = this.slides[this.currentIndex].reset_animations;
            let iframe = document.getElementById('slide-content-' + this.currentIndex);
            iframe.contentWindow.location.reload();
          }
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
                    localStorage.removeItem('_x_remainingTime');
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

function timer() {
    return {
        // Persistent start time (45 minutes in milliseconds)
        startTime: Alpine.$persist(45 * 60 * 1000),

        // Timer variables
        remainingTime: Alpine.$persist(45 * 60 * 1000),
        intervalId: null,

        // Timer start function
        startTimer() {
            this.intervalId = setInterval(() => {
                if (this.remainingTime > -60 * 60 * 1000) { // Stop after -60 mins
                    this.remainingTime -= 1000;
                }
            }, 1000);
        },

        // Format the time in mm:ss
        get formattedTime() {
            let minutes = Math.floor(Math.abs(this.remainingTime) / 1000 / 60);
            let seconds = Math.floor((Math.abs(this.remainingTime) / 1000) % 60);

            return `${this.remainingTime < 0 ? '-' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },

        // Change text color based on time
        get timeColor() {
            if (this.remainingTime < 0) {
                return 'red'; // Negative time = red
            } else if (this.remainingTime <= 10 * 60 * 1000) {
                return 'orange'; // Last 10 minutes = orange
            } else {
                return 'green'; // Default = green
            }
        }
    };
}