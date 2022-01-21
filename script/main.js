import { hamburgerNav } from './nav.js'

document.querySelector('.bag-icon').addEventListener('click', () => {
    window.open("sub/basket.html", "_self");
})

// about me text p and h animation  

function textAnimatoin() {

    let text = document.querySelector(".land-text");
    let landH = document.querySelector(".land-h");
    let introPositionForB = landH.getBoundingClientRect().top;
    let introPosition = text.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.7;
    if (introPosition < screenPosition) {
        text.classList.add("text-show");
    }
    if (introPositionForB < screenPosition) {
        landH.classList.add("text-showb");
    }


}
// about me text p and h animation call 

textAnimatoin();

