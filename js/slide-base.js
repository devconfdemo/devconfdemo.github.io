
function nextSlide(){
    window.parent.postMessage('next', '*');
}

function previousSlide(){
    window.parent.postMessage('previous', '*');
}
