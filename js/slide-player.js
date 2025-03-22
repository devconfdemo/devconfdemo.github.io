document.addEventListener('alpine:init', () => {
    Alpine.data('slidePlayer', function(){
        return {
            current: this.$persist(0),
            stoppedOn: 0,
            src: "https://revue.b-cdn.net/other/slides-devconf-2025.mp4",
            enableControls: false,
            busy: false,
            pauses: [
                9,
                15,
                20,
                25,
                55,
                60,
                65,
                75,
                83,
                91,
                96,
                100,
                108,
                117,
                127,
                131,
                135,
                137,
                140,
                162,
                168,
                189,
                226,
                250,
                258,
                261,
                268,
                271,
                275,
                292,
                294,
                299,
                313,
                319,
                328,
                338,
                349,
                361,
                365,
                377,
                386,
                393,
                398,
                407,
                450,
                461,
                489
            ],
            video: null,
            init: function(){
                this.video = document.getElementById('slide-video');
                this.video.currentTime = this.current;
                if (this.current == 0){
                    this.video.playbackRate = 4;
                }
                if (!this.pauses.includes(Math.floor(this.current))){
                    this.continuePresentation();
                }
                this.video.addEventListener('volumechange', () => {
                    this.video.muted = true;
                    this.video.volume = 0;
                });
            },
            continuePresentation: function(){
                if (this.busy){return}
                this.busy = true;
                this.video.play();
            },
            goBack: function(){
                if (this.busy){return}
                this.busy = true;
                let speed = 2;
                let reverseInterval = setInterval(() => {
                    this.video.currentTime -= (0.04 * speed);
                    let point = Math.floor(this.video.currentTime);
                    if (point != this.stoppedOn && this.pauses.includes(point)){
                        clearInterval(reverseInterval);
                        this.stoppedOn = point;
                        let indicator = document.getElementById("indicator");
                        indicator.classList.add('badge-success');
                        indicator.classList.remove('badge-error');
                        this.busy = false;
                    }
                  }, 40);
            },
            updateTime: function(event){
                let indicator = document.getElementById("indicator");
                this.current = event.target.currentTime;
                let point = Math.floor(this.current);
                if (point != this.stoppedOn && this.pauses.includes(point)){
                    this.video.pause();
                    this.stoppedOn = point;
                    this.video.playbackRate = 1;
                    indicator.classList.add('badge-success');
                    indicator.classList.remove('badge-error');
                    this.busy = false;

                } else if (point != this.stoppedOn){
                    indicator.classList.add('badge-error');
                    indicator.classList.remove('badge-success');
                }

                let cutoff = 2;
                if (this.video.duration && this.current >= this.video.duration - cutoff) {
                  this.video.currentTime = 0;
                }
            }
        }
    });
});