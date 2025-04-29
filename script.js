window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const content = document.getElementById("content");

    preloader.style.display = "none";
    content.style.display = "block";
});

// const clickfx = document.getElementById('click-sound');
// clickfx.currentTime = 0; //start from beginning if played again quickly
// clickfx.play(); //it was for nav buttons click sound fx

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.drum-pad[data-key="${e.keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing")
}

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

const drumPads = document.querySelectorAll(".drum-pad");

//Mouse click support
drumPads.forEach(drumPad => drumPad.addEventListener("click", function () {
    const key = this.getAttribute("data-key");
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return; audio.currentTime = 0;
    audio.play();
    this.classList.add("playing")
})
);

// Mobile touch support
// drumPads.forEach(drumPad =>
//     drumPad.addEventListner("touchstart", function (e) {
//         e.preventDefault(); //prevent blue overlay &unwanted scrolling
//         const key = this.getAttribute("data-key");
//         const audio = document.querySelector('audio[data-key="${key}"]');
//         if (!audio) return;
//         audio.currentTime = 0;
//         audio.play();
//         this.classList.add("playing");
//     }, { passive: false })
// );
const isMobile = /Mobi|Android|iPhone|iPad|iPod/
isMobile.test(navigator.userAgent);

if (isMobile) {
    drumPads.forEach(drumPad => {
        drumPad.addEventListener("touchstart", function (e) {
            e.preventDefault(); //prevent blue overlay &scrolling
            const key = this.getAttribute("data-key");
            const audio = document.querySelector('audio[data-key="${key}"]');
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();
            this.classList.add("playing");
        }, { passive: false });
    });
}

//Keyboard support
window.addEventListener("keydown", playSound);

//Remove animation class after transition
drumPads.forEach(drumPad =>
    drumPad.addEventListener("transitionend", removeTransition)
);
// nav buttons sound effect
// function clickSound() {
//     const clickfx = document.getElementById('click-sound');
//     clickfx.currentTime = 0; //start from beginning if played again quickly
//     clickfx.play();
// }