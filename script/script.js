const slider = document.querySelector(".slider");
const buttons = document.querySelectorAll(".btn");
const options = document.querySelectorAll(".option");
const slides = document.querySelectorAll(".img");

let index = 1;
let optionIndex = 0;
let boxIndex = 0;
let name = "";
let size = slides[index].clientWidth; 
update();

function update() {
    slider.style.transform = `translateX(${-size * index}px)`;
    options.forEach(op => op.classList.remove("colored"));
    options[optionIndex].classList.add("colored");
    let box = document.querySelector(".box");
    box.innerHTML = "";
    boxIndex = optionIndex;
    name = options[optionIndex].id;
    box.innerHTML = `<h3  class="box-${boxIndex}">${name}</h3>
    <audio id="audio${boxIndex}" src="./audio/audio${boxIndex}.mp3"></audio>`     
}

function btnCheck() {
    if (this.id === "prev") {
        index--;
        if (optionIndex === 0) {
            optionIndex = 12;
        } else {
            optionIndex--;
        }
    }
    else if(this.id === "next") {
        index++;
        if (optionIndex === 12) {
            optionIndex = 0;
        } else {
            optionIndex++;
        }
    }
    slide();
}

function slide() {
    slider.style.transition = "transform .1s ease-in-out";
    update();
}

function optionFunction() {
    optionIndex = Number(this.getAttribute("option-index"));
    index = optionIndex + 1;
    slide();
}

slider.addEventListener("transitionend", () => {
    if (slides[index].id === "last") {
        slider.style.transition = "none";
        index = slides.length - 2;
        slider.style.transform = `translateX(${-size * index}px)`
    }
    else if (slides[index].id === "first") {
        slider.style.transition = "none";
        index = 1;
        slider.style.transform = `translateX(${-size * index}px)`
    }
})

document.querySelector(".content").addEventListener("click", play);
document.querySelector(".content").addEventListener("click", pause);

function play() {
    let audio = document.getElementById(`audio${boxIndex}`);
    audio.play();
}

function pause() {
    let audio = document.getElementById(`audio${boxIndex}`);
    if(audio.currentTime !== 0 ) {
        audio.pause();
        audio.currentTime = 0;
    }
}

buttons.forEach(btn => btn.addEventListener("click",btnCheck));
options.forEach(option => option.addEventListener("click", optionFunction));